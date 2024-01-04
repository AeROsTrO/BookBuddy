import express from 'express';
import {PORT, mongoDBURL} from './config.js';
import mongoose from 'mongoose'
import {Book} from './models/bookModel.js';
import booksRoutes from './routes/booksRoutes.js'
const app= express();
import cors from 'cors'

//middleware for parsing request body
app.use(express.json());

//middleware for handling CORS policy
//option 1:allow all origins with default of cors(*)
app.use(cors())

//option 2: allow custom origins
// app.use(
//     cors({
//         origin:'http://localhost:3000',
//         methods:['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders:['Content-Type'],
//     })
// )

app.get('/', (req, res)=>{
    console.log(req);
    return res.status(234).send('welcome')
});

app.use('/books', booksRoutes);
mongoose.connect(mongoDBURL)
.then(()=>{
    console.log('app connected to database');
    app.listen(PORT, ()=>{
        console.log(`App is listening on port: ${PORT}`);
    });
})
.catch((err)=>{
    console.log(err);
})