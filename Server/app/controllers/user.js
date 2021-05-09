const {
  listAllUsers,
  createNewUser,
  showUser,
  updateUser,
  deleteUser,
  showUserFromEmail,
} = require("../models/user");

exports.index = async (req, res) => {
  try {
    const users = await listAllUsers();
    return res.status(200).json(users);
  } catch (err) {
    return res.status(400).json(err.message);
  }
};

exports.create = async (req, res) => {
  const { body } = req;

  if (!body.name) {
    return res.status(400).send("Name is required");
  }
  if (!body.email) {
    return res.status(400).send("Email is required");
  }
  if (!body.password) {
    return res.status(400).send("Password is required");
  }

  try {
    const user = await createNewUser(body);
    return res.status(201).json(user);
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

exports.show = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await showUser(userId);
    return res.status(200).json(user);
  } catch (err) {
    return res.sendStatus(404);
  }
};

exports.showFromEmail = async (req, res) => {
  try {
    const email = req.params.email;
    const user = await showUserFromEmail(email);
    return res.status(200).json(user);
  } catch (err) {
    return res.sendStatus(404);
  }
};

exports.update = async (req, res) => {
  const { body } = req;

  if (!body.name) {
    return res.status(400).send("Name is required");
  }
  if (!body.email) {
    return res.status(400).send("Email is required");
  }
  if (!body.password) {
    return res.status(400).send("Password is required");
  }

  const userId = req.params.userId;

  try {
    const user = await updateUser(userId, body);
    return res.status(200).json(user);
  } catch (err) {
    return res.status(401).send(error.message);
  }
};

exports.delete = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await deleteUser(userId);
    return res.status(204).json(user);
  } catch (err) {
    return res.status(404).send(error.message);
  }
};
