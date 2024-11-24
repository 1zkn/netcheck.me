import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import ipRoutes from './routes/ip.routes.js' 

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send("Hello world")
})

app.use('/ip', ipRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})