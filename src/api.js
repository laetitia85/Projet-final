const express = require ('express');
const bodyParser = require ('body-parser');
var cors = require('cors')

const app = express();                                                                                         // create express app 
app.use(cors())                                                                                    
const port = process.env.PORT || 8000;    
// const myRoutes = require('./routes/router')  
const Users = require('./routes/users') 
const UsersPro = require('./routes/userspro') 
const Contents = require('./routes/contents')    
const Comments = require('./routes/comments')
const Admin = require('./routes/admin')                                                                     // Setup server port
app.use (bodyParser.urlencoded ({extended: true}))                                                              // parse requests of content-type - application/x-www-form-urlencoded
app.use (bodyParser.json()) 
app.use('/', Users, UsersPro, Contents, Comments, Admin)
                                                                                  // parse requests of content-type - application/json

app.listen (port, () => {                                                                                       //listen for requests
    console.log(`Server is listening on port ${port}`)
});