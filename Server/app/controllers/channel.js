const {
  listAllChannels,
  createNewChannel,
  showChannel,
  updateChannel,
  deleteChannel,
  showChannelByMembership,
} = require("../models/channel");
const {showUserFromEmail} = require("../models/user");
const jwt = require('jsonwebtoken');

exports.index = async (req, res) => {
  
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(token, 'marionLaBest');
  
  const user = await showUserFromEmail(decoded.email);

  const channels = await listAllChannels();

  const channelsTokeep =[]
  channels.find(c => {
    if(c.membership && c.membership.includes(user.id))
      channelsTokeep.push(c)});

  try {
    const chan = await showChannelByMembership(channelsTokeep);
    return res.status(200).json(chan);
  } catch (err) {
    return res.sendStatus(404);
  }
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

exports.showByMembership = async (req, res) => {

  const channels = await listAllChannels();
  const channelTokeep = channels.find(c => {
    if(c.membership)
      return c.membership.includes(req.params.userId)});

  try {
    const chan = await showChannelByMembership(channelTokeep);
    return res.status(200).json(chan);
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
