const Clarifai =require('clarifai') ;

//clarifai API Setup
const app = new Clarifai.App({
 apiKey: '98043b27f80549f78acf7afd709cea90'
});

const handleApiCall = (req, res) =>{
	console.log(req.body.input)
	app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	.then(data=>{
		res.json(data)
	})
	.catch(err=> res.status(400).json('unable to work whit api'))
}



const hanbleImage = (req,res,db) =>{
		const{id} = req.body;
		db('users').where('id','=',id)
			.increment('entries',1)
			.returning('entries')
			.then(entries=>{
				res.json(entries[0]);
			})
			.catch(err => res.status(400).json('unable to get entries'))
	}


module.exports={
	hanbleImage:hanbleImage,
	handleApiCall:handleApiCall
};

