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

export const formatPtrInfo = (ptrInfo) => {
    const noPtr = '\x1b[2mNo PTR record found\x1b[0m'
    
    return  `\x1b[1;34m╭────────────────── PTR Information ──────────────────╮\x1b[0m\n`+
            `\x1b[34m│\x1b[0m \x1b[2m(ptr.netcheck.me)(reverse dns lookup)\x1b[0m\n`+
            `\x1b[34m│\x1b[0m \x1b[1mIP:\x1b[0m        \x1b[32m${ptrInfo.ip}\x1b[0m\n`+
            `\x1b[34m│\x1b[0m \x1b[1mPTR:\x1b[0m       \x1b[35m${ptrInfo.hostname || noPtr}\x1b[0m\n`+
            `\x1b[1;34m╰─────────────────────────────────────────────────────╯\x1b[0m\n`
}

export const formatSslInfo = (sslInfo) => {
 
    const expired = new Date(sslInfo.expiry) < new Date();
    const daysToExpiry = Math.ceil((new Date(sslInfo.expiry) - new Date()) / (1000 * 60 * 60 * 24));
    const expiryColor = expired ? '\x1b[31m' : (daysToExpiry < 30 ? '\x1b[33m' : '\x1b[32m');
    const validityColor = sslInfo.isValid ? '\x1b[32m' : '\x1b[31m';
    
    return `\x1b[1;34m╭────────────────── SSL Information ──────────────────╮\x1b[0m\n`+
        `\x1b[34m│\x1b[0m \x1b[2m(ssl.netcheck.me)(certificate check)\x1b[0m\n`+
        `\x1b[34m│\x1b[0m \x1b[1mHostname:\x1b[0m   \x1b[32m${sslInfo.hostname}\x1b[0m\n`+
        `\x1b[34m│\x1b[0m \x1b[1mValid:\x1b[0m      ${validityColor}${sslInfo.isValid ? 'Yes' : 'No'}\x1b[0m\n`+
        `\x1b[34m│\x1b[0m \x1b[1mExpiry:\x1b[0m     ${expiryColor}${sslInfo.expiry} (${daysToExpiry} days)\x1b[0m\n`+
        `\x1b[34m│\x1b[0m \x1b[1mValid From:\x1b[0m \x1b[36m${sslInfo.validFrom}\x1b[0m\n`+
        `\x1b[34m│\x1b[0m \x1b[1mIssuer:\x1b[0m     \x1b[35m${sslInfo.issuer}\x1b[0m\n`+
        `\x1b[34m│\x1b[0m \x1b[1mTLS Ver:\x1b[0m    \x1b[36m${sslInfo.tlsVersion}\x1b[0m\n`+
        `\x1b[34m│\x1b[0m \x1b[1mCipher:\x1b[0m     \x1b[36m${sslInfo.cipherUsed?.name}\x1b[0m\n`+
        (sslInfo.isSelfSigned ? `\x1b[34m│\x1b[0m \x1b[33mWarning: Self-signed certificate\x1b[0m\n` : '') +
        `\x1b[1;34m╰─────────────────────────────────────────────────────╯\x1b[0m\n`
};

export const getSslDefaultMessage = () => {
    return `\x1b[1;34m╭────────────────── SSL Checker Usage ──────────────────╮\x1b[0m\n`+
        `\x1b[34m│\x1b[0m \x1b[2m(ssl.netcheck.me)(certificate checker tool)\x1b[0m\n`+
        `\x1b[34m│\x1b[0m \x1b[1mUsage:\x1b[0m      curl ssl.netcheck.me/\x1b[32mdomain.com\x1b[0m\n`+
        `\x1b[34m│\x1b[0m \x1b[1mExample:\x1b[0m    curl ssl.netcheck.me/\x1b[32mgoogle.com\x1b[0m\n`+
        `\x1b[34m│\x1b[0m \x1b[1mInfo:\x1b[0m       Checks SSL/TLS certificate information\n`+
        `\x1b[1;34m╰─────────────────────────────────────────────────────╯\x1b[0m\n`;
};

export const formatErrorSslMessage = (sslInfo) => {
    return `\x1b[1;34m╭────────────────── SSL Information ──────────────────╮\x1b[0m\n`+
    `\x1b[34m│\x1b[0m \x1b[2m(ssl.netcheck.me)(certificate check)\x1b[0m\n`+
    `\x1b[34m│\x1b[0m \x1b[1mHostname:\x1b[0m   \x1b[32m${sslInfo.hostname}\x1b[0m\n`+
    `\x1b[34m│\x1b[0m \x1b[1mStatus:\x1b[0m     \x1b[31mNo SSL/TLS - ${sslInfo.code}\x1b[0m\n`+
    `\x1b[1;34m╰─────────────────────────────────────────────────────╯\x1b[0m\n`
}

export const formatErrorMessage = (errorInfo) => `
\x1b[2m(error details)\x1b[0m
\x1b[1mMessage:\x1b[0m      \x1b[31m${errorInfo.error}\x1b[0m
\x1b[1mTimestamp:\x1b[0m    \x1b[33m${errorInfo.timestamp}\x1b[0m
`
//`\x1b[2mFor more information visit: ${errorInfo.helpUrl}\x1b[0m`