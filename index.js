//document.write('Hello HTML');
//필요한 모듈 선언
var express = require('express');
var http = require('http');
var app = express();
// express 서버 포트 설정(cafe24 호스팅 서버는 8001 포트 사용)
app.set('port', process.env.PORT || 8001)

//html 템플릿 엔진 ejs 설정
app.set('views', __dirname + '/views');
app.set('images', __dirname + '/images');
app.set('view engine', 'ejs');
//서버 생성
http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
    console.log(__dirname);
});

//라우팅 모듈 선
var indexRouter = require('./routes/index');
app.use('/', indexRouter);

//var detailRouter= require('./routes/detail');
//app.use('/detail', detailRouter);

var clubRouter = require('./routes/club/club');
app.use('/club', clubRouter);    //클럽
app.use('/public',express.static('public'));
//request 요청 URL과 처리 로직을 선언한 라우팅 모듈 매핑

//var viewRouter = require('./views');
//app.use('/view', viewRouter );    //클럽
