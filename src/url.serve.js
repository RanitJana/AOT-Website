const getURI = (req) => {
    return `${req.protocol}://${req.get('host')}${req.originalUrl}`;
}
module.exports = getURI;