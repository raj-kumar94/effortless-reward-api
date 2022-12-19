import cors from 'cors';
import helmet from 'helmet';
import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

dotenv.config();

import { errorHandler } from './response/errorHandler.js';


const app = express();
app.set('trust proxy', 'loopback');


if(process.env.NODE_ENV === 'production') {
    app.use(helmet());
}

app.use(cors({
    origin: '*',
    credentials: false,
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With', 'X-Content-Type-Options']
}));

/**
 * process webhooks here
 */


// more middlewares
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '1mb'
}));


import customerRoute from './routes/customerRoute.js';
app.use('/api/customers', customerRoute);

/**
 * Route Handlers here
 */





process.on('SIGINT', async function() {
    console.log('Received system command for stopping/restarting the service.');
    if(process.env.NODE_ENV === 'production') {
        // the service will be restarted by pm2
    } else {
        process.exit(1);
    }
});

process.on('exit', (code) => {
    console.log(`About to exit with code ${code}`);
    return;
});

/**
 * Using error handler to catch all errors
 */
app.use(errorHandler);

export default app;