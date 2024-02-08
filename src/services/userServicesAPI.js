import db from "../models";
import bcrypt, { compareSync, hashSync } from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

let checkUserNameExist = (userName) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.Account.findOne({
                where: {
                    userName: userName
                },
            });

            if (!user) {
                resolve(false);
            }

            resolve(true);

        } catch (error) {
            reject(error);
        }
    })
}

let hashPasswordUser = (userPassword) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await hashSync(userPassword, salt);
            resolve(hashPassword);
        } catch (error) {
            reject(error);
        }
    })
}

let checkEmailExist = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                where: {
                    email: userEmail,
                }
            });

            if (users.length === 0) {
                resolve(false);
            } else {
                resolve(true);
            }
        } catch (error) {
            reject(error);
        }
    })
}

let handleUserLogin = (userAccount) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userStatus = {};
            let isUserNameExist = await checkUserNameExist(userAccount.userName);

            if (isUserNameExist) {
                let userCheck = await db.Account.findOne({
                    where: {
                        userName: userAccount.userName,
                    },
                });

                if (userCheck) {
                    let isPasswordExist = await bcrypt.compareSync(userAccount.password, userCheck.password);

                    if (isPasswordExist) {
                        userStatus.errCode = 1;
                        userStatus.errMessage = 'OK';
                        userStatus.user = userCheck;
                    } else {
                        userStatus.errCode = 3;
                        userStatus.errMessage = 'Wrong password';
                    }
                } else {
                    userStatus.errCode = 2;
                    userStatus.errMessage = 'User is not found!!!';
                }

            } else {
                userStatus.errCode = 2;
                userStatus.errMessage = 'User name is not found in the system!!!';
            }

            resolve(userStatus);
        } catch (error) {
            reject(error);
        }
    })
}

let handleGetUserInfor = (userID) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = {};

            if (userID === 'all') {
                users = await db.User.findAll();
            }

            if (userID && userID !== 'all') {
                users = await db.User.findOne({
                    where: {
                        userID: userID,
                    }
                })
            }

            resolve(users);

        } catch (error) {
            reject(error);
        }
    })
}

let handleCreateUserInfor = (userData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await handleGetUserInfor('all');
            let isEmailExist = await checkEmailExist(userData.email);

            if (isEmailExist) {
                resolve({
                    errCode: 0,
                    errMessage: 'The email is already exist in the system!!!',
                })
            } else {
                await db.User.create({
                    userID: Number(users[users.length - 1].userID) + 1,
                    fullName: userData.fullName,
                    birthDay: userData.birthDay,
                    address: userData.address,
                    email: userData.email,
                    phone: userData.phone,
                    typeRole: userData.typeRole,
                });
    
                resolve({
                    errCode: 1,
                    errMessage: 'OK',
                })
            }
            
        } catch (error) {
            reject(error);
        }
    })
}

let handleUpdateUserInfor = (dataUserInforUpdate) => {
    return new Promise(async (resolve, reject) => {
        try {
            let currentUser = await db.User.findOne({
                where: {
                    userID: dataUserInforUpdate.userID,
                }
            });

            let isEmailExist = await checkEmailExist(dataUserInforUpdate.email);
            let isEqual = currentUser.email === dataUserInforUpdate.email;

            if ((isEmailExist && isEqual) || !isEmailExist) {
                currentUser.userName = dataUserInforUpdate.userName;
                currentUser.birthDay = dataUserInforUpdate.birthDay;
                currentUser.address = dataUserInforUpdate.address;
                currentUser.email = dataUserInforUpdate.email;
                currentUser.phone = dataUserInforUpdate.phone;
                currentUser.typeRole = dataUserInforUpdate.typeRole;

                await currentUser.save();

                resolve({
                    errCode: 1,
                    errMessage: 'OK',
                })
            } else {
                resolve({
                    errCode: 0,
                    errMessage: 'The email is already in use by another user',
                })
            }

        } catch (error) {
            reject(error);
        }
    })
} 

let handleDeleteUserInfor = (userDeleteID) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    userID: userDeleteID,
                }
            });

            if (!user) {
                resolve({
                    errCode: 0,
                    errMessage: 'User is not found!!!',
                })
            } else {
                await user.destroy();

                resolve({
                    errCode: 1,
                    errMessage: 'OK',
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}

let handleGetUserAccount = (userID) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = {};

            if (userID === 'all') {
                users = await db.Account.findAll();
            }

            if (userID && userID !== 'all') {
                users = await db.Account.findOne({
                    where: {
                        userID: userID,
                    }
                })
            }

            resolve(users);

        } catch (error) {
            reject(error);
        }
    })
}

let handleCreateUserAccount = (userInfor) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userStatus = {};
            let isUserNameExist = await checkUserNameExist(userInfor.userName);
            
            if (isUserNameExist) {
                userStatus.errCode = 0;
                userStatus.errMessage = 'Username is already exist!';
            } else {
                let hashPassword = await hashPasswordUser(userInfor.password);
                let users = await handleGetUserAccount('all');

                await db.Account.create({
                    userID: Number(users[users.length - 1].userID) + 1,
                    userName: userInfor.userName,
                    password: hashPassword,
                });

                userStatus.errCode = 1;
                userStatus.errMessage = 'Create new user successfully!';
            }

            resolve(userStatus);

        } catch (error) {
            reject(error);
        }
    })
}

let checkSamePassword = (dataAccountUpdate) => {
    return new Promise(async (resolve, reject) => {
        try {
            let currentUser = await db.Account.findOne({
                where: {
                    userID: dataAccountUpdate.userID,
                }
            });

            if (currentUser) {
                let currentPassword = currentUser.password;

                let check = await bcrypt.compareSync(dataAccountUpdate.password, currentPassword);

                if (check) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            } else {
                resolve(false); 
            }

        } catch (error) {
            reject(error);
        }
    });
};

let handleUpdateUserAccount = (dataAccountUpdate) => {
    return new Promise(async (resolve, reject) => {
        try {
            let isUserNameExist = await checkUserNameExist(dataAccountUpdate.userName);

            if (!isUserNameExist) {
                resolve({
                    errCode: 2,
                    errMessage: 'User is not found!!!', 
                });
            } else {
                let user = await db.Account.findOne({
                    where: {
                        userID: dataAccountUpdate.userID,
                    }
                });

                let isSamePassword = await checkSamePassword(dataAccountUpdate);
    
                if (isSamePassword) {
                    resolve({
                        errCode: 0,
                        errMessage: 'The new password must be different from the old password!!!',
                    });
                } else {
                    let hashPassword = await bcrypt.hashSync(dataAccountUpdate.password, salt);
    
                    user.password = hashPassword;
    
                    await user.save();
    
                    resolve({
                        errCode: 1,
                        errMessage: 'OK',
                    });
                }
            }
            
        } catch (error) {
            reject(error);
        }
    });
};

let handleDeleteUserAccount = (deleteUserID) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.Account.findOne({
                where: {
                    userID: deleteUserID,
                }
            })

            if (!user) {
                resolve({
                    errCode: 0,
                    errMessage: 'User is not found!!!',
                })
            } else {
                await user.destroy();

                resolve({
                    errCode: 1,
                    errMessage: 'OK',
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    handleUserLogin,
    handleGetUserInfor, handleCreateUserInfor, handleUpdateUserInfor, handleDeleteUserInfor,
    handleGetUserAccount, handleCreateUserAccount, handleUpdateUserAccount, handleDeleteUserAccount
}
