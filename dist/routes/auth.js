"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
//middleware
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
//Post Register route
router.post("/register", authController_1.register);
//Post Login route
router.post("/login", authController_1.login);
//Post Logout route
router.post("/logout", auth_1.auth, authController_1.logout);
// Get current user route
router.get("/me", auth_1.auth, (req, res) => {
    res.json({ user: req.user });
});
exports.default = router;
//# sourceMappingURL=auth.js.map