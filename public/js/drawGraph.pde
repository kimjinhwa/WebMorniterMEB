ArrayList array_upsData;
var VUpsData ;
var drawMode=0; //0: vol 1: amp 2: power
float scale_x,scale_y;
int selectedModule;
String displayKind;
 String[] strModule={"module_1","module_2","module_3","module_4","module_5","module_6","dcac","dcac"};
folat[] py2Array;

void SetupData(String data)
{
	//JSONObject obj=new JSONObject (data);
	VUpsData =JSON.parse(data);
};
void setup() {
	size(350,120);
	scale_x=1/width;
	scale_y=height/500;// 500V ;
	py2Array=new float[height];
	for(int i = 0; i< width ; i++){
		py2Array[i] =0;
	}
//XYscope xy;
//xy = new XYscope(this);
	  noLoop();						// turn off animation, since we won't need it
	  stroke(#FFEE88);
	  //fill(#FFEE88);
	  //background(#000033);
	  text("",0,0);					// force Processing to load a font
	  textSize(24);					// set the font size to something big
	  background(0);
}
void draw() { 
	stroke (32);
	//line (width/2, 0, width/2, height);
	//fill(0,32,0,32);
	//rect(0,0,width,height);
	background(0);
	for (int i = 0; i < 11 ; i++){
		//line (0, i*75, width, i*75);
		line (i*75+25, 0, i*75+25, height);
	}
	stroke (255);
	//line (width/2, 0, width/2, height);
	line (0, height/2, width, height/2);
	stroke (0, 255, 0);
	//line (width/2, 0, width/2, height);
	text(strModule[selectedModule],width/2-textWidth("Module 1")/2,20);
  	text(displayKind, width-textWidth(displayKind)-10, 20);	// place the text centered on the drawing area
	if(drawMode==0)
		text("250", width-textWidth("250")-10, height/2+10);	// place the text centered on the drawing area
	if(drawMode==1)
		text("0", width-textWidth("0")-10, height/2+10);	// place the text centered on the drawing area
	if(drawMode==2)
		text("0", width-textWidth("0")-10, height/2+10);	// place the text centered on the drawing area
	for(int i = 0; i< width ; i++){
		//point(width/8 + radius+i,py2);
    	ellipse(i,py2Array[i],1,1);
	}
	//stroke (128,255,128);
}

void drawText(int module,int kind,String strText)
{
  //background(#000033);
  //float twidth = textWidth(t);			// get the width for the text
  //float twidth = textWidth(UpsData.module_2.vol);			// get the width for the text
  //text(t, (width-twidth)/2, height/2);	// place the text centered on the drawing area
	//strModule
	drawMode=kind;
	selectedModule=module;
	displayKind=strText;
  if(kind==0){ // voltage display 
	scale_x=1/width;
	scale_y=height/500;// 500V ;
	py2Array[0] = height - scale_y*VUpsData[strModule[module]].vol;
  }
  else if(kind==1){ // ampere display 
	scale_x=1/width;
	scale_y=height/10;// 100A ;
	py2Array[0] = height/2 - scale_y*VUpsData[strModule[module]].amp;
  }
  else if(kind==2){ // KW display 
	scale_x=1/width;
	scale_y=height/10;// 100A ;
	py2Array[0] = height/2 - scale_y*VUpsData[strModule[module]].power;
  }
  else if(kind==3){ // AcDc
	scale_x=1/width;
	scale_y=height/10;// 100A ;
	py2Array[0] = height - scale_y*VUpsData.dcac.ovol;
  }
  else if(kind==4){ // AcDc
	scale_x=1/width;
	scale_y=height/10;// 100A ;
	py2Array[0] = height/2 - scale_y*VUpsData.dcac.oamp;
  }
	dataShift();
 	//text(VUpsData.module_2.vol, (width-twidth)/2, height/2);	// place the text centered on the drawing area
  	redraw();
}
void dataShift(){
	for(int i = width ; i > 1 ; i--){
			py2Array[i-1] = py2Array[i-2];
		}
}
