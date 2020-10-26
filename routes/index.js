//request 요청 URL과 처리 로직을 선언한 라우팅 모듈 매핑


//var UpsData = require( '../public/js/grobalVar.js');
var express = require('express');
var router = express.Router();
//var ModbusRTU = require('modbus-serial');
var UpsData = {
		"module_1" : 	{"vol":330.1,"amp":10.1,"power":0},
		"module_2" : 	{"vol":330.2,"amp":10.2,"power":0},
		"module_3" : 	{"vol":330.3,"amp":10.3,"power":0},
		"module_4" : 	{"vol":330.4,"amp":10.4,"power":0},
		"module_5" : 	{"vol":330.5,"amp":10.5,"power":0},
		"module_6" : 	{"vol":330.6,"amp":10.6,"power":0},
		"dcac" : 	{"vol":330.6,"amp":10.6,"power":0},
};
//var detail = require('./detail');   
//라우터의 get()함수를 이용해 request URL('/')에 대한 업무처리 로직 정의

function randomFillSampleData(){
	UpsData.module_1.vol=355 + Math.random()*5;
	UpsData.module_2.vol=355 + Math.random()*5;
	UpsData.module_3.vol=355 + Math.random()*5;
	UpsData.module_4.vol=355 + Math.random()*5;
	UpsData.module_5.vol=355 + Math.random()*5;
	UpsData.module_6.vol=355 + Math.random()*5;

	UpsData.module_1.amp=10 + Math.random()*5;
	UpsData.module_2.amp=10 + Math.random()*5;
	UpsData.module_3.amp=10 + Math.random()*5;
	UpsData.module_4.amp=10 + Math.random()*5;
	UpsData.module_5.amp=10 + Math.random()*5;
	UpsData.module_6.amp=10 + Math.random()*5;


	UpsData.dcac.vol =335 + Math.random()*5;
	UpsData.dcac.amp =12 + Math.random()*10;

	UpsData.module_1.power= UpsData.module_1.vol*UpsData.module_1.amp;
	UpsData.module_2.power= UpsData.module_2.vol*UpsData.module_2.amp;
	UpsData.module_3.power= UpsData.module_3.vol*UpsData.module_3.amp;
	UpsData.module_4.power= UpsData.module_4.vol*UpsData.module_4.amp;
	UpsData.module_5.power= UpsData.module_5.vol*UpsData.module_5.amp;
	UpsData.module_6.power= UpsData.module_6.vol*UpsData.module_6.amp;
}

router.get('/', function(req, res, next) {
    //res.send('index page...');
    res.render('index', {data : 'index testData list ejsk'});
}) ;
router.get('/detail', function(req, res, next) {
    res.render('detail', {data : 'index testData list ejsk'});
});
router.get('/jsonData', function(req, res, next) {
    //res.type("application/json");
    //res.send(JSON.stringify(items));
    randomFillSampleData();
    res.type("text/json");
    res.send(UpsData);
   // res.render('jsonData', {data : 'index testData list ejsk'});
});
/*
router.get('/jsonData', function(req, res, next) {
    //res.render('jsonData', {data : 'index testData list ejsk'});
    res.render('jsonData', {data : 'index testData list ejsk'});
};
*/
//모듈에 등록해야 web.js에서 app.use 함수를 통해서 사용 가능
module.exports = router;
