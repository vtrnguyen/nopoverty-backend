import db from "../models";
import userServicesAPI from "../services/userServicesAPI";

// user login
let userLogin = async (req, res) => {
    let userStatus = {};
    // check email or password is empty
    if (!req.body.userName || !req.body.password) {
        userStatus.errCode = 0;
        userStatus.errMessage = 'Missing input parameter!!!';
    } else {
        userStatus = await userServicesAPI.handleUserLogin(req.body);
    }

    return res.status(200).json({
        userStatus
    })
}

// get user's information
let getUserInfor = async (req, res) => {
    let userStatus = {};

    if (!req.body.userID) {
        userStatus.errCode = 0;
        userStatus.errMessage = 'Missing inputs parameters!!!';
        userStatus.user = [];
    } else {
        let users = await userServicesAPI.handleGetUserInfor(req.body.userID);
        userStatus.errCode = 1;
        userStatus.errMessage = `Get user's information with userID equal ${req.body.userID} successfully!`;
        userStatus.user = users;
    }

    return res.status(200).json({
        userStatus,
    })
}

// create new user's information
let createUserInfor = async (req, res) => {
    let userStatus = {};

    if (!req.body.fullName || !req.body.birthDay || !req.body.email || !req.body.typeRole) {
        userStatus.errCode = 0;
        userStatus.errMessage = 'Missing inputs parameter!!!';
    } else {
        userStatus = await userServicesAPI.handleCreateUserInfor(req.body);
    }

    return res.status(200).json({
        userStatus,
    })
}

// update user's information
let updateUserInfor = async (req, res) => {
    let userStatus = {};

    if (!req.body.fullName || !req.body.birthDay || !req.body.email || !req.body.typeRole) {
        userStatus.errCode = 0;
        userStatus.errMessage = 'Missing inputs parameters';
    } else {
        userStatus = await userServicesAPI.handleUpdateUserInfor(req.body);
    }
    
    return res.status(200).json({
        userStatus,
    })
}

// delete user's information
let deleteUserInfor = async (req, res) => {
    let userStatus = {};

    if (!req.body.userID) {
        userStatus.errCode = 0;
        userStatus.errMessage = 'Missing inputs parameter!!!';
    } else {
        userStatus = await userServicesAPI.handleDeleteUserInfor(req.body.userID);
    }

    return res.status(200).json({
        userStatus,
    })
}

// get user's account
let getUserAccount = async (req, res) => {
    let userStatus = {};

    if (!req.body.userID) {
        userStatus.errCode = 0;
        userStatus.errMessage = 'Missing inputs parameters!!!';
        userStatus.user = [];
    } else {
        let users = await userServicesAPI.handleGetUserAccount(req.body.userID);
        userStatus.errCode = 1;
        userStatus.errMessage = `Get user's account with userID equal ${req.body.userID} successfully!`;
        userStatus.user = users;
    }

    return res.status(200).json({
        userStatus,
    })
}

// create new account
let createUserAccount = async (req, res) => {
    let userStatus = {};

    if (!req.body.userName || !req.body.password) {
        userStatus.errCode = 0;
        userStatus.errMessage = 'Missing inputs parameter!!!';
    } else {
        userStatus = await userServicesAPI.handleCreateUserAccount(req.body);
    }

    return res.status(200).json({
        userStatus,
    })
}

// update user account
let updateUserAccount = async (req, res) => {
    let userStatus = {};

    if (!req.body.userID || !req.body.userName || !req.body.password) {
        userStatus.errCode = 0;
        userStatus.errMessage = 'Missing inputs parameters';
    } else {
        userStatus = await userServicesAPI.handleUpdateUserAccount(req.body);
    }

    return res.status(200).json({
        userStatus,
    })
}

// delete user account
let deleteUserAccount = async (req, res) => {
    let userStatus = {};
    
    if (!req.body.userID) {
        userStatus.errCode = 0;
        userStatus.errMessage = 'Missing inputs paramerter!!!';
    } else {
        userStatus = await userServicesAPI.handleDeleteUserAccount(req.body.userID); 
    }

    return res.status(200).json({
        userStatus,
    })
}

module.exports = {
    userLogin, 
    getUserInfor, createUserInfor, updateUserInfor, deleteUserInfor,
    getUserAccount, createUserAccount, updateUserAccount, deleteUserAccount
}
