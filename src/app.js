import express from 'express';
import cors from 'cors';
// import cookieParser from 'cookie-parser';

const app = express();

app.use(cors());

app.use(express.json({limit : '20kb'}));

app.use(express.urlencoded({extended : true , limit : '10kb'}))

app.use(express.static('public'));

//complex for react native application instead we are using the bearer in header for decoding
// app.use(cookieParser());

//health check route
app.get('/', ( req, res ) => {

    res.json({
        status: 200,
        message: "Server is Ok"
    })

});

export default app;