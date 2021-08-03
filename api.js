const DEFAULT_USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.79 Safari/537.36";
const DEFAULT_METHOD = "GET";
const DEFAULT_HOSTNAME = "www.pixiv.net";

const https = require("https");
const querystring = require("querystring");

const requestOptions = (options) => {
  if (!options.method) options.method = DEFAULT_METHOD;
  else options.method = encodeURI(options.method)
  if (!options.hostname) options.hostname = DEFAULT_HOSTNAME;
  if (!options.headers) options.headers = {};
  Object.assign(options.headers, {
    "User-Agent": options.userAgent || DEFAULT_USER_AGENT,
    // "Accept-Language": "en-US"
  });
  if (options.pixSession)
    options.headers["Cookie"] = `PHPSESSID=${options.pixSession};`;
  if (options.referer) options.headers["Referer"] = options.referer;
  if (options.csrfToken) options.headers["x-csrf-token"] = options.csrfToken;
  options.path = encodeURI(options.path)
  if (options.query) options.path += "?" + querystring.stringify(options.query);
  if (options.pathname && !options.path) options.path = options.pathname;
  return options;
};

const getSession = (cookies) => cookies.map(c => c.match(/PHPSESSID=([^;]+)/)?.[1]).filter(c => c)[0]

const request = (options, callback, data) => {
  const req = https.request(requestOptions(options), callback);
  if (data) {
    req.write(data)
  }
  req.end()
};

const loadPage = (callback) => (res) => {
  let data = "";
  res.on("data", (chunk) => (data += chunk));
  res.on("end", () => {
    callback(data, res);
  });
};

const toJson = (callback) => (res) => {
  loadPage((data) => callback(JSON.parse(data), res))(res);
};

exports.pipeFixedUrl = (url, reply) => {
  url_ = new URL(url);
  const request_ = requestOptions({
    hostname: url_.hostname,
    path: url_.pathname,
    referer: "https://www.pixiv.net",
  });
  https
    .get(request_, (resp) => {
      resp.pipe(reply);
    })
};

exports.info = ({ id }) =>
  new Promise((resolve, reject) =>
    request(
      {
        path: `/ajax/illust/${id}`,
      },
      toJson((json) => {
        if (!json.error) resolve(json.body);
        else reject();
      })
    )
  );

exports.similar = ({ id, session }) =>
  new Promise((resolve, reject) =>
    request(
      {
        path: `/ajax/illust/${id}/recommend/init`,
        query: {
          limit: 1,
        },
        pixSession: session,
      },
      toJson((json) => {
        if (!json.error && json.body.illusts.length > 0) {
          const ids = json.body.nextIds;
          const length = ids.unshift(json.body.illusts[0].id);
          resolve({
            ids: ids.filter(i => i),
            length
          });
        } else reject();
      })
    )
  );

exports.shortGroupInfo = ({ ids, session }) =>
  new Promise((resolve, reject) =>
    request(
      {
        path: `/rpc/index.php`,
        query: {
          mode: "get_illust_detail_by_ids",
          illust_ids: ids.join(","),
          lang: 'en'
        },
        pixSession: session,
      },
      toJson((json) => {
        if (!json.error) {
          const res = Object.values(json.body)
            .map((pic) => ({
              id: pic.illust_id,
              illustId: pic.illust_id,
              illustTitle: pic.illust_title,
              pageCount: parseInt(pic.illust_page_count),
              urls: pic.url
                ? {
                  original: pic.url.big,
                  medium: pic.url.m,
                  smaller: pic.url["240mw"],
                }
                : undefined,
            })).sort((a, b) => ids.indexOf(a.id) - ids.indexOf(b.id));
          resolve(res);
        } else reject();
      })
    )
  );

exports.recommender = ({ type, sample_illusts, count, session }) =>
  new Promise((resolve, reject) =>
    request(
      {
        path: "/rpc/recommender.php",
        query: {
          type: type || "illust",
          sample_illusts:
            (sample_illusts && sample_illusts.join(",")) || "auto",
          num_recommendations: count,
          page: !sample_illusts ? "discovery" : undefined,
          mode: "all",
        },
        pixSession: session,
        referer: "https://www.pixiv.net/discovery",
      },
      toJson((json) => {
        if (json.recommendations) {
          resolve({
            ids: json.recommendations,
            length: json.recommendations.length,
          });
        } else reject();
      })
    )
  );

exports.following = ({ page, session }) =>
  new Promise((resolve, reject) =>
    request(
      {
        path: "/bookmark_new_illust.php",
        query: {
          p: page,
        },
        pixSession: session,
      },
      loadPage((page_) => {
        const match = page_.match(/data\-items\=\"([^"]+)/);
        if (match) {
          const ids = JSON.parse(match[1].replace(/&quot;/g, '"')).map((pic) =>
            parseInt(pic.illustId)
          );
          resolve({ ids: ids, length: ids.length, page: parseInt(page) });
        } else reject();
      })
    )
  );

const login = ({ session, ...loginData }) =>
  new Promise((resolve, reject) => {
    const data = querystring.stringify(loginData)
    return request({
      method: "POST",
      hostname: "accounts.pixiv.net",
      path: "/api/login",
      query: {
        lang: 'en'
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': data.length
      },
      pixSession: session
    },
      toJson((data, res) => {
        resolve({
          data,
          session: getSession(res.headers['set-cookie'])
        })
      }), data)
  })

const getDefault = () => new Promise((resolve, reject) => request({
  hostname: "accounts.pixiv.net",
  path: "/login",
}, loadPage((html, res) => resolve({
  session: getSession(res.headers['set-cookie']),
  post_key: html.match(/.+postKey\"\:\"([^"]+)\"/)?.[1]
}))))

exports.auth = (data) => getDefault().then(def => login(Object.assign(data, def)))

const getGlobalData = ({ session }) => new Promise((resolve, reject) => request({
  path: "/en/",
  pixSession: session,
}, loadPage((html) => {
  const data = html.match(/.+global\-data\"\ content=\'([^\']+)\'/)?.[1]
  if (data) resolve(JSON.parse(data))
  else reject()
})))

exports.userData = ({ session }) => getGlobalData({ session }).then(data => data.userData)

exports.userExtra = ({ session }) =>
  new Promise((resolve, reject) =>
    request(
      {
        path: '/ajax/user/extra',
        pixSession: session,
      },
      toJson((json) => {
        if (!json.error) {
          resolve(json.body)
        } else reject();
      })
    )
  );

exports.search = ({ word, order, mode, page, s_mode, type }) =>
  new Promise((resolve, reject) =>
    request(
      {
        path: `/ajax/search/artworks/${word}`,
        query: {
          word,
          order: order || 'date_d',
          mode: mode || 'all',
          p: page || 1,
          s_mode: s_mode || 's_tag_full',
          type: type || 'all',
          lang: 'en'
        }
      },
      toJson((json) => {
        if (!json.error) {
          const ids = json.body.illustManga.data.map(({ id }) => id)
          resolve({
            ids,
            length: ids.length,
            page: parseInt(page)
          })
        } else reject();
      })
    )
  );