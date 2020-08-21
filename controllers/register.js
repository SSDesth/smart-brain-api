
const hanbleregister = (req, res,db, bcrypt) =>{
	
	const {email, password, name} = req.body;
	console.log(db)
	if(!email || !name || !password){
		return res.status(400).json('Incorrect form')
	}
	const hash = bcrypt.hashSync(password);
    db.transaction(trx => {
      console.log('primer qwery')
      trx.insert({
        hash: hash,
        email: email
      })
      .into('login')
      .returning('email')
      .then(loginEmail => {
      	console.log('primer qwery terminado')
        return trx('users')
          .returning('*')
          .insert({
            email: loginEmail[0],
            name: name,
            joined: new Date()
          })
          .then(user => {
            res.json(user[0]);
          })
      })
      .then(trx.commit)
      .catch(trx.rollback)
    })
    .catch(err => res.status(400).json('unable to register'))
}
module.exports={
	hanbleregister:hanbleregister
};