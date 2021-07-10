const filename = "./users.json";
const express = require("express");
const fs = require("fs");
const { get } = require("https");
const path = require('path');
const mongoose = require('mongoose');
const {startDatabaseConnection, getUsers, addUser, deleteUser, editUser} = require('./database/users')
const app = express();

app.use('/styles', express.static('./styles'));

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', (request, response) => {
    response.render('index', {
        title: 'My title from the server',
        headerMessage: 'My header from server',
        partialText: ' is entertaining!',
        users: 
        [
        {
        username: 'Brent', 
        email: 'brent@example.com'
        },
        {
        username: 'Raymond', 
        email: 'raymond@example.com'
        },
        {
        username: 'Knudsen', 
        email: 'knudsen@example.com'
        }
    ],
    date: new Date()
    });
});
app.get("/userlist", async (request, response) => {
    console.log(request.body);
    const isDescending = request.query.descending === 'true';
    const search = request.query.search ?? '' 
    const users = await getUsers(isDescending, search);
    console.log(users);
    response.render('userlist', {users});
})
app.post('/createuser', async (request, response) => {
    const user = request.body;
    console.log(user);
    await addUser(user);
    response.redirect('/userlist');
})
app.use('/frontendjs', express.static('frontendjs'));
startDatabaseConnection();
app.listen(3000, () => {
    console.log("Express app is running on port 3000");
});

app.delete('/deleteuser', async (request, response) => {
    const user = request.body.userToDelete;
    await deleteUser(user);
    response.send('deleted user');
}) 

app.put('/updateuser', async (request, response) => {
  const userToUpdate = request.body.userToUpdate;
  await editUser(userToUpdate)
    response.send('updated user ' + JSON.stringify(userToUpdate))
})