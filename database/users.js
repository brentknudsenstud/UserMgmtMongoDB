const mongoose = require('mongoose');
const databaseUrl = 'mongodb://localhost:27017/UserMgmtMongoDB'
let connection = null;
let UserSchema = null;
async function addUser (user) {
// add a user to the database
    return new Promise(resolve => {
        UserSchema.create(user, function(err, o) {
            if (err)
            console.log(err, 'addingUser');
            resolve();
        })
    })
} 

async function editUser(user) {
// edit a user that is already in the database
return new Promise(resolve => {
    UserSchema.updateOne({ userid: user.userid}, user, function(err, o) {
        if (err)
        console.log(err, 'editingUser');
        resolve();
    })
})
}

async function deleteUser(user) {
// delete a user from the database
return new Promise(resolve => {
    UserSchema.deleteOne(user, function(err, o) {
        if (err)
        console.log(err, 'deletingUser');
        resolve();
    })
})
}

async function getUsers(isDescending, search) {
    const sortvalue = isDescending ? 'descending' : 'ascending';
    return UserSchema.find(
        {
           last_name: {
               $regex: new RegExp(search, 'i')
           }     
        }
    ).sort({last_name: sortvalue})
}

function startDatabaseConnection() {
    connection = mongoose.createConnection(databaseUrl, {useNewUrlParser: true, useUnifiedTopology: true});
    console.log('start database connection');
    UserSchema = connection.model('users', require('./userschema'));
}

module.exports = {
    addUser, editUser, deleteUser, getUsers, startDatabaseConnection
}