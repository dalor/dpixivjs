const ffmpeg = require('fluent-ffmpeg');

const { pipeFixedUrl } = require("../api");

exports.apiDecorator = (func, patch) => async (request, reply) => {
  try {
    const update = patch && patch(request, reply);
    if (update || !patch) {
      const resp = await func(Object.assign(request, update || {}), reply);
      if (resp) {
        return resp;
      }
    }
    return { ok: false };
  } catch {
    return { ok: false };
  }
};

exports.getSession = (request) => ({ session: request.headers.token });

exports.pipeFixedUrlToReply = (url, reply) => {
  try {
    pipeFixedUrl(url, (resp) => {
      const fileName = url.match(/(?<fileName>[^\/]+\.[^\.]+)$/)?.groups
        .fileName;
      reply.raw.writeHead(200, {
        "Content-Type": resp.headers["content-type"],
        "Content-disposition": `attachment; filename=${fileName}`,
      });
      resp.pipe(reply.raw);
      reply.sent = true;
    });
  } catch {
    return { ok: false };
  }
};

exports.pipeUgoiraArchiveToGifReply = (ugoiraUrl, delay, reply) => {
  pipeFixedUrl(ugoiraUrl, (resp) => {
    const fileName = ugoiraUrl.match(/(?<fileName>[^\/]+)\.[^\.]+$/)?.groups
      .fileName;
    reply.raw.writeHead(200, {
      "Content-Type": resp.headers["content-type"],
      "Content-disposition": `attachment; filename=${fileName}.gif`,
    });
    ffmpeg()
      .setFfmpegPath('ffmpeg')
      .input(resp)
      .outputOptions(`-r ${1000 / delay}`)
      .complexFilter('[0:v] fps=24,split [a][b];[a] palettegen=stats_mode=single [p];[b][p] paletteuse=new=1')
      .format('gif')
      .output(reply.raw)
      .run()
    reply.sent = true;
  });
};
