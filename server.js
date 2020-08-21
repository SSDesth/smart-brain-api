const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register.js');
const signin = require('./controllers/signin.js');
const profile = require('./controllers/profile.js');
const image = require('./controllers/image.js');

const db = knex({
  client: 'pg',
  connection: {
    connectionString : process.env.DATABASE_URL,
    ssl:true,
  }
});

const app =  express();

app.use(express.json());
app.use(cors());

/* ======== iniciar el server ========*/
	app.get('/',(req,res) =>{
		res.send('it is working');
	})


	app.listen(process.env.PORT || 3000, ()=>{
		console.log(`app is running on port ${process.env.PORT}`);
	});

/* ======== Signin ======== */
	app.post('/signin', (req,res)=>{
		signin.hanbleSignin(req,res, db, bcrypt)
	});

/* ======== Register ======== */
	app.post('/register',(req,res)=>{
		register.hanbleregister(req,res, db, bcrypt)
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