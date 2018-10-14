var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var cors = require('cors');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const post = require('./routes/api/post');
const sprite = require('./routes/api/sprite');
const goal = require('./routes/api/goal');

const app = express();
app.use(cors());
//body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//DB Config
const db = require('./config/keys').mongoURI;
console.log(db);
//Connect to MongoDB
mongoose
    .connect(db, {useNewUrlParser: true})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// app.get('/', (req, res)=> res.send(`I'm up!`));
//Passport Middleware
app.use(passport.initialize());

//Passport Config
require('./config/passport')(passport);

//Use routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/post', post);
app.use('/api/sprite', sprite);
app.use('/api/goal', goal);

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}
const port = process.env.PORT || 5000;
app.listen(port, ()=> console.log(`Server running on port ${port}`));
