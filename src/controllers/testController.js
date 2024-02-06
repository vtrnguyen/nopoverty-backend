import db from "../models/index";
import userServicesCRUD from "../services/userServicesCRUD";

let getHomePage = (req, res) => {
    return res.render('../views/home.ejs');
}

let getAddNewUserPage = (req, res) => {
    return res.render('../views/users/add-new-user.ejs');
}

let getEditUserPage = async (req, res) => {
    let userID = req.query.userID;
    if (userID) {
        let userData = await userServicesCRUD.getInforUserById(userID);
        return res.render('../views/users/edit-user.ejs', {
            userData: userData,
        });
    } else {
        return res.send('User is not found!!!');
    }
}

let getUserCRUD = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render('../views/users/users.ejs', {
            data
        });
    } catch (e) {
        console.log(e);
    }
}

let postUserCRUD = async (req, res) => {
    await userServicesCRUD.createNewUser(req.body);
    return res.redirect('/get-all-users');
}

let putUserCRUD = async (req, res) => {
    let userData = req.body;
    await userServicesCRUD.updateUser(userData);
    return res.redirect('/get-all-users');
}

let deleteUserCRUD = async (req, res) => {
    let userID = req.query.userID;

    if (userID) {
        await userServicesCRUD.deleteUser(userID);
    } else {
        return res.send('User is not found!!!');
    }

    return res.redirect('/get-all-users');
}

let getAllAccounts = async (req, res) => {
    try {
        let data = await db.Account.findAll();
        return res.render('../views/accounts.ejs', {
            data
        });
    } catch (e) {
        console.log(e);
    }
}

let getAllBlogs = async (req, res) => {
    try {
        let data = await db.Blog.findAll();
        return res.send(data);
    } catch (e) {
        console.log(e);
    }
}

let getAllCategories = async (req, res) => {
    try {
        let data = await db.Category.findAll();
        return res.send(data);
    } catch (e) {
        console.log(e);
    }
}

let getAllComments = async (req, res) => {
    try {
        let data = await db.Comment.findAll();
        return res.send(data);
    } catch (e) {
        console.log(e);
    }
}

let getAllImages = async (req, res) => {
    try {
        let data = await db.Image.findAll();
        return res.send(data);
    } catch (e) {
        console.log(e);
    }
}

let getAllLikes = async (req, res) => {
    try {
        let data = await db.Like.findAll();
        return res.send(data);
    } catch (e) {
        console.log(e);
    }
}

let getAllParticipations = async (req, res) => {
    try {
        let data = await db.Participation.findAll();
        return res.send(data);
    } catch (e) {
        console.log(e);
    }
}

let getAllPosts = async (req, res) => {
    try {
        let data = await db.Post.findAll();
        return res.send(data);
    } catch (e) {
        console.log(e);
    }
}

let getAllProjects = async (req, res) => {
    try {
        let data = await db.Project.findAll();
        return res.render('../views/projects.ejs', {
            data
        });
    } catch (e) {
        console.log(e);
    }
}

let getAllProjectFund = async (req, res) => {
    try {
        let data = await db.ProjectFund.findAll();
        return res.send(data);
    } catch (e) {
        console.log(e);
    }
}

let getAllVideos = async (req, res) => {
    try {
        let data = await db.Video.findAll();
        return res.send(data);
    } catch (e) {
        console.log(e);
    }
}


module.exports = {
    getHomePage, 
    // users
    getUserCRUD,
    getAddNewUserPage, postUserCRUD,
    getEditUserPage, putUserCRUD,
    deleteUserCRUD,

    getAllAccounts,
    getAllBlogs, getAllCategories, getAllComments,
    getAllImages, getAllLikes, getAllParticipations,
    getAllPosts, getAllProjects, getAllProjectFund,
    getAllVideos
}
