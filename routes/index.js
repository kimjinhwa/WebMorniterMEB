//request 요청 URL과 처리 로직을 선언한 라우팅 모듈 매핑


//var UpsData = require( '../public/js/grobalVar.js');
var express = require('express');
var router = express.Router();
var fs= require('fs');
// for serial modbus
var ModbusRTU = require('modbus-serial');
var DateTimeControl = require('set-system-clock');

const {exec} = require('child_process');

var client = new ModbusRTU();
	client.setID(1);
	client.setTimeout(500);
	client.connectRTUBuffered("/dev/ttyUSB0",{baudRate:9600},read);

var tout=setTimeout(timeFunction,1000);
var isModbusReadOK=false;
function timeFunction(){
	setTimeout(timeFunction,1000);
	//console.log(client.isOpen);
	if(client.isOpen)
		randomFillSampleData();
	else
		client.connectRTUBuffered("/dev/ttyUSB0",{baudRate:9600},read);
}
var UpsData = {
		"module_1" : 	{"vol":330.1,"amp":10.1,"power":0,"ovol":330.1,"oamp":10.1,"opower":0},
		"module_2" : 	{"vol":330.2,"amp":10.2,"power":0,"ovol":330.1,"oamp":10.1,"opower":0},
		"module_3" : 	{"vol":330.3,"amp":10.3,"power":0,"ovol":330.1,"oamp":10.1,"opower":0},
		"module_4" : 	{"vol":330.4,"amp":10.4,"power":0,"ovol":330.1,"oamp":10.1,"opower":0},
		"module_5" : 	{"vol":330.5,"amp":10.5,"power":0,"ovol":330.1,"oamp":10.1,"opower":0},
		"module_6" : 	{"vol":330.6,"amp":10.6,"power":0,"ovol":330.1,"oamp":10.1,"opower":0},
		"dcac" : 	{"vol":330.6,"amp":10.6,"power":0,"ovol":330.6,"oamp":10.6,"opower":0},
};
function write(){
	client.writeRegisters(5,[0,0xffff])
	.then(read);
};
function fillZero(width,str){
	return str.length >= width ? str : new Array(width-str.length+1).join('0')+str;
}
function fileWrite(){
	var filename = '/srv/ftp/'

	var nowDate = new Date(Date.now());
		filename += nowDate.getFullYear();
		filename += fillZero(2,(nowDate.getMonth()+1).toString());
		filename += fillZero(2,(nowDate.getDate()).toString());
		filename += '.csv';

	var strFileData ;
		strFileData  = nowDate.getFullYear()+ '-';
		strFileData += fillZero(2,(nowDate.getMonth()+1).toString())+'-';
		strFileData += fillZero(2,(nowDate.getDate()).toString())+' ';
		strFileData += fillZero(2,(nowDate.getHours().toString()))+':';
		strFileData += fillZero(2,(nowDate.getMinutes().toString()))+':';
		strFileData += fillZero(2,(nowDate.getSeconds().toString()))+',';

		strFileData += UpsData.module_1.vol+",";
		strFileData += UpsData.module_1.amp+",";
		strFileData += UpsData.module_1.power+",";
		strFileData += UpsData.module_1.ovol+",";
		strFileData += UpsData.module_1.oamp+",";
		strFileData += UpsData.module_1.opower+","

		strFileData += UpsData.module_2.vol+",";
		strFileData += UpsData.module_2.amp+",";
		strFileData += UpsData.module_2.power+",";
		strFileData += UpsData.module_2.ovol+",";
		strFileData += UpsData.module_2.oamp+",";
		strFileData += UpsData.module_2.opower+","

		strFileData += UpsData.module_3.vol+",";
		strFileData += UpsData.module_3.amp+",";
		strFileData += UpsData.module_3.power+",";
		strFileData += UpsData.module_3.ovol+",";
		strFileData += UpsData.module_3.oamp+",";
		strFileData += UpsData.module_3.opower+","

		strFileData += UpsData.module_4.vol+",";
		strFileData += UpsData.module_4.amp+",";
		strFileData += UpsData.module_4.power+",";
		strFileData += UpsData.module_4.ovol+",";
		strFileData += UpsData.module_4.oamp+",";
		strFileData += UpsData.module_4.opower+","

		strFileData += UpsData.module_5.vol+",";
		strFileData += UpsData.module_5.amp+",";
		strFileData += UpsData.module_5.power+",";
		strFileData += UpsData.module_5.ovol+",";
		strFileData += UpsData.module_5.oamp+",";
		strFileData += UpsData.module_5.opower+","

		strFileData += UpsData.module_6.vol+",";
		strFileData += UpsData.module_6.amp+",";
		strFileData += UpsData.module_6.power+",";
		strFileData += UpsData.module_6.ovol+",";
		strFileData += UpsData.module_6.oamp+",";
		strFileData += UpsData.module_6.opower+","

		strFileData += UpsData.dcac.vol+",";
		strFileData += UpsData.dcac.amp+",";
		strFileData += UpsData.dcac.power+",";
		strFileData += UpsData.dcac.ovol+",";
		strFileData += UpsData.dcac.oamp+",";
		//strFileData += UpsData.dcac.opower;
		strFileData += UpsData.dcac.opower+"\r";


		fs.exists(filename,
			function(exists){
			if(!exists){
				var strText='datetime,1_Ivol,1_Iamp,1_Ipow,1_Ovol,1_Oamp,1_Opow, 2_Ivol,2_Iamp,2_Ipow,2_Ovol,2_Oamp,2_Opow, 3_Ivol,3_Iamp,3_Ipow,3_Ovol,3_Oamp,3_Opow, 4_Ivol,4_Iamp,4_Ipow,4_Ovol,4_Oamp,4_Opow, 5_Ivol,5_Iamp,5_Ipow,5_Ovol,5_Oamp,5_Opow, 6_Ivol,6_Iamp,6_Ipow,6_Ovol,6_Oamp,6_Opow, Inv_Ivol,Inv_Iamp,_Ipow,Inv_Ovol,Inv_Oamp,Inv_Opow\n\r';
				fs.appendFile(filename,strText,function(err){
				});
			}
			else{
				fs.appendFile(filename,strFileData,function(err){});
			}
		});
}

