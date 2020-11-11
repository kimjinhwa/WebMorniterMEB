const simpleGit = require('simple-git');
const git = simpleGit();
git.init();
//git.init(onInit).addRemote('origin','https://github.com/kimjinhwa/WebMorniterMEB.git',onRemoteAdd);
//console.log(git);
//git.add(".");
git.fetch( onFetch);
function onFetch(err,fetchResult)
{
	if(err){
		console.log("ERROR:");
		console.log(err);
	}
	else{ 
		console.log("Succeed:");
		console.log(fetchResult);
	}
}
