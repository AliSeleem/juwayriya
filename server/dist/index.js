"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const DB_1 = __importDefault(require("./config/DB"));
const Index_1 = require("./routes/Index");
const compression_1 = __importDefault(require("compression"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const helmet_1 = __importDefault(require("helmet"));
// app init
const app = (0, express_1.default)();
let server;
const PORT = process.env.PORT || 5000;
// Load environment variables from .env file
dotenv_1.default.config();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// database connection
(0, DB_1.default)();
// Security middleware
app.use(express_1.default.json({ limit: "10kb" }));
app.use((0, cors_1.default)({
    origin: ["http://localhost:4200"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
}));
app.use((0, compression_1.default)());
app.use((0, express_mongo_sanitize_1.default)());
app.use((0, helmet_1.default)({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
// Test route
app.get("/", (req, res) => {
    res.send("Welcome to the Psychological Clinic API");
});
(0, Index_1.MountRoutes)(app);
//
exports.default = app;
// app listening
server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/`);
});
process.on("unhandledRejection", (err) => {
    console.error(`unhandledRejection ${err.name} | ${err.message}`);
    server.close(() => {
        console.error("shutting the application down");
        process.exit(1);
    });
});
