var reflashTime=500;
var isConnectionButtonPressed;
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

	setDatatoIndex();
	if(isConnectionButtonPressed)
		setTimeout(randomFillSampleData,reflashTime);
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