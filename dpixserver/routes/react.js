const path = require("path");
const fs = require("fs");
const replaceBuffer = require("buffer-replace");

const { SITE_URL } = require("../../config");

const root = path.join(__dirname, "../../dpixclient", "build");
const index = path.join(root, "index.html");

module.exports = async (fastify, options) => {
  fastify.register(require("fastify-static"), {
    root: path.join(__dirname, "../../dpixclient", "build"),
    wildcard: false,
  });

  const replacer = (buffer, values) => {
    for (const [key, value] of values) {
      buffer = replaceBuffer(buffer, key, value);
    }
    return buffer;
  };

  fastify.get("/*", { schema: { hide: true } }, async ({ params }, reply) => {
    const match = params["*"].match(/([0-9]+)/);
    if (match) {
      const id = match[1];
      fs.readFile(index, (err, fileBuffer) => {
        reply.type("text/html").send(
          err ||
          replacer(fileBuffer, [
            ["{url}", SITE_URL + `/${id}`],
            ["{image}", SITE_URL + `/pic/${id}/preview`],
          ])
        );
      });
    } else return reply.sendFile("index.html");
  });
};
