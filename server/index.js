const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('config');
const router = require('./routes/appRouter');


const app = express();
const dblink = config.get('database.dblink');
const PORT = config.get('server.port');

app.use(cors());
app.use(express.json());
app.use('/api/heroes', router);

const startApp = async () => {
    try{
        await mongoose.connect(dblink);

        app.listen(PORT, () => {
            console.log(`Server started successfully and listening port: ${PORT}`)
        })
    } catch (e){
        console.log(e);
    }
}

startApp();