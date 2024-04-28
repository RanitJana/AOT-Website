const https = require('https');

const options = {
    hostname: 'aot-website-liard.vercel.app/',
    port: 443,
    path: '/',
    method: 'GET',
    headers: {
        'Accept-Encoding': 'br',
    },
};

const req = https.request(options, (res) => {
    console.log(`statusCode: ${res.statusCode}`);

    res.on('data', (d) => {
        process.stdout.write(d);
    });
});

req.on('error', (error) => {
    console.error(error);
});

req.end();