import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";


createConnection().then(async connection => {

    var cors = require('cors')
    const app = express();
    app.use(express.json());
    app.use('*', cors());


    app.get('/', (req, res) => {
        res.json({user: 'opa, legal ai ?'})
    })

    app.listen(3000);
    console.log("Express server has started on port 3000.");

}).catch(error => console.log(error));
