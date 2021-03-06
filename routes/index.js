var express = require('express');
var router = express.Router();
var Realm = require('realm');

//for realm
let PostSchema ={ //a model(class?)
	name: 'Post',
	properties: {
		timestamp: 'date',
		title: 'string',
		content: 'string',
		tag: 'string'
	}
};

var blogRealm = new Realm({
	path: 'blog.realm', //name of database
	schema: [PostSchema]
});

/* GET home page. */
router.get('/', function(req, res, next) {
  let posts = blogRealm.objects('Post').sorted('timestamp',true).slice(0, 4);
  res.render('index.ejs', {posts:posts});
});

router.get('/write', function(req, res){
	res.sendFile(__dirname + "/write.html");
});

router.get('/blog-post/:postTime', function(req, res, next){

	let requested_post = blogRealm.objects('Post').filter(function(post){
		if(post.timestamp.getTime() == req.params.postTime){
			return req.params.postTime;
		}
	})[0];

	res.render('post-read-more.ejs', {requested_post});
});


router.post('/write', function(req,res){ //post handler

	let timestamp = new Date(),
	title = req.body['title'],
	content = req.body['content'],
	tag = req.body['tag'];

	blogRealm.write(() => {
		blogRealm.create('Post', {
			timestamp: timestamp,
		  title: title,
		  content: content,
			tag: tag });
	});

	res.sendFile(__dirname + "/write-complete.html");
});



module.exports = router;
