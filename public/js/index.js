var reflashTime=500;
var isConnectionButtonPressed;
var Volpjs,Amppjs,Powpjs,AcDcVolpjs,AcDcAmppjs;
var module_index=0;
//const btnSave=document.querySelector('.button1');

var requestURL="./jsonData";
var request = new XMLHttpRequest();
//var superHeroes ;
//btnSave.addEventListener('click',()=>{
//	console.log('btn click');
//});
function btnSave(){
	console.log('btn click');
	window.open("ftp://"+location.hostname,'file down load');
}

function btnDelete()
{
    if( confirm("전체 로그를 삭제 합니다 \r\n\r\n실행 하시겠습니까? " )	)
	{
		request.open('GET', "./command?command=delete");
		request.responseType = 'json';
		request.send();
	}
}
function btnSetTime(){
	console.log('btn click');
	let nowTime = new Date();
	alert("Set Time"+ nowTime);

	request.open('GET', "./setTime?time="+nowTime);

	request.responseType = 'json';
	request.send();
	//window.open("ftp://"+location.hostname,'file down load');
}
/*
function showDetail(){
	console.log('btn click');
	//window.open("http://"+location.host+"/detail",'detail');
	window.location.href="http://"+location.host+"/detail";
}
*/
function requestJSONData(){
	request.open('GET', requestURL);
	request.responseType = 'json';
	request.send();
}
var rdata;
request.onload = function(){
	//console.log("onLoad="+request.response);
	rdata = request.response;	
	if(rdata.rep != null)
	{
		console.log("rdata = " + rdata.rep);
		if(rdata.rep == 'error') alert("파일이 없거나 에러가 발생했습니다");
		if(rdata.rep == 'deleted') alert("삭제 했습니다.");
		return;
	}

	UpsData= request.response;
	if(UpsData == null) return;
	setDatatoIndex();
	//setProcessingInstance();
	if(isConnectionButtonPressed)
		setTimeout(randomFillSampleData,reflashTime);
};

function randomFillSampleData(){
	requestJSONData();
	/*
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
	setDatatoIndex();
	setProcessingInstance();
	if(isConnectionButtonPressed)
		setTimeout(randomFillSampleData,reflashTime);
	*/	
}

function setDatatoIndex(){
	var array=['module_1','module_2','module_3','module_4','module_5','module_6','dcac'];
	var array1=['module_11','module_22','module_33','module_44','module_55','module_66','dcac_1'];
	var array_lbl=['Module1','Module2','Module3','Module4','Module5','Module6','lbl_dcac'];
	var arrayIndex=0;
	var ctl_lbl;
	var ctl_ups;
	array.forEach(element=>{
		ctl_ups=UpsData[element];
		
		ctl_lbl_vol=document.getElementById(array[arrayIndex]+"_Vol");
		ctl_lbl_amp=document.getElementById(array[arrayIndex]+"_amp");
		ctl_lbl_pow=document.getElementById(array[arrayIndex]+"_pow");

		ctl_lbl_vol_1=document.getElementById(array1[arrayIndex]+"_Vol");
		ctl_lbl_amp_1=document.getElementById(array1[arrayIndex]+"_amp");
		ctl_lbl_pow_1=document.getElementById(array1[arrayIndex]+"_pow");


		ctl_lbl_vol.innerHTML= ctl_ups.vol.toFixed(1)+"[V]";
		ctl_lbl_amp.innerHTML= ctl_ups.amp.toFixed(1)+"[A]";
		ctl_lbl_pow.innerHTML= ctl_ups.power.toFixed(1)+"[W]";
		ctl_lbl_vol_1.innerHTML= ctl_ups.ovol.toFixed(1)+"[V]";
		ctl_lbl_amp_1.innerHTML= ctl_ups.oamp.toFixed(1)+"[A]";
		ctl_lbl_pow_1.innerHTML= ctl_ups.opower.toFixed(1)+"[W]";
		arrayIndex++;
	});
}
function onBodyLoadIndexEvent(){
	
	randomFillSampleData();
	//document.getElementById('refreshTime').innerHTML="Div : "+reflashTime/1000+ " sec";
	isConnectionButtonPressed=false;
	module_index=0;
	requestJSONData();
}
/*
function SelectChange()
{
	var sel = (document.getElementById('option'));
	document.getElementById('sellblId').innerHTML=sel.options[sel.selectedIndex].text;
}
*/
function changeReflashTime(){
	if(reflashTime==500) reflashTime = 1000;
	else if(reflashTime==1000) reflashTime = 2000;
	else if(reflashTime==2000) reflashTime = 5000;
	else if(reflashTime==5000) reflashTime = 10000;
	else if(reflashTime==10000) reflashTime = 30000;
	else if(reflashTime==30000) reflashTime = 60000;
	else if(reflashTime==60000) reflashTime = 500;
	document.getElementById('refreshTime').innerHTML="Div : "+reflashTime/1000+ " sec";
}
function onClickConnection(){
	if(isConnectionButtonPressed){
		isConnectionButtonPressed=false;
		document.getElementById('btnConnection').innerHTML="Connect";
	}
	else{
		isConnectionButtonPressed=true;
		document.getElementById('btnConnection').innerHTML="Close";
	}
	randomFillSampleData();
}
function setProcessingInstance() {
	var jData=JSON.stringify( UpsData);
	Volpjs = Processing.getInstanceById("Volcanvasid");
	Volpjs.SetupData(jData);
	Volpjs.drawText(module_index,0,"Vol");//module 1~6, kind 0:vol, 1:amp 2: power

	Amppjs = Processing.getInstanceById("Ampcanvasid");
	Amppjs.SetupData(jData);
	Amppjs.drawText(module_index,1,"Amp");//module 1~6, kind 0:vol, 1:amp 2: power

	Powpjs = Processing.getInstanceById("Powcanvasid");
	Powpjs.SetupData(jData);
	Powpjs.drawText(module_index,2,"Pow");//module 1~6, kind 0:vol, 1:amp 2: power

	AcDcVolpjs= Processing.getInstanceById("AcDcVolcanvasid");
	AcDcVolpjs.SetupData(jData);
	AcDcVolpjs.drawText(module_index,3,"AC/DC[V]");//module 1~6, kind 0:vol, 1:amp 2: power

	AcDcAmppjs= Processing.getInstanceById("AcDcAmpcanvasid");
	AcDcAmppjs.SetupData(jData);
	AcDcAmppjs.drawText(module_index,3,"AC/DC[A]");//module 1~6, kind 0:vol, 1:amp 2: power
	//AcDcAmppjs= Processing.getInstanceById("AcDcAmpcanvasid");
	//AcDcAmppjs.drawText(module_index,4,"AC/DC[A]");//module 1~6, kind 0:vol, 1:amp 2: power
}

function changeModule(index){
	module_index=index;
	//Volpjs.drawText(module_index,0,"Vol");//module 1~6, kind 0:vol, 1:amp 2: power
	//Amppjs.drawText(module_index,0,"Amp");//module 1~6, kind 0:vol, 1:amp 2: power
	//Powpjs.drawText(module_index,0,"Pow");//module 1~6, kind 0:vol, 1:amp 2: power
}
