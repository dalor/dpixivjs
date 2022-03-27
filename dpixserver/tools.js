const ffmpeg = require('fluent-ffmpeg');

const preset = (command) => {
  return command.setFfmpegPath('ffmpeg')
    .on('error', function (err, stdout, stderr) {
      console.log('Cannot process video: ' + err.message);
    });
}

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
  try {

    pipeFixedUrl(ugoiraUrl, (resp) => {

      const fileName = ugoiraUrl.match(/(?<fileName>[^\/]+)\.[^\.]+$/)?.groups
        .fileName;

      reply.raw.writeHead(200, {
        "Content-Type": "image/gif",
        "Content-disposition": `attachment; filename=${fileName}.gif`,
      });

      const command = ffmpeg()
        .preset(preset)
        .input(resp)
        .complexFilter('[0:v] fps=24,split [a][b];[a] palettegen=stats_mode=single [p];[b][p] paletteuse=new=1')
        .format('gif')
        .output(reply.raw)

      if (delay) {
        command.outputOptions(`-r ${1000 / delay}`)
      }

      command.run()
      reply.sent = true;
    });

  } catch {
    return { ok: false };
  }
};

exports.pipeUgoiraArchiveToMP4 = (ugoiraUrl, delay, reply) => {
  try {

    pipeFixedUrl(ugoiraUrl, (resp) => {

      const fileName = ugoiraUrl.match(/(?<fileName>[^\/]+)\.[^\.]+$/)?.groups
        .fileName;

      reply.raw.writeHead(200, {
        "Content-Type": "video/mp4",
        "Content-disposition": `attachment; filename=${fileName}.mp4`,
      });

      const command = ffmpeg()
        .preset(preset)
        .input(resp)
        .format('mp4')
        .outputOptions([
          '-c:v libx264',
          '-vf fps=24',
          '-pix_fmt yuv420p'
        ])
        .output(reply.raw)

      if (delay) {
        command.outputOptions(`-r ${1000 / delay}`)
      }

      command.run()
      reply.sent = true;
    });

  } catch {
    return { ok: false };
  }
};


