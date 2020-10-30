
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
	setDatatoDetail();
	setTimeout(randomFillSampleData,2000);
	/*
	setDatatoIndex();
	setProcessingInstance();
	if(isConnectionButtonPressed)
		setTimeout(randomFillSampleData,reflashTime);
	*/
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
	setDatatoDetail();
	setTimeout(randomFillSampleData,2000);
*/
}
function setDatatoDetail(){
	(document.getElementById('lbl_vol_1')).innerHTML=(UpsData.module_1.vol.toFixed(1) +"V<BR>");
	(document.getElementById('lbl_vol_1')).innerHTML+=(UpsData.module_1.ovol.toFixed(1) +"V");
	(document.getElementById('lbl_vol_2')).innerHTML=(UpsData.module_2.vol.toFixed(1) +"V<BR>");
	(document.getElementById('lbl_vol_2')).innerHTML+=(UpsData.module_2.ovol.toFixed(1) +"V");
	(document.getElementById('lbl_vol_3')).innerHTML=(UpsData.module_3.vol.toFixed(1) +"V<BR>");
	(document.getElementById('lbl_vol_3')).innerHTML+=(UpsData.module_3.ovol.toFixed(1) +"V");
	(document.getElementById('lbl_vol_4')).innerHTML=(UpsData.module_4.vol.toFixed(1) +"V<BR>");
	(document.getElementById('lbl_vol_4')).innerHTML+=(UpsData.module_4.ovol.toFixed(1) +"V");
	(document.getElementById('lbl_vol_5')).innerHTML=(UpsData.module_5.vol.toFixed(1) +"V<BR>");
	(document.getElementById('lbl_vol_5')).innerHTML+=(UpsData.module_5.ovol.toFixed(1) +"V");
	(document.getElementById('lbl_vol_6')).innerHTML=(UpsData.module_6.vol.toFixed(1) +"V<BR>");
	(document.getElementById('lbl_vol_6')).innerHTML+=(UpsData.module_6.ovol.toFixed(1) +"V");

	(document.getElementById('lbl_amp_1')).innerHTML=(UpsData.module_1.amp.toFixed(1) +"A<BR>");
	(document.getElementById('lbl_amp_2')).innerHTML=(UpsData.module_2.amp.toFixed(1) +"A<BR>");
	(document.getElementById('lbl_amp_3')).innerHTML=(UpsData.module_3.amp.toFixed(1) +"A<BR>");
	(document.getElementById('lbl_amp_4')).innerHTML=(UpsData.module_4.amp.toFixed(1) +"A<BR>");
	(document.getElementById('lbl_amp_5')).innerHTML=(UpsData.module_5.amp.toFixed(1) +"A<BR>");
	(document.getElementById('lbl_amp_6')).innerHTML=(UpsData.module_6.amp.toFixed(1) +"A<BR>");

	(document.getElementById('lbl_amp_1')).innerHTML+=(UpsData.module_1.oamp.toFixed(1) +"A");
	(document.getElementById('lbl_amp_2')).innerHTML+=(UpsData.module_2.oamp.toFixed(1) +"A");
	(document.getElementById('lbl_amp_3')).innerHTML+=(UpsData.module_3.oamp.toFixed(1) +"A");
	(document.getElementById('lbl_amp_4')).innerHTML+=(UpsData.module_4.oamp.toFixed(1) +"A");
	(document.getElementById('lbl_amp_5')).innerHTML+=(UpsData.module_5.oamp.toFixed(1) +"A");
	(document.getElementById('lbl_amp_6')).innerHTML+=(UpsData.module_6.oamp.toFixed(1) +"A");

	(document.getElementById('lbl_pow_1')).innerHTML=(((UpsData.module_1.vol*UpsData.module_1.amp)/1000).toFixed(1)+"KW<BR>");
	(document.getElementById('lbl_pow_2')).innerHTML=(((UpsData.module_2.vol*UpsData.module_2.amp)/1000).toFixed(1)+"KW<BR>");
	(document.getElementById('lbl_pow_3')).innerHTML=(((UpsData.module_3.vol*UpsData.module_3.amp)/1000).toFixed(1)+"KW<BR>");
	(document.getElementById('lbl_pow_4')).innerHTML=(((UpsData.module_4.vol*UpsData.module_4.amp)/1000).toFixed(1)+"KW<BR>");
	(document.getElementById('lbl_pow_5')).innerHTML=(((UpsData.module_5.vol*UpsData.module_5.amp)/1000).toFixed(1)+"KW<BR>");
	(document.getElementById('lbl_pow_6')).innerHTML=(((UpsData.module_6.vol*UpsData.module_6.amp)/1000).toFixed(1)+"KW<BR>");

	(document.getElementById('lbl_pow_1')).innerHTML+=(((UpsData.module_1.ovol*UpsData.module_1.oamp)/1000).toFixed(1)+"KW");
	(document.getElementById('lbl_pow_2')).innerHTML+=(((UpsData.module_2.ovol*UpsData.module_2.oamp)/1000).toFixed(1)+"KW");
	(document.getElementById('lbl_pow_3')).innerHTML+=(((UpsData.module_3.ovol*UpsData.module_3.oamp)/1000).toFixed(1)+"KW");
	(document.getElementById('lbl_pow_4')).innerHTML+=(((UpsData.module_4.ovol*UpsData.module_4.oamp)/1000).toFixed(1)+"KW");
	(document.getElementById('lbl_pow_5')).innerHTML+=(((UpsData.module_5.ovol*UpsData.module_5.oamp)/1000).toFixed(1)+"KW");
	(document.getElementById('lbl_pow_6')).innerHTML+=(((UpsData.module_6.ovol*UpsData.module_6.oamp)/1000).toFixed(1)+"KW");

	(document.getElementById('lbl_dcac_vol')).innerHTML=UpsData.dcac.vol.toFixed(1);

	(document.getElementById('lbl_dcac_amp')).innerHTML=UpsData.dcac.amp.toFixed(1);

	(document.getElementById('lbl_dcac_power')).innerHTML=UpsData.dcac.power.toFixed(1);

	(document.getElementById('lbl_dcac_ovol')).innerHTML=UpsData.dcac.ovol.toFixed(1);
	(document.getElementById('lbl_dcac_oamp')).innerHTML=UpsData.dcac.oamp.toFixed(1);
	(document.getElementById('lbl_dcac_opower')).innerHTML=UpsData.dcac.opower.toFixed(1);

}
function onBodyLoadEvent(){
	setDatatoDetail();
	setTimeout(randomFillSampleData,2000);
}
