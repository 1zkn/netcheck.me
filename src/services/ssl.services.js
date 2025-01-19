import tls from 'node:tls'

export class sslService{
    async getSslInfo(hostname){
        return new Promise((resolve, reject) => {
            const socket = tls.connect({
                host: hostname,
                port: 443,
                servername: hostname,
                rejectUnauthorized: false
            })
            socket.on('secureConnect', () => {
                const cert = socket.getPeerCertificate(true)
                const sslInfo = {
                    hostname: cert.subject.CN,
                    isValid: socket.authorized,
                    expiry: new Date(cert.valid_to).toISOString().split('T')[0],
                    validFrom: new Date(cert.valid_from).toISOString().split('T')[0],
                    issuer: cert.issuer.CN || cert.issuer.O,
                    tlsVersion: socket.getProtocol(),
                    cipherUsed: socket.getCipher(),
                    isSelfSigned: cert.issuer.CN === cert.subject.CN
                }
                socket.end()
                resolve(sslInfo)
            })
            socket.on('error', (err) => {
                reject(err)
            })
            socket.setTimeout(10000, () => {
                socket.destroy()
                reject(new Error('Connection timeout'))
            })
        }) 
    }
}
 export const sslServices = new sslService()