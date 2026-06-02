"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const port = Number(process.env.PORT ?? 8000);
const mongoUri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/api/health', (_request, response) => {
    response.json({
        service: 'octofit-tracker-api',
        status: 'ok',
        port,
        baseUrl,
        mongoUri,
    });
});
void mongoose_1.default
    .connect(mongoUri)
    .then(() => {
    console.log(`MongoDB connected at ${mongoUri}`);
})
    .catch((error) => {
    console.error('MongoDB connection failed:', error);
});
app.listen(port, () => {
    console.log(`OctoFit backend listening on ${baseUrl}`);
});
