//MUSE DATA
let muse_tabelle;
let eeg1, eeg2, eeg3, eeg4, alpha1, alpha2, alpha3, alpha4, beta1, beta2, beta3, beta4, delta1, delta2, delta3, delta4, theta1, theta2, theta3, theta4, gamma1, gamma2, gamma3, gamma4, elements;
let mapEeg1, mapEeg2, mapEeg3, mapEeg4, mapBeta;
let r,ix,y;

let x; //FRAMEZAEHLER
let lastSum; // SUMME LETZTER EEG-WERTE

// AGENT INFO
let i_am_cyan;
let agent_magenta;
let agent_cyan;
let agent_color;
let agent_size;

// lerp color
let col_magenta1;
let col_magenta2;
let col_cyan;
let col_cyan1;
let col_cyan2;
let col_magenta;
let blink;
let amp_speed;
let color_amp;
let max_maxD;

function preload() {
    
    
    muse_tabelle = loadTable(
    'muse_data_katja.csv',
    'csv',
    'header');
    
}

function setup() {

  createCanvas(windowWidth, windowHeight);
  background(26, 26, 26);
  import_csv();
  x=0;
  
  blink=true;
  i_am_cyan=true;
  agent_magenta = new Agent(0, !i_am_cyan);
  agent_cyan = new Agent(180, i_am_cyan);
  agent_size = windowWidth / 50;
    
    col_magenta1 = color(255, 0, 221,80);
    col_magenta2 = color(200, 43, 240,40);

    
    col_cyan1=color(0, 255, 255,80);
    col_cyan2=color(75, 229, 250,40);
    amp_speed=0.1;
    color_amp=0.01;
    max_maxD=height/2;
}


function draw() {
  //COUNTER
  x = x + 1;

  //HINTERGRUND
  noStroke();
  fill(0, 0);
  rect(0, 0, windowWidth, windowHeight);

    
  // Werte aus der Tabelle auf passende Größen mappen
  if (int(eeg1[x]) <= 1500) { // mit der if-Abfrage werden die Ausreißer ausgefiltert
    mapEeg1 = map(float(eeg1[x]), 500, 1000, 0, 1000);

  }
  if (int(eeg2[x]) <= 1500) {
    mapEeg2 = map(float(eeg2[x]), 500, 1000, 0, 1000);
  }
  if (int(eeg3[x]) <= 1500) {
    mapEeg3 = map(float(eeg3[x]), 500, 1000, 100, 1000);
  }
  if (int(eeg4[x]) <= 1500) {
    mapEeg4 = map(float(eeg4[x]), 500, 1000, 100, 1000);
  }
  mapBeta = map(float(beta1[x]), 0, 1, 100, 800);

  //FORMEN ZEICHNEN
  agent_cyan.rumkreisen();
  agent_cyan.aktivePos();
  agent_magenta.rumkreisen();
  agent_magenta.aktivePos();

  // Geblinzelt?
    console.log("Blink " + elements[x]);
    
    if (elements[x]!= null){
        if (elements[x] == "/muse/elements/blink") {
        blink = !blink;
  }
        
    }



  // AM ENDE DER CSV-TABELLE AUFHÖREN
  if (x > 24000) {
    reset();
  }
}

// SKETCH ZURÜCKSETZEN
function reset() {
  background(20, 20, 20);
  x = 0;
  agent_cyan.anfangswinkel = 180;
  agent_magenta.anfangswinkel = 0;
}

function keyPressed() {

  if (key == 'b') {
    blink = !blink;
  }
}


function import_csv() {

eeg1 = muse_tabelle.getColumn('RAW_TP9');
  eeg2 = muse_tabelle.getColumn('RAW_AF7');
  eeg3 = muse_tabelle.getColumn('RAW_AF8');
  eeg4 = muse_tabelle.getColumn('RAW_TP10');

 
  alpha1 = muse_tabelle.getColumn('Alpha_TP9');
  alpha2 = muse_tabelle.getColumn('Alpha_AF7');
  alpha3 = muse_tabelle.getColumn('Alpha_AF8');
  alpha4 = muse_tabelle.getColumn('Alpha_TP10');

  beta1 = muse_tabelle.getColumn('Beta_TP9');
  beta2 = muse_tabelle.getColumn('Beta_AF7');
  beta3 = muse_tabelle.getColumn('Beta_AF8');
  beta4 = muse_tabelle.getColumn('Beta_TP10');

  delta1 = muse_tabelle.getColumn('Delta_TP9');
  delta2 = muse_tabelle.getColumn('Delta_AF7');
  delta3 = muse_tabelle.getColumn('Delta_AF8');
  delta4 = muse_tabelle.getColumn('Delta_TP10');

  theta1 = muse_tabelle.getColumn('Theta_TP9');
  theta2 = muse_tabelle.getColumn('Theta_AF7');
  theta3 = muse_tabelle.getColumn('Theta_AF8');
  theta4 = muse_tabelle.getColumn('Theta_TP10');


  gamma1 = muse_tabelle.getColumn('Gamma_TP9');
  gamma2 = muse_tabelle.getColumn('Gamma_AF7');
  gamma3 = muse_tabelle.getColumn('Gamma_AF8');
  gamma4 = muse_tabelle.getColumn('Gamma_TP10');

  elements = muse_tabelle.getColumn('Elements');
  

}



