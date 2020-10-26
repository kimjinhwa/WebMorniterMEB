var reflashTime=500;
var isConnectionButtonPressed;
var Volpjs,Amppjs,Powpjs,AcDcVolpjs,AcDcAmppjs;
var module_index=0;

var requestURL="./jsonData";
var request = new XMLHttpRequest();
//var superHeroes ;
function requestJSONData(){
	request.open('GET', requestURL);
	request.responseType = 'json';
	request.send();
}
request.onload = function(){
	UpsData= request.response;
	setDatatoIndex();
	setProcessingInstance();
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
	(document.getElementById('lbl_Module1')).innerHTML=UpsData.module_1.vol.toFixed(1)+"[V] "+
	  	UpsData.module_1.amp.toFixed(1)+"[A] " +
	  	(UpsData.module_1.power/1000).toFixed(1)+"[KW]";
	(document.getElementById('lbl_Module2')).innerHTML=UpsData.module_2.vol.toFixed(1)+"[V] "+
	  	UpsData.module_2.amp.toFixed(1)+"[A] " +
	  	(UpsData.module_1.power/1000).toFixed(1)+"[KW]";
	(document.getElementById('lbl_Module3')).innerHTML=UpsData.module_3.vol.toFixed(1)+"[V] "+
	  	UpsData.module_3.amp.toFixed(1)+"[A] " +
	  	(UpsData.module_1.power/1000).toFixed(1)+"[KW]";
	(document.getElementById('lbl_Module4')).innerHTML=UpsData.module_4.vol.toFixed(1)+"[V] "+
	  	UpsData.module_4.amp.toFixed(1)+"[A] " +
	  	(UpsData.module_1.power/1000).toFixed(1)+"[KW]";
	(document.getElementById('lbl_Module5')).innerHTML=UpsData.module_1.vol.toFixed(1)+"[V] "+
	  	UpsData.module_5.amp.toFixed(1)+"[A] " +
	  	(UpsData.module_1.power/1000).toFixed(1)+"[KW]";
	(document.getElementById('lbl_Module6')).innerHTML=UpsData.module_6.vol.toFixed(1)+"[V] "+
	  	UpsData.module_6.amp.toFixed(1)+"[A] " +
		  (UpsData.module_1.power/1000).toFixed(1)+"[KW]";

	(document.getElementById('lbl_acdc')).innerHTML=UpsData.dcac.vol.toFixed(1)+"[V] "+
	  	UpsData.dcac.amp.toFixed(1)+"[A] " +
		  (UpsData.module_1.power/1000).toFixed(1)+"[KW]";
}

function onBodyLoadIndexEvent(){
	
	randomFillSampleData();
	document.getElementById('refreshTime').innerHTML="Div : "+reflashTime/1000+ " sec";
	isConnectionButtonPressed=false;
	module_index=0;
	requestJSONData();
}
function SelectChange()
{
	var sel = (document.getElementById('option'));
	document.getElementById('sellblId').innerHTML=sel.options[sel.selectedIndex].text;
}
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
	Volpjs.drawText(module_index,0,"Vol");//module 1~6, kind 0:vol, 1:amp 2: power
	Amppjs.drawText(module_index,0,"Amp");//module 1~6, kind 0:vol, 1:amp 2: power
	Powpjs.drawText(module_index,0,"Pow");//module 1~6, kind 0:vol, 1:amp 2: power
}