const { v4: uuid } = require("uuid");
const crypto = require("crypto");
const db = require("../../db_config");

const listAllUsers = async () => {
  return new Promise((resolve, reject) => {
    const users = [];

    const options = {
      gt: "users:",
      lte: "users" + String.fromCharCode(":".charCodeAt(0) + 1),
    };

    db.createReadStream(options)
      .on("data", ({ key, value }) => {
        users.push(JSON.parse(value));
      })
      .on("error", (err) => {
        reject(err);
      })
      .on("end", () => {
        resolve(users);
      });
  });
};

const createNewUser = (body) => {
  const user = {
    id: uuid(),
    name: body.name,
    email: body.email,
    password: body.password,
  };

  return new Promise((resolve, reject) => {
    db.put(`users:${user.id}`, JSON.stringify(user), (err) => {
      if (err) {
        return reject(err);
      } else {
        resolve(user);
      }
    });
  });
};

const showUser = (userId) => {
  return new Promise((resolve, reject) => {
    db.get(`users:${userId}`, (err, value) => {
      if (err) {
        return reject(err);
      } else {
        resolve(JSON.parse(value));
      }
    });
  });
};

const updateUser = async (userId, body) => {
  const user = {
    id: userId,
    name: body.name,
    email: body.email,
    password: body.password,
  };

  return new Promise((resolve, reject) => {
    db.put(`users:${userId}`, JSON.stringify(user), (err) => {
      if (err) {
        return reject(err);
      } else {
        resolve(user);
      }
    });
  });
};

const deleteUser = async (userId) => {
  return new Promise((resolve, reject) => {
    db.del(`users:${userId}`, (err) => {
      if (err) {
        return reject(err);
      } else {
        resolve();
      }
    });
  });
};

module.exports = {
  listAllUsers,
  createNewUser,
  showUser,
  updateUser,
  deleteUser,
};