class Agent {

  constructor(anfWinkel, agent) {

    this.xpos = 0;
    this.ypos = 0;
    this.anfangswinkel = anfWinkel;
    this.winkel = 0;
    this.maxD = windowWidth / 6;
    this.d = windowWidth / 6;
    

    this.whichAgent = agent;
    this.x_noise = 0;
    this.y_noise = 0;
  }


  rumkreisen() {

    this.xpos = ((this.d + this.x_noise) * cos(radians(this.anfangswinkel + this.winkel)) + windowWidth / 2);
    this.ypos = ((this.d + this.y_noise) * sin(radians(this.anfangswinkel + this.winkel)) + windowHeight / 2);
  }

  aktivePos() {
      
     
   
        // Farbe berechnen
      col_magenta= lerpColor(col_magenta1,col_magenta2, color_amp);
      col_cyan= lerpColor(col_cyan1,col_cyan2, color_amp);
      
      color_amp = color_amp+amp_speed;
      
      
  
      if(color_amp>0.95){
         amp_speed= -0.01;
         console.log(color_amp);
     }
  
    if(color_amp<=0){
     amp_speed=0.01;
     }
      
      
      
    // Während des Sketches wächst der Radius der Laufbahn  
    if(this.maxD<max_maxD) {
        this.maxD=this.maxD+0.02;
    }
   
    print(this.whichAgent);
    // AGENT GREY
    if (this.whichAgent) {

      this.winkel = this.winkel + 0.35;

      if (blink) {
    col_magenta1 = color(255, 0, 221,10);
    col_magenta2 = color(200, 43, 240,30);

    
  

        if (this.d >= 1) {
          this.d = this.d - 1;

          this.x_noise = noise(frameCount * 0.007) * 100;
          this.y_noise = noise(1 + frameCount * 0.007) * 100;
        } else {
          this.d = 0;
          this.x_noise = noise(1 + frameCount * 0.007) * 20;
          this.y_noise = noise(1 + frameCount * 0.007) * 20;
        }
      } else {
          
          col_magenta1 = color(255, 0, 221,80);
    col_magenta2 = color(200, 43, 240,40);

        if (this.d <= this.maxD) {
          this.d = this.d + 1;
        } else {
          this.d = this.maxD;
        }
      }
    }

    //// AGENT GREEN
    if (!this.whichAgent) {

      this.winkel = this.winkel + 0.35;

      if (!blink) {
          
    col_cyan1=color(0, 255, 255,30);
    col_cyan2=color(75, 229, 250,10);

        if (this.d >= 1) {
          this.d = this.d - 1;
          this.x_noise = noise(frameCount * 0.007) * 100;
          this.y_noise = noise(1 + frameCount * 0.007) * 100;
        } else {
          this.d = 0;
          this.x_noise = noise(1 + frameCount * 0.007) * 20;
          this.y_noise = noise(1 + frameCount * 0.007) * 20;

        }
      } else {
          
           col_cyan1=color(0, 255, 255,80);
    col_cyan2=color(75, 229, 250,40);

        if (this.d <= this.maxD) {
          this.d = this.d + 1;
        } else {
          this.d = this.maxD;
        }
      }
    }



    if (!this.whichAgent) {
   
      agent_color = col_cyan;

      //agent_color = color(0,228,232,100);

      push();
      translate(this.xpos, this.ypos);
      stroke(agent_color, 20);
      strokeWeight(0.2);
      noFill();
      beginShape();

      
       r = map(int(mapEeg1), 50, 100, 0, agent_size) * noise(2 + frameCount * 0.007) * 1;
       ix = map(r * cos(radians(360 / 8) * 1), -1, 1, 0, 2);
       y = map(r * sin(radians(360 / 8) * 1), -1, 1, 0, 2);
      vertex(ix, y);

      r = map(int(mapBeta), 0, 100, 0, agent_size) * noise(2 + frameCount * 0.007) * 1;
      ix = map(r * cos(radians(360 / 8) * 2), -1, 1, 0, 2);
      y = map(r * sin(radians(360 / 8) * 2), -1, 1, 0, 2);
      vertex(ix, y);

      r = map(int(mapEeg2), 50, 100, 0, agent_size) * noise(4 + frameCount * 0.007) * 1;
      ix = map(r * cos(radians(360 / 8) * 3), -1, 1, 0, 2);
      y = map(r * sin(radians(360 / 8) * 3), -1, 1, 0, 2);
      vertex(ix, y);

      r = map(int(mapBeta), 50, 100, 0, agent_size) * noise(5 + frameCount * 0.007) * 1;
      ix = map(r * cos(radians(360 / 8) * 4), -1, 1, 0, 2);
      y = map(r * sin(radians(360 / 8) * 4), -1, 1, 0, 2);
      vertex(ix, y);

      r = map(int(mapEeg3), 50, 100, 0, agent_size) * noise(2 + frameCount * 0.007) * 1;
      ix = map(r * cos(radians(360 / 8) * 5), -1, 1, 0, 2);
      y = map(r * sin(radians(360 / 8) * 5), -1, 1, 0, 2);
      vertex(ix, y);

      r = map(int(mapBeta), 0, 100, 0, agent_size) * noise(3 + frameCount * 0.007) * 1;
      ix = map(r * cos(radians(360 / 8) * 6), -1, 1, 0, 2);
      y = map(r * sin(radians(360 / 8) * 6), -1, 1, 0, 2);
      vertex(ix, y);


      r = map(int(mapEeg4), 0, 100, 0, agent_size) * noise(2 + frameCount * 0.006) * 1;
      ix = map(r * cos(radians(360 / 8) * 7), -1, 1, 0, 2);
      y = map(r * sin(radians(360 / 8) * 7), -1, 1, 0, 2);
      vertex(ix, y);

      r = map(int(mapBeta), 0, 100, 0, agent_size) * noise(+frameCount * 0.007) * 1;
      ix = map(r * cos(radians(360 / 8) * 8), -1, 1, 0, 2);
      y = map(r * sin(radians(360 / 8) * 8), -1, 1, 0, 2);
      vertex(ix, y);


      endShape(CLOSE);

      pop();
    }

    if (this.whichAgent) {
        
      agent_color = col_magenta; //magenta
      //agent_color = color(255, 0, 242,100); //magenta

      push();
      translate(this.xpos, this.ypos);

      stroke(agent_color);
      strokeWeight(0.3);
      noFill();
      beginShape();
        

       r = map(int(mapEeg1), 50, 100, 0, agent_size) * noise(2 + frameCount * 0.007) * 1;
       ix = map(r * cos(radians(360 / 8) * 1), -1, 1, 0, 2);
       y = map(r * sin(radians(360 / 8) * 1), -1, 1, 0, 2);
      curveVertex(ix, y);

      r = map(int(mapBeta), 0, 100, 0, agent_size) * noise(2 + frameCount * 0.007) * 1;
      ix = map(r * cos(radians(360 / 8) * 2), -1, 1, 0, 2);
      y = map(r * sin(radians(360 / 8) * 2), -1, 1, 0, 2);
      curveVertex(ix, y);

      r = map(int(mapEeg2), 50, 100, 0, agent_size) * noise(3 + frameCount * 0.007) * 1;
      ix = map(r * cos(radians(360 / 8) * 3), -1, 1, 0, 2);
      y = map(r * sin(radians(360 / 8) * 3), -1, 1, 0, 2);
      curveVertex(ix, y);

      r = map(int(mapBeta), 50, 100, 0, agent_size) * noise(5 + frameCount * 0.017) * 1;
      ix = map(r * cos(radians(360 / 8) * 4), -1, 1, 0, 2);
      y = map(r * sin(radians(360 / 8) * 4), -1, 1, 0, 2);
      curveVertex(ix, y);

      r = map(int(mapEeg3), 50, 100, 0, agent_size) * noise(5 + frameCount * 0.005) * 1;
      ix = map(r * cos(radians(360 / 8) * 5), -1, 1, 0, 2);
      y = map(r * sin(radians(360 / 8) * 5), -1, 1, 0, 2);
      curveVertex(ix, y);

      r = map(int(mapBeta), 0, 100, 0, agent_size) * noise(3 + frameCount * 0.007) * 1;
      ix = map(r * cos(radians(360 / 8) * 6), -1, 1, 0, 2);
      y = map(r * sin(radians(360 / 8) * 6), -1, 1, 0, 2);
      curveVertex(ix, y);


      r = map(int(mapEeg4), 0, 100, 0, agent_size) * noise(3 + frameCount * 0.005) * 1;
      ix = map(r * cos(radians(360 / 8) * 7), -1, 1, 0, 2);
      y = map(r * sin(radians(360 / 8) * 7), -1, 1, 0, 2);
      curveVertex(ix, y);

      r = map(int(mapBeta), 0, 100, 0, agent_size) * noise(+frameCount * 0.007) * 1;
      ix = map(r * cos(radians(360 / 8) * 8), -1, 1, 0, 2);
      y = map(r * sin(radians(360 / 8) * 8), -1, 1, 0, 2);
      curveVertex(ix, y);
        
     

      endShape(CLOSE);
      fill(255);
      //ellipse(ix, y, 20, 20);
      pop();
    }
  }
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
    background(30, 30, 30);
}