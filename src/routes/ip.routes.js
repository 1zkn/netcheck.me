import express from 'express'
import { ipService } from '../services/ip.services.js'
import { formatIpInfo, formatErrorMessage } from '../utils/formatters.js'

const ipRoutes = express.Router()

//JSON RETURN
ipRoutes.get('/json', async (req, res) => {
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
        const ipInfo = await ipService.getIpInfo(userIP)
        res.json(ipInfo)
        console.log("jsonme")
    } catch (error) {
        const errorInfo = {
            error: error.message,
            timestamp: new Date().toISOString()
        }
        res.status(500).send(formatErrorMessage(errorInfo))
    }    
})


ipRoutes.get('/json/:ip', async (req, res) => {
    const { ip } = req.params
    try {
        const ipInfo = await ipService.getIpInfo(ip)
        res.json(ipInfo)
    } catch (error) {
        const errorInfo = {
            error: error.message,
            timestamp: new Date().toISOString()
        }
        res.status(500).send(formatErrorMessage(errorInfo))
    }
})


//TEXT RETURN
ipRoutes.get('/', async (req, res) => {
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
        const ipInfo = await ipService.getIpInfo(userIP)
        
        //Controllo errori
        res.set('Content-Type', 'text/plain')
        if(!ipInfo.error){
            return res.send(formatIpInfo(ipInfo))
        }
        
        res.send(formatErrorMessage(ipInfo))
    } catch (error) {
        const errorInfo = {
            error: error.message,
            timestamp: new Date().toISOString()
        }
        res.status(500).send(formatErrorMessage(errorInfo))
    }    
})

ipRoutes.get('/:ip', async (req, res) => {
    const { ip } = req.params
    try {
        const ipInfo = await ipService.getIpInfo(ip)
        
        //Controllo errori
        res.set('Content-Type', 'text/plain')
        if(!ipInfo.error){
            return res.send(formatIpInfo(ipInfo))
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


export default ipRoutes