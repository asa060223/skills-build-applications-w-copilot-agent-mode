import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'

dotenv.config()

const port = Number(process.env.PORT ?? 8000)
const mongoUri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db'
const codespaceName = process.env.CODESPACE_NAME
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/api/health', (_request, response) => {
  response.json({
    service: 'octofit-tracker-api',
    status: 'ok',
    port,
    baseUrl,
    mongoUri,
  })
})

void mongoose
  .connect(mongoUri)
  .then(() => {
    console.log(`MongoDB connected at ${mongoUri}`)
  })
  .catch((error: unknown) => {
    console.error('MongoDB connection failed:', error)
  })

app.listen(port, () => {
  console.log(`OctoFit backend listening on ${baseUrl}`)
})