import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import DBInit from "./config/DB";
import { Server } from "http";
import { MountRoutes } from "./routes/Index";
import compression from "compression";
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";

// app init
const app: express.Application = express();
let server: Server;
const PORT = process.env.PORT || 5000;

// Load environment variables from .env file
dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());

// database connection
DBInit();

// Security middleware
app.use(express.json({ limit: "10kb" }));
app.use(
	cors({
		origin: ["http://localhost:4200"],
		methods: ["POST", "GET", "PUT", "DELETE"],
		allowedHeaders: ["Content-Type", "Authorization"],
		credentials: true,
	})
);
app.use(compression());
app.use(mongoSanitize());
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));

// Test route
app.get("/", (req: Request, res: Response) => {
	res.send("Welcome to the Psychological Clinic API");
});

MountRoutes(app);

// app listening
server = app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}/`);
});

process.on("unhandledRejection", (err: Error) => {
	console.error(`unhandledRejection ${err.name} | ${err.message}`);
	server.close(() => {
		console.error("shutting the application down");
		process.exit(1);
	});
});
