const {
  listAllChannels,
  createNewChannel,
  showChannel,
  updateChannel,
  deleteChannel,
} = require("../models/channel");

exports.index = async (req, res) => {
  const channels = await listAllChannels();

  return res.status(200).json(channels);
};

exports.create = async (req, res) => {
  const { body } = req;

  if (!body.name) {
    return res.status(400).send("Name is requiered");
  }

  try {
    const channel = await createNewChannel(body);
    return res.status(201).json(channel);
  } catch (err) {
    return res.status(404).json(err.message);
  }
};

exports.show = async (req, res) => {
  const channelId = req.params.channelId;
  try {
    const channel = await showChannel(channelId);
    return res.status(200).json(channel);
  } catch (err) {
    return res.sendStatus(404);
  }
};

exports.update = async (req, res) => {
  const { body } = req;

  if (!body.name) {
    return res.status(400).send("Name is requiered");
  }

  const channelId = req.params.channelId;

  const channel = await updateChannel(channelId, body);

  return res.status(200).json(channel);
};

exports.delete = async (req, res) => {
  const channelId = req.params.channelId;

  await deleteChannel(channelId);

  res.sendStatus(204);
};
