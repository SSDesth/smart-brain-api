
const hanbleregister = (req, res,db, bcrypt) =>{
	
	const {email, password, name} = req.body;
	
	if(!email || !name || !password){
		return res.status(400).json('Incorrect form')
	}
	res.status(400).json("email:",email, "pass:",password, "Name:",name)
	const hash = bcrypt.hashSync(password);
	
	db.transaction(trx =>{
		
		trx.insert({
			hash : hash,
			email:email
		})
		.into('login')
		.returning('email')
		.then(loginEmail =>{
			trx('users').returning('*')
			.insert({
				email:loginEmail[0],
				name:name,
				joined:new Date()
			}).then(user=>{
				res.json(user[0]);
			})
			.then(trx.commit)
			.catch(err=>res.status(400).json('Unable to Register!'));
		}).catch(err=>res.status(400).json('Unable to Register'));
	}).catch(err=>res.status(400).json('UUn error'));
}
module.exports={
	hanbleregister:hanbleregister
};