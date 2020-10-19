const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')

const logger = require('./middleware/logger')
const members = require('./Members')

const app = express()

// LOGGER MIDDLEWARE
// app.use(logger)

// BODY PARSER MIDDLEWARE
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// SEND A HTML
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'))
// })

// SET STATIC FOLDER
// app.use(express.static(path.join(__dirname, 'public')))

// HANDLEBARS MIDDLEWARE
app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

// HOMEPAGE ROUTE
app.get('/', (req, res) => {
  res.render('home', { title: 'Member App', members })
})

// MEMBERS API ROUTES
app.use('/api/members', require('./routes/api/members'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
