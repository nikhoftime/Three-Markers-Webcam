let qr1, qr2, qr3, qr4, qr5, qr6, qr7;
let counter = 0
let qr1Scanned = false,
    qr2Scanned = false;
    qr3Scanned = false;
    qr4Scanned = false;
    qr5Scanned = false;
    qr6Scanned = false;


let fireworks = [];
let qrSize = 228;


function preload() {
  qr1 = loadImage("qr_1.1.png");
  qr2 = loadImage("qr_2.2.png");
  qr3 = loadImage("qr_3.2.png");
  qr4 = loadImage("qr_4.2.png");
  qr5 = loadImage("qr_5.2.png");
  qr6 = loadImage("qr_7.2.png");
  qr7 = loadImage("qr_8.2.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background('#ffffff');
  imageMode(CENTER);
 
  //first row yo
  if (!qr1Scanned) image(qr1, width * 0.25, height * 0.23, qrSize, qrSize);
  
  if (!qr2Scanned) image(qr2, width * 0.50, height * 0.23, qrSize, qrSize);


  if (!qr3Scanned)  image(qr3, width * 0.75, height * 0.23, qrSize, qrSize);

  //second row yo
  if (!qr4Scanned) image(qr4, width * 0.25, height * 0.70, qrSize, qrSize);

  if (!qr5Scanned) image(qr5, width * 0.50, height * 0.70, qrSize, qrSize);

  if (!qr6Scanned) image(qr6, width * 0.75, height * 0.70, qrSize, qrSize); 
  
  if (qr1Scanned && qr2Scanned && qr3Scanned && qr4Scanned && qr5Scanned && qr6Scanned ) {
    image(qr7, width * 0.5, height * 0.5, qrSize, qrSize)
      
    push();
    textAlign(CENTER, CENTER);
    textSize(48);
    fill(0); 
    textFont('Alumni Sans SC')
    text("Well done! Scan the QR Code with your phone!", width / 2, height / 4);
    pop();
    
  }
  
  fireworks.forEach((f) => {
    f.update();
    f.show();
  });
}

function keyPressed() {
  switch (key) {
    case " ":
      document.querySelector("#qr-reader").classList.toggle("hide");
      break;
      case "z":
      qrSize--;
      break;
      case "x":
      qrSize++;
      break;
  }
}

function codeScanned(text) {
  switch (text) {
    case "https://www.ntu.edu.sg/":
      qr1Scanned = true;
      fireworks.push(new Firework());
      fireworks.at(-1).trigger(width * 0.25, height * 0.23);
      break;
      
    case "https://www.nus.edu.sg/":
      qr2Scanned = true;
      fireworks.push(new Firework());
      fireworks.at(-1).trigger(width * 0.50, height * 0.23);
      break;
      
    case "https://www.suss.edu.sg/":          
      qr3Scanned = true;
      fireworks.push(new Firework());
      fireworks.at(-1).trigger(width * 0.75, height * 0.23);
  break;

    case "https://www.sutd.edu.sg/":          
      qr4Scanned = true;
      fireworks.push(new Firework());
      fireworks.at(-1).trigger(width * 0.25, height * 0.70);
  break;

    case "https://www.smu.edu.sg/":          
      qr5Scanned = true;
      fireworks.push(new Firework());
      fireworks.at(-1).trigger(width * 0.50, height * 0.70);
  break;

    case "https://uas.edu.sg/": 
      qr6Scanned = true;
      fireworks.push(new Firework());
      fireworks.at(-1).trigger(width * 0.75, height * 0.70);
  break;
  }
}

// ---------------- Firework object ----------------
class Firework {
  constructor() {
    this.particles = [];
    this.done = true;
  }

  trigger(x, y) {
    this.particles = [];
    this.done = false;
    let hue = random(360);
    for (let i = 0; i < 80; i++) {
      let angle = random(TWO_PI);
      let speed = random(2, 6);
      let vx = cos(angle) * speed;
      let vy = sin(angle) * speed;
      this.particles.push(new Particle(x, y, vx, vy, hue));
    }
  }

  update() {
    if (this.done) return;
    for (let p of this.particles) {
      p.update();
    }
    this.particles = this.particles.filter((p) => !p.done);
    if (this.particles.length === 0) this.done = true;
  }

  show() {
    for (let p of this.particles) {
      p.show();
    }
  }
}

// ---------------- Particle object ----------------
class Particle {
  constructor(x, y, vx, vy, hue) {
    this.pos = createVector(x, y);
    this.vel = createVector(vx, vy);
    this.acc = createVector(0, 0.1); // gravity
    this.lifespan = 255;
    this.hue = hue;
    this.done = false;
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.lifespan -= 4;
    if (this.lifespan <= 0) this.done = true;
  }

  show() {
    colorMode(HSB);
    noStroke();
    fill(this.hue, 255, 255, this.lifespan);
    ellipse(this.pos.x, this.pos.y, 4);
  }
}
