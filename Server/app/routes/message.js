const express = require("express");
const router = express.Router();

const messageController = require("../controllers/message");

router.get("/channels/:channelId/messages", messageController.index);
router.post("/channels/:channelId/messages", messageController.create);
router.get("/messages/:messageId", messageController.show);
router.put("/messages/:messageId", messageController.update);
router.delete("/messages/:messageId", messageController.delete);

module.exports = router;
