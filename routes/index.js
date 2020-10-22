//request 요청 URL과 처리 로직을 선언한 라우팅 모듈 매핑
var express = require('express');
var router = express.Router();

var detail = require('./detail');   
//라우터의 get()함수를 이용해 request URL('/')에 대한 업무처리 로직 정의
router.get('/', function(req, res, next) {
    //res.send('index page...');
    res.render('index', {data : 'index testData list ejsk'});
}) ;
router.get('/detail', function(req, res, next) {
    res.render('detail', {data : 'index testData list ejsk'});
});

//모듈에 등록해야 web.js에서 app.use 함수를 통해서 사용 가능
module.exports = router;
