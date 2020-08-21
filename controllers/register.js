
const hanbleregister = (req, res,db, bcrypt) =>{
	
	const {email, password, name} = req.body;
	console.log('entre\n')
	if(!email || !name || !password){
		return res.status(400).json('Incorrect form')
	}
	console.log('Nombre: ',name,' email: ',email,'password: ', password)
	const hash = bcrypt.hashSync(password);
    db.transaction(trx => {
      trx.insert({
        hash: hash,
        email: email
      })
      .into('login')
      .returning('email')
      .then(loginEmail => {
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