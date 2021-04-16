const { v4: uuid } = require("uuid");
const db = require("../../db_config");

const listAllMessages = async (channelId) => {
  return new Promise((resolve, reject) => {
    const messages = [];

    const options = {
      gt: `channels:${channelId}:messages`,
      lte:
        `channels:${channelId}:messages` +
        String.fromCharCode(":".charCodeAt(0) + 1),
    };

    db.createReadStream(options)
      .on("data", ({ key, value }) => {
        messages.push(JSON.parse(value));
      })
      .on("error", (err) => {
        reject(err);
      })
      .on("end", () => {
        resolve(messages);
      });
  });
};

const createNewMessage = (channelId, body) => {
  const message = {
    id: uuid(),
    content: body.content,
    created_at: new Date().toISOString(),
    userId: body.userId,
  };

  return new Promise((resolve, reject) => {
    db.put(
      `channels:${channelId}:messages:${message.id}`,
      JSON.stringify(message),
      (err) => {
        if (err) {
          return reject(err);
        } else {
          resolve(message);
        }
      }
    );
  });
};

const showMessage = (messageId) => {
  return new Promise((resolve, reject) => {
    const messages = [];

    const options = {
      gt: "channels:",
      lte: "channels" + String.fromCharCode(":".charCodeAt(0) + 1),
    };

    db.createReadStream(options)
      .on("data", ({ key, value }) => {
        if (key.includes(messageId)) {
          messages.push(JSON.parse(value));
        }
      })
      .on("error", (err) => {
        reject(err);
      })
      .on("end", () => {
        resolve(messages);
      });
  });
};

const updateMessage = async (messageId, messageToUpdate, body) => {
  const message = {
    id: messageId,
    content: body.content,
    created_at: messageToUpdate.value.created_at,
    modified_at: new Date().toISOString(),
    userId: body.userId,
  };

  return new Promise((resolve, reject) => {
    db.put(messageToUpdate.key, JSON.stringify(message), (err) => {
      if (err) {
        return reject(err);
      } else {
        resolve(message);
      }
    });
  });
};

const deleteMessage = async (messageTodelete) => {
  return new Promise((resolve, reject) => {
    db.del(messageTodelete, (err) => {
      if (err) {
        return reject(err);
      } else {
        resolve();
      }
    });
  });
};

const findMessage = async (messageId) => {
  return new Promise((resolve, reject) => {
    let messageTofind = null;

    const options = {
      gt: "channels:",
      lte: "channels" + String.fromCharCode(":".charCodeAt(0) + 1),
    };

    db.createReadStream(options)
      .on("data", ({ key, value }) => {
        if (key.includes(messageId)) {
          messageTofind = key;
          messageContent = value;
        }
      })
      .on("error", (err) => {
        reject(err);
      })
      .on("end", () => {
        resolve({
          key: messageTofind,
          value: JSON.parse(messageContent),
        });
      });
  });
};

module.exports = {
  listAllMessages,
  createNewMessage,
  showMessage,
  updateMessage,
  deleteMessage,
  findMessage,
};
