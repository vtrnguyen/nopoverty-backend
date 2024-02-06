import db from "../models";

let createNewUser = async (data) => {
    return new Promise (async (resolve, reject) => {
        try {
            await db.User.create({
                userID: data.userID,
                fullName: data.fullName,
                birthDay: data.birthDay,
                address: data.address,
                email: data.email,
                phone: data.phone,
                typeRole: data.typeRole,
            });
            
            resolve('Create a new user is succeed!!!');

        } catch (e) {
            reject(e);
        }
    })
}

let getInforUserById = (userID) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    userID: userID,
                }
            });

            if (user) {
                resolve(user);
            } else {
                resolve({});
            }

        } catch (e) {
            reject(e);
        }
    })
}

let updateUser = (userData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    userID: userData.userID,
                }
            })

            if (user) {
                user.fullName = userData.fullName;
                user.birthDay = userData.userID;
                user.address = userData.address;
                user.email = userData.email;
                user.phone = userData.phone;
                user.typeRole = userData.typeRole;

                await user.save();
                resolve('Update user is succeed!');
            } else {
                resolve('User is not found!!!');
            }

        } catch (e) {
            reject(e);
        }
    })
}

let deleteUser = (userID) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    userID: userID,
                },
            });

            if (user) {
                await user.destroy();
                resolve('Delete user is succeed!');
            } else {
                resolve('User is not found!!!');
            }

        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    createNewUser, getInforUserById, updateUser, deleteUser
}