function read(){
	client.readInputRegisters(0,42,function(err,data){
		if(err){
			console.log(err);
			isModbusReadOK=false;
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
			console.log("Modbus Receive Data Error. Retry connect");
			return;
		};
		var idx=0;
		UpsData.module_1.vol=data.data[idx++]/10.0;
		UpsData.module_1.amp=data.data[idx++]/10.0;
		UpsData.module_1.power=data.data[idx++]/10.0;
		UpsData.module_1.ovol=data.data[idx++]/10.0;
		UpsData.module_1.oamp=data.data[idx++]/10.0;
		UpsData.module_1.opower=data.data[idx++]/10.0;

		UpsData.module_2.vol=data.data[idx++]/10.0;
		UpsData.module_2.amp=data.data[idx++]/10.0;
		UpsData.module_2.power=data.data[idx++]/10.0;
		UpsData.module_2.ovol=data.data[idx++]/10.0;
		UpsData.module_2.oamp=data.data[idx++]/10.0;
		UpsData.module_2.opower=data.data[idx++]/10.0;

		UpsData.module_3.vol=data.data[idx++]/10.0;
		UpsData.module_3.amp=data.data[idx++]/10.0;
		UpsData.module_3.power=data.data[idx++]/10.0;
		UpsData.module_3.ovol=data.data[idx++]/10.0;
		UpsData.module_3.oamp=data.data[idx++]/10.0;
		UpsData.module_3.opower=data.data[idx++]/10.0;

		UpsData.module_4.vol=data.data[idx++]/10.0;
		UpsData.module_4.amp=data.data[idx++]/10.0;
		UpsData.module_4.power=data.data[idx++]/10.0;
		UpsData.module_4.ovol=data.data[idx++]/10.0;
		UpsData.module_4.oamp=data.data[idx++]/10.0;
		UpsData.module_4.opower=data.data[idx++]/10.0;

		UpsData.module_5.vol=data.data[idx++]/10.0;
		UpsData.module_5.amp=data.data[idx++]/10.0;
		UpsData.module_5.power=data.data[idx++]/10.0;
		UpsData.module_5.ovol=data.data[idx++]/10.0;
		UpsData.module_5.oamp=data.data[idx++]/10.0;
		UpsData.module_5.opower=data.data[idx++]/10.0;

		UpsData.module_6.vol=data.data[idx++]/10.0;
		UpsData.module_6.amp=data.data[idx++]/10.0;
		UpsData.module_6.power=data.data[idx++]/10.0;
		UpsData.module_6.ovol=data.data[idx++]/10.0;
		UpsData.module_6.oamp=data.data[idx++]/10.0;
		UpsData.module_6.opower=data.data[idx++]/10.0;

		UpsData.dcac.vol=data.data[idx++]/10.0;
		UpsData.dcac.amp=data.data[idx++]/10.0;
		UpsData.dcac.power=data.data[idx++]/10.0;
		UpsData.dcac.ovol=data.data[idx++]/10.0;
		UpsData.dcac.oamp=data.data[idx++]/10.0;
		UpsData.dcac.opower=data.data[idx]/10.0;


		isModbusReadOK=true;
		fileWrite();
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

router.get('/command', function(req, res, next) {
	var rComm = req.param("command");
	var rdata={'rep':'deleted'};
	if(rComm == 'delete'){
		console.log('Delete command requested');
		exec("sudo rm /srv/ftp/* ",(error,stdout,stderr) => {
			if(error){
				console.log('stdout: ${error}'+ error);
				res.type("text/json");
				rdata.rep = 'error';
				res.send(rdata);
				return;
			}
			if(stderr){
				console.log('stdout: ${stderr}');
				res.type("text/json");
				rdata.rep = 'error';
				res.send(rdata);
				return;
			}
			console.log('stdout: ${stdout}'+stdout);
			res.type("text/json");
			res.send(rdata);

		});
	}
});
router.get('/setTime', function(req, res, next) {
    //res.render('detail', {data : 'index testData list ejsk'});
	var rTime = req.param("time");
	var today = new Date(rTime);
	//exec(`date -s "${dateFormat(dateTime, 'mm/dd/yyyy HH:MM:ss')}" --utc`);
	var command = "sudo timedatectl set-time '";
	command += today.getUTCFullYear();
	command +='-'; 
	command += today.getUTCMonth()+1;
	command +='-'; 
	command += today.getUTCDate();
	command +=' '; 
	command += today.getUTCHours();
	command +=':'; 
	command += today.getUTCMinutes();
	command +=':'; 
	command += today.getUTCSeconds();
	command +=" KST'";//utc 
	console.log(rTime);
	console.log(today);
	console.log(command);
	exec(command,(error,stdout,stderr) => {
		if(error){
			console.log('stdout: ${error}'+ error);
			return;
		}
		if(stderr){
			console.log('stdout: ${stderr}');
			return;
		}
		console.log('stdout: ${stdout}'+stdout);
	});
	//DateTimeControl.setDateTime(new Date(rTime));
	//DateTimeControl.setDateTime(new Date('1/1/2020 10:30:30'));
					
    res.type("text/json");
    res.send(UpsData);

});
router.get('/jsonData', function(req, res, next) {
    //res.type("application/json");
    //res.send(JSON.stringify(items));
	if(isModbusReadOK==false)
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
