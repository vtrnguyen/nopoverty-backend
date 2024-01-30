import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
require('dotenv').config();

let app = express();
let port = process.env.PORT || 6969;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebRoutes(app);

app.listen(port, () => {
    console.log(`NoPoverty's backend is running on the port ${port}`);
});