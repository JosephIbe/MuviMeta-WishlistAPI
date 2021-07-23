const express = require('express');
const app = express();

const morgan = require('morgan');

const mongoose = require('mongoose');
const {mongo_URI, cors} = require('./configs/');

const createError = require('http-errors');
require('dotenv').config();

const wishlistRoute = require('./api/routes/wishlist.route');

app.use(cors);
app.use(express.json({limit: '100mb'}));
app.use(express.urlencoded({extended: true, limit: '100mb', parameterLimit: 1000000}));

mongoose.connect(mongo_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
}).then(()=> {
    console.log('mongodb connected');
}).catch((err)=>{
    console.log(`error establishing mongodb connection `);
    console.log(err.message);
})

let connection = mongoose.connection;

connection.on('connected', ()=> console.log('mongoose connected to db'));
connection.on('error', (error)=> console.log(error.message));
connection.on('disconnected', 
    ()=> console.log('mongoose connection is disconnected')
);

process.on('SIGINT', async ()=> {
    await connection.close();
    process.exit(0);
})

app.use(morgan('dev'));

app.get('/', async (req, res) => {
    res.send('Hello, Welcome to MuviMeta App');
});

app.use('/api/v1/wishlist', wishlistRoute);

app.use((req, res, next)=> {
    next(createError.NotFound('Requested Resource is not Available on this server'));
});

module.exports = app;