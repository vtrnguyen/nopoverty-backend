import express from "express";
import testController from "../controllers/testController";    

let router = express.Router();

let initWebRoutes = (app) => {
    // GET METHOD
    router.get('/', testController.getHomePage);
    router.get('/home', testController.getHomePage);
    router.get('/get-all-accounts', testController.getAllAccounts);
    router.get('/get-all-blogs', testController.getAllBlogs);
    router.get('/get-all-categories', testController.getAllCategories);
    router.get('/get-all-comments', testController.getAllComments);
    router.get('/get-all-images', testController.getAllImages);
    router.get('/get-all-like', testController.getAllLikes);
    router.get('/get-all-participations', testController.getAllParticipations);
    router.get('/get-all-posts', testController.getAllPosts);
    router.get('/get-all-projects', testController.getAllProjects);
    router.get('/get-all-projectfunds', testController.getAllProjectFund);
    router.get('/get-all-videos', testController.getAllVideos);

    //METHOD ABOUT USER
    router.get('/get-all-users', testController.getUserCRUD);
    router.get('/add-new-user', testController.getAddNewUserPage);
    router.post('/post-user-CRUD', testController.postUserCRUD);
    router.get('/edit-user', testController.getEditUserPage);
    router.post('/put-user-CRUD', testController.putUserCRUD);
    router.get('/delete-user', testController.deleteUserCRUD);

    return app.use("/", router);
}

module.exports = initWebRoutes;
