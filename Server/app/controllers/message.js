const {
  listAllMessages,
  createNewMessage,
  showMessage,
  updateMessage,
  deleteMessage,
  findMessage,
} = require("../models/Message");

exports.index = async (req, res) => {
  const channelId = req.params.channelId;

  try {
    const Message = await listAllMessages(channelId);
    
    return res.status(200).json(Message);
  } catch (err) {
    return res.sendStatus(404);
  }
};

exports.create = async (req, res) => {
  const { body } = req;

  if (!body.content) {
    return res.status(400).send("Content is required");
  }
  if (!body.userId) {
    return res.status(400).send("UserId is required");
  }

  const channelId = req.params.channelId;

  try {
    const Message = await createNewMessage(channelId, body);
    return res.status(200).json(Message);
  } catch (err) {
    return res.status(400).json(Message);
  }
};

exports.show = async (req, res) => {
  const MessageId = req.params.messageId;

  try {
    const Message = await showMessage(MessageId);
    return res.status(200).json(Message);
  } catch (err) {
    return res.sendStatus(404);
  }
};

exports.update = async (req, res) => {
  const messageId = req.params.messageId;
  const { body } = req;

  if (!body.content) {
    return res.status(400).send("Content is requiered");
  }

  try {
    const messageToUpdate = await findMessage(messageId);
    const message = await updateMessage(messageId, messageToUpdate, body);
    return res.status(200).json(message);
  } catch (err) {
    return res.status(400).json(err);
  }
};

exports.delete = async (req, res) => {
  const messageId = req.params.messageId;
  try {
    const messageTodelete = await findMessage(messageId);
    await deleteMessage(messageTodelete.key);
    return res.sendStatus(204);
  } catch (err) {
    res.status(400);
  }
};
