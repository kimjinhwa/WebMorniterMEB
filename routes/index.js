//request 요청 URL과 처리 로직을 선언한 라우팅 모듈 매핑


//var UpsData = require( '../public/js/grobalVar.js');
var express = require('express');
var router = express.Router();
// for serial modbus
var ModbusRTU = require('modbus-serial');
var client = new ModbusRTU();
	client.connectRTUBuffered("/dev/ttyUSB0",{baudRate:9600},read);
	client.setID(1);
	client.setTimeout(500);


var UpsData = {
		"module_1" : 	{"vol":330.1,"amp":10.1,"power":0,"ovol":330.1,"oamp":10.1,"opower":0},
		"module_2" : 	{"vol":330.2,"amp":10.2,"power":0,"ovol":330.1,"oamp":10.1,"opower":0},
		"module_3" : 	{"vol":330.3,"amp":10.3,"power":0,"ovol":330.1,"oamp":10.1,"opower":0},
		"module_4" : 	{"vol":330.4,"amp":10.4,"power":0,"ovol":330.1,"oamp":10.1,"opower":0},
		"module_5" : 	{"vol":330.5,"amp":10.5,"power":0,"ovol":330.1,"oamp":10.1,"opower":0},
		"module_6" : 	{"vol":330.6,"amp":10.6,"power":0,"ovol":330.1,"oamp":10.1,"opower":0},
		"dcac" : 	{"vol":330.6,"amp":10.6,"power":0},
};
function write(){
	client.writeRegisters(5,[0,0xffff])
	.then(read);
};
function read(){
	//client.readInputRegisters(0,10).then(console.log);
	client.readInputRegisters(0,10,function(err,data){
		if(err){
			UpsData.module_1.vol=0;
			UpsData.module_1.amp=0;
			UpsData.module_1.power=0;
			UpsData.module_1.ovol=0;
			UpsData.module_1.oamp=0;
			UpsData.module_1.opower=0;

			UpsData.module_2.vol=0;
			UpsData.module_2.amp=0;
			UpsData.module_2.power=0;
			UpsData.module_2.ovol=0;
			UpsData.module_2.oamp=0;
			UpsData.module_2.opower=0;

			UpsData.module_3.vol=0;
			UpsData.module_3.amp=0;
			UpsData.module_3.power=0;
			UpsData.module_3.ovol=0;
			UpsData.module_3.oamp=0;
			UpsData.module_3.opower=0;

			UpsData.module_4.vol=0;
			UpsData.module_4.amp=0;
			UpsData.module_4.power=0;
			UpsData.module_4.ovol=0;
			UpsData.module_4.oamp=0;
			UpsData.module_4.opower=0;

			UpsData.module_5.vol=0;
			UpsData.module_5.amp=0;
			UpsData.module_5.power=0;
			UpsData.module_5.ovol=0;
			UpsData.module_5.oamp=0;
			UpsData.module_5.opower=0;

			UpsData.module_6.vol=0;
			UpsData.module_6.amp=0;
			UpsData.module_6.power=0;
			UpsData.module_6.ovol=0;
			UpsData.module_6.oamp=0;
			UpsData.module_6.opower=0;

			UpsData.dcac.vol=0;
			UpsData.dcac.amp=0;
			UpsData.dcac.power=0;
			UpsData.dcac.ovol=0;
			UpsData.dcac.oamp=0;
			UpsData.dcac.opower=0;
			console.log("Modbus Receive Data Error.");
			return;
		}
		var idx=0;
		UpsData.module_1.vol=data.data[idx++];
		UpsData.module_1.amp=data.data[idx++];
		UpsData.module_1.power=data.data[idx++];
		UpsData.module_1.ovol=data.data[idx++];
		UpsData.module_1.oamp=data.data[idx++];
		UpsData.module_1.opower=data.data[idx++];

		UpsData.module_2.vol=data.data[idx++];
		UpsData.module_2.amp=data.data[idx++];
		UpsData.module_2.power=data.data[idx++];
		UpsData.module_2.ovol=data.data[idx++];
		UpsData.module_2.oamp=data.data[idx++];
		UpsData.module_2.opower=data.data[idx++];

		UpsData.module_3.vol=data.data[idx++];
		UpsData.module_3.amp=data.data[idx++];
		UpsData.module_3.power=data.data[idx++];
		UpsData.module_3.ovol=data.data[idx++];
		UpsData.module_3.oamp=data.data[idx++];
		UpsData.module_3.opower=data.data[idx++];

		UpsData.module_4.vol=data.data[idx++];
		UpsData.module_4.amp=data.data[idx++];
		UpsData.module_4.power=data.data[idx++];
		UpsData.module_4.ovol=data.data[idx++];
		UpsData.module_4.oamp=data.data[idx++];
		UpsData.module_4.opower=data.data[idx++];

		UpsData.module_5.vol=data.data[idx++];
		UpsData.module_5.amp=data.data[idx++];
		UpsData.module_5.power=data.data[idx++];
		UpsData.module_5.ovol=data.data[idx++];
		UpsData.module_5.oamp=data.data[idx++];
		UpsData.module_5.opower=data.data[idx++];

		UpsData.module_6.vol=data.data[idx++];
		UpsData.module_6.amp=data.data[idx++];
		UpsData.module_6.power=data.data[idx++];
		UpsData.module_6.ovol=data.data[idx++];
		UpsData.module_6.oamp=data.data[idx++];
		UpsData.module_6.opower=data.data[idx++];

		UpsData.dcac.vol=data.data[idx++];
		UpsData.dcac.amp=data.data[idx++];
		UpsData.dcac.power=data.data[idx++];
		UpsData.dcac.ovol=data.data[idx++];
		UpsData.dcac.oamp=data.data[idx++];
		UpsData.dcac.opower=data.data[idx];


		console.log(UpsData.module_1.vol);
		console.log(UpsData.module_1.amp);
		console.log(UpsData.module_1.power);
	});
};

	//setInterval(function(){
		//client.readInputRegisters(0,10,function(err,data){
			//console.log(data.data);
		//});
	//},1000);
//var detail = require('./detail');   
//라우터의 get()함수를 이용해 request URL('/')에 대한 업무처리 로직 정의

function randomFillSampleData(){
	read();
	/*
	UpsData.module_1.vol+=Math.random()*5;
	UpsData.module_2.vol+=Math.random()*5;
	UpsData.module_3.vol+=Math.random()*5;
	UpsData.module_4.vol+=Math.random()*5;
	UpsData.module_5.vol+=Math.random()*5;
	UpsData.module_6.vol+=Math.random()*5;

	UpsData.module_1.amp+=Math.random()*5;
	UpsData.module_2.amp+=Math.random()*5;
	UpsData.module_3.amp+=Math.random()*5;
	UpsData.module_4.amp+=Math.random()*5;
	UpsData.module_5.amp+=Math.random()*5;
	UpsData.module_6.amp+=Math.random()*5;

	UpsData.dcac.vol +=Math.random()*5;
	UpsData.dcac.amp +=Math.random()*10;

	UpsData.module_1.power= UpsData.module_1.vol*UpsData.module_1.amp;
	UpsData.module_2.power= UpsData.module_2.vol*UpsData.module_2.amp;
	UpsData.module_3.power= UpsData.module_3.vol*UpsData.module_3.amp;
	UpsData.module_4.power= UpsData.module_4.vol*UpsData.module_4.amp;
	UpsData.module_5.power= UpsData.module_5.vol*UpsData.module_5.amp;
	UpsData.module_6.power= UpsData.module_6.vol*UpsData.module_6.amp;
	*/
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
