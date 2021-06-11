const filename = "./users.json";
const express = require("express");
const fs = require("fs");
const path = require('path');

const app = express();
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
app.post("/userlist", (request, response) => {
    console.log(request.body)
    saveToFile(request.body)
    response.redirect(307, "/userlist");
    
})
app.get('/userlist', (request, response) => {
    const users = getJsonContents()
    response.render("userlist", users)
})

app.listen(3000, () => {
    console.log("Express app is running on port 3000");
});

function getJsonContents() {
    if(fs.existsSync(filename)) {
        const users = require(filename)
        return users
    } else 
    return []
} 

function saveToFile(user) {
    const users = getJsonContents()
    const newUsers = [...users, user]
    const message = JSON.stringify(newUsers);
    fs.writeFileSync(filename, message) 
}