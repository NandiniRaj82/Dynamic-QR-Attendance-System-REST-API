const express = require("express");
const app = express();
const  PORT = 3000;
const bodyParser = require('body-parser');
const router = require('./router')

app.use(bodyParser.json());

app.use('/', router);

app.listen(PORT, () => console.log("server started"));
