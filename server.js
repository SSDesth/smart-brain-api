const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register.js');
const signin = require('./controllers/signin.js');
const profile = require('./controllers/profile.js');
const image = require('./controllers/image.js');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '115410802',
    database : 'smart-brain'
  }
});

const app =  express();

const saltRounds = 10;

app.use(express.json());
app.use(cors());

/* ======== iniciar el server ========*/
	app.get('/',(req,res) =>{
		res.send(database.users);
	})


	app.listen(3000, ()=>{
		console.log('app is running on port 3000');
	});

/* ======== Signin ======== */
	app.post('/signin', (req,res)=>{
		signin.hanbleSignin(req,res, db, bcrypt,saltRounds)
	});

/* ======== Register ======== */
	app.post('/register',(req,res)=>{
		register.hanbleregister(req,res, db, bcrypt,saltRounds)
	});

/* ======== Profile ======== */
	app.get('/profile/:id',(req,res)=>{
		profile.hanbleProfile(req,res,db)
	});

/* ======== Image ======== */
	app.put('/image' , (req,res)=>{
		image.hanbleImage(req,res,db)
	});

/* ======== Api ======== */
	app.post('/imageurl' , (req,res)=>{
		console.log('test')
		image.handleApiCall(req,res)
	});