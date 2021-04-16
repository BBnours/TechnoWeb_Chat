const { v4: uuid } = require("uuid");
const db = require("../../db_config");

const listAllChannels = async () => {
  return new Promise((resolve, reject) => {
    const channels = [];

    const options = {
      gt: "channels:",
      lte: "channels" + String.fromCharCode(":".charCodeAt(0) + 1),
    };

    db.createReadStream(options)
      .on("data", ({ key, value }) => {
        if (!key.includes("messages")) channels.push(JSON.parse(value));
      })
      .on("error", (err) => {
        reject(err);
      })
      .on("end", () => {
        resolve(channels);
      });
  });
};

const createNewChannel = (body) => {
  const channel = {
    id: uuid(),
    name: body.name,
  };

  return new Promise((resolve, reject) => {
    db.put(`channels:${channel.id}`, JSON.stringify(channel), (err) => {
      if (err) {
        return reject(err);
      } else {
        resolve(channel);
      }
    });
  });
};

const showChannel = (channelId) => {
  return new Promise((resolve, reject) => {
    db.get(`channels:${channelId}`, (err, value) => {
      if (err) {
        return reject(err);
      } else {
        resolve(JSON.parse(value));
      }
    });
  });
};

const updateChannel = async (channelId, body) => {
  const channel = {
    id: channelId,
    name: body.name,
  };

  return new Promise((resolve, reject) => {
    db.put(`channels:${channelId}`, JSON.stringify(channel), (err) => {
      if (err) {
        return reject(err);
      } else {
        resolve(channel);
      }
    });
  });
};

const deleteChannel = async (channelId) => {
  return new Promise((resolve, reject) => {
    db.del(`channels:${channelId}`, (err) => {
      if (err) {
        return reject(err);
      } else {
        resolve();
      }
    });
  });
};

module.exports = {
  listAllChannels,
  createNewChannel,
  showChannel,
  updateChannel,
  deleteChannel,
};
