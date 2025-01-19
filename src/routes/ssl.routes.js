import express from 'express'
import { sslServices } from '../services/ssl.services.js'
import { formatErrorSslMessage, formatSslInfo, getSslDefaultMessage,  } from '../utils/formatters.js';
const sslRoutes = express.Router()

sslRoutes.get('/', async (req, res) => {
    res.send(getSslDefaultMessage())
})

sslRoutes.get('/:domain', async (req, res) => {
    try{
        const { domain } = req.params
        return res.send(formatSslInfo(await sslServices.getSslInfo(domain)))
    }catch(error){
        return res.send(formatErrorSslMessage(error))
    }
})

export default sslRoutes