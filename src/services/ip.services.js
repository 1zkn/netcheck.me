
export class IpService{
    async getIpInfo(ip){
        try{
            //Chiama API per ottenere informazioni sul indirizzo ip
            const response = await fetch(`https://ip-addr.is/json/${ip}`, {
                headers: {
                    'Accept': 'application/json'
                  },
                  signal: AbortSignal.timeout(5000)  
            })
            if(!response.ok){
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            if(!response.error){
                const data = await response.json();
                return {...data, timestamp: new Date().toISOString()};
            }
            throw new Error(`IP Error: ${response.status}`)
            
        }catch(error){
            if (error.name === 'AbortError') {
                throw new Error('Request timed out');
              }
              throw error;
        }
        
    }

    async getIpPTR(ip){
        try{
            const response = await fetch(`https://api.ip-addr.is/rdns.php?ip=${ip}`, {
                headers: {
                    'Accept': 'application/json'
                  },
                  signal: AbortSignal.timeout(5000)  
                })
                if(!response.ok){
                    throw new Error(`HTTP error! status: ${response.status}`)
                }
                if(!response.error){
                    const data = await response.json();
                    return {...data, timestamp: new Date().toISOString()};
                }
                throw new Error(`IP Error: ${response.status}`)
            
            }catch(error){
            if (error.name === 'AbortError') {
                throw new Error('Request timed out');
              }
              throw error;
            }
    }
}
export const ipService = new IpService()
