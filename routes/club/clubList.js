/*
var clubList = {
    //클럽목록
    list : function(req, res){
        res.send('club list...');
    }
};
*/
var clubList = {
  //클럽목록
  list : function(req, res){

    //res.send('club list');
    res.render('club/clubList', {data : 'testData list ejs'});
  }
};

module.exports = clubList;