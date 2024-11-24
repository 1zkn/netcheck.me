export const formatIpInfo = (ipInfo) => {
    const notAvailable = 'Please see on Map'
    const hasCoordinates = ipInfo.latitude !== 'N/A' && ipInfo.longitude !== 'N/A'
    
    const locationNote = hasCoordinates ? '' : 
        '\n\n\x1b[33mNote:\x1b[0m Coordinates might not be available because this IP appears to be an Anycast IP ' +
        '(used by CDNs and large providers like Cloudflare for distributed services)'

    return `\x1b[1;34m╭────────────────── IP Information ───────────────────╮\x1b[0m\n`+
        `\x1b[34m│\x1b[0m \x1b[2m(ip.netcheck.me)(maxmind geolite2 database)\x1b[0m\n`+
        `\x1b[34m│\x1b[0m \x1b[1mIP:\x1b[0m        ${ipInfo.ip}\n`+
        `\x1b[34m│\x1b[0m \x1b[1mCountry:\x1b[0m   ${ipInfo.country !== 'N/A' ? '\x1b[32m' + ipInfo.country + '\x1b[0m' : notAvailable}\n`+
        `\x1b[34m│\x1b[0m \x1b[1mCity:\x1b[0m      ${ipInfo.city !== 'N/A' ? '\x1b[32m' + ipInfo.city + '\x1b[0m' : notAvailable}\n`+
        `\x1b[34m│\x1b[0m \x1b[1mContinent:\x1b[0m ${ipInfo.continent !== 'N/A' ? '\x1b[32m' + ipInfo.continent + '\x1b[0m' : notAvailable}\n`+
        `\x1b[34m│\x1b[0m \x1b[1mProvince:\x1b[0m  ${ipInfo.subdivision !== 'N/A' ? '\x1b[32m' + ipInfo.subdivision + '\x1b[0m' : notAvailable}\n`+
        `\x1b[34m│\x1b[0m \x1b[1mLocation:\x1b[0m  ${hasCoordinates ? '\x1b[36m' + `${ipInfo.latitude},${ipInfo.longitude}` + '\x1b[0m' : '\x1b[2mCoordinates not available (see note)\x1b[0m'}\n`+
        `\x1b[34m│\x1b[0m \x1b[1mMap:\x1b[0m       ${hasCoordinates ? '\x1b[36m' + `https://map.zkn.app/o/${ipInfo.latitude},${ipInfo.longitude}` + '\x1b[0m' : '\x1b[2mMap not available (see note)\x1b[0m'}\n`+
        `\x1b[34m│\x1b[0m \x1b[1mTimezone:\x1b[0m  ${'\x1b[33m' + ipInfo.time_zone + '\x1b[0m'}\n`+
        `\x1b[34m│\x1b[0m \x1b[1mOrg:\x1b[0m       ${ipInfo.autonomous_system_organization !== 'N/A' ? '\x1b[35m' + ipInfo.autonomous_system_organization + '\x1b[0m' : '\x1b[2mNot assigned or private IP\x1b[0m'}\n`+
        `\x1b[34m│\x1b[0m \x1b[1mASN:\x1b[0m       ${ipInfo.autonomous_system_number !== 'N/A' ? '\x1b[35mAS' + ipInfo.autonomous_system_number + '\x1b[0m' : '\x1b[2mNo ASN available\x1b[0m'}\n`+
        `\x1b[1;34m╰─────────────────────────────────────────────────────╯\x1b[0m${locationNote}\n`+
        `\n\x1b[2mHaving trouble viewing this output? Try: curl my.ip-addr.is\x1b[0m\n`
}

export const formatErrorMessage = (errorInfo) => `
\x1b[2m(error details)\x1b[0m
\x1b[1mMessage:\x1b[0m      \x1b[31m${errorInfo.error}\x1b[0m
\x1b[1mTimestamp:\x1b[0m    \x1b[33m${errorInfo.timestamp}\x1b[0m
`
//`\x1b[2mFor more information visit: ${errorInfo.helpUrl}\x1b[0m`