const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: 'scoops',
    database: 'smart-brain'
  }
});

const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(cors());
// TODO: convert the rest of the routes to the 'signin' format below
app.get('/', (req, res) => { res.send(database.users) });
app.post('/signin', signin.handleSignin(db, bcrypt));
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) });
app.put('/image', (req, res) => { image.handleImage(req, res, db) });
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) });

app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});

/*
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user
*/
// bcrypt.compare("eyyyyyybuddy", '$2a$10$agKlkvUTZETSl7zCCwFnWumaFSMZOkhQbdRFRkWZkq0XnTyFLGAhW', function (err, res) {
  //   console.log('first guess', res);
  // });
  // bcrypt.compare("veggies", '$2a$10$agKlkvUTZETSl7zCCwFnWumaFSMZOkhQbdRFRkWZkq0XnTyFLGAhW', function (err, res) {
  //   console.log('second guess', res);
  // });


// db.select('*').from('users').then((data) => {
//   console.log(data);
// });