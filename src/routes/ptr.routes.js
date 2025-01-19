import express from 'express'
import { ipService } from '../services/ip.services.js'
import { formatErrorMessage, formatPtrInfo } from '../utils/formatters.js';


const ptrRoutes = express.Router()

//JSON RETURN
ptrRoutes.get('/json', async (req, res) => {
    let userIP;
    if (req.headers["x-real-ip"] != undefined) {
        userIP = req.headers["x-real-ip"];
    } else if (req.headers["x-forwarded-for"] != undefined) {
        userIP = req.headers["x-forwarded-for"];
    } else {
        // Fallback all'indirizzo remoto della connessione
        userIP = req.connection.remoteAddress;
    }
    try {
        const ipInfo = await ipService.getIpPTR(userIP)
        res.json(ipInfo)

    } catch (error) {
        const errorInfo = {
            error: error.message,
            timestamp: new Date().toISOString()
        }
        res.status(500).send(errorInfo)
    }    
})


ptrRoutes.get('/json/:ip', async (req, res) => {
    const { ip } = req.params
    try {
        const ipInfo = await ipService.getIpPTR(ip)
        res.json(ipInfo)
    } catch (error) {
        const errorInfo = {
            error: error.message,
            timestamp: new Date().toISOString()
        }
        res.status(500).send(errorInfo)
    }
})

ptrRoutes.get('/', async (req, res) => {
    let userIP;
    if (req.headers["x-real-ip"] != undefined) {
        userIP = req.headers["x-real-ip"];
    } else if (req.headers["x-forwarded-for"] != undefined) {
        userIP = req.headers["x-forwarded-for"];
    } else {
        // Fallback all'indirizzo remoto della connessione
        userIP = req.connection.remoteAddress;
    }
    try {
        const ipInfo = await ipService.getIpPTR(userIP)
        res.set('Content-Type', 'text/plain')
        return res.send(formatPtrInfo(ipInfo))
    } catch (error) {
        const errorInfo = {
            error: error.message,
            timestamp: new Date().toISOString()
        }
        res.status(500).send(formatErrorMessage(errorInfo))
    }    
})

ptrRoutes.get('/:ip', async (req, res) => {
    const { ip } = req.params
    try {
        const ipInfo = await ipService.getIpPTR(ip)
        
        //Controllo errori
        res.set('Content-Type', 'text/plain')
        if(!ipInfo.error){
            return res.send(formatPtrInfo(ipInfo))
        }
        
        res.send(formatErrorMessage(ipInfo))
    } catch (error) {
        const errorInfo = {
            error: error.message,
            timestamp: new Date().toISOString()
        }
        res.status(500).send(formatErrorMessage(errorInfo))
        //res.json({error: error.message})
    }
})


export default ptrRoutes