const express = require('express')
const sequelize = require('./utils/db')
const sessions = require('express-session')

const User = require('./models/user')
const session = require('express-session')
User.sync()

const Note = require('./models/notes')
Note.sync();

const app = express()

app.use(sessions({
    secret: "thisismysecretkey", 
    saveUninitialized:true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 24 hours
    resave: false 
}));

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const userRoutes = require('./routes/users')
app.use('/users', userRoutes)

const notesRoutes = require('./routes/notes')
app.use('/notes', userRoutes)

app.listen(3012, () => {
    console.log('server is connected')
})