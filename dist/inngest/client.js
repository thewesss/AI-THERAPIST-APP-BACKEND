"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.functions = exports.inngest = void 0;
const inngest_1 = require("inngest");
exports.inngest = new inngest_1.Inngest({
    id: "ai-therapist-agent",
    eventKey: process.env.INNGEST_API_KEY,
});
exports.functions = [];
//# sourceMappingURL=client.js.map