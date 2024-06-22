require('dotenv').config();
const connectDB = require('./src/db/index.js');

const app = require('./app.js');

const port = process.env.PORT || 8000;

connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`)
        })
    })
    .catch((err) => {
        console.log(`MongoDB connection error!!\nError: ${err}`);
        throw err;
    })
