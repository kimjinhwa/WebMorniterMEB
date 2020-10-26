var detail= {
  //클럽목록
  list : function(req, res){

    //res.send('club list');
    res.render('club/clubList', {data : 'testData list ejs'});
  }
};
module.exports = detail;//request 요청 URL과 처리 로직을 선언한 라우팅 모듈 매핑