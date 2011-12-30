
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express Template',
    			description: 'Express Template',
			keywords: 'Node, Express' })
};
