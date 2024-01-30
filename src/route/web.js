import express from "express";
import testController from "../controllers/testController";    

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', testController.getHomePage);
    router.get('/about', testController.getAboutPage);

    return app.use("/", router);
}

module.exports = initWebRoutes;
