import express from "express";
import { sendMessage, getChatSession, getChatHistory, createChatSession, getAllChatSessions // add this
 } from "../controllers/chat";
import { auth } from "../middleware/auth";
const router = express.Router();
router.use(auth);
router.post("/sessions", createChatSession);
router.get("/sessions", getAllChatSessions);
router.get("/sessions/:sessionId", getChatSession);
router.post("/sessions/:sessionId/messages", sendMessage);
router.get("/sessions/:sessionId/history", getChatHistory);
export default router;
//# sourceMappingURL=chat.js.map