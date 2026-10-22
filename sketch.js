// --- GLOBAL VARIABLES ---
let x, y, d, xDir, yDir, speed;
let r, g, b;
let angle, angleSpeed;

// Arrays required by prompt
let trail = [];
let satellites = [];

// CLASS required by prompt
class OrbitingSatellite {
  constructor(radius, orbitSpeed, size) {
    this.polarRadius = radius;
    this.orbitAngle = random(360);
    this.orbitSpeed = orbitSpeed;
    this.size = size;
  }

  // Uses POLAR COORDINATES (r * cos(a), r * sin(a)) - MFA requirement
  updateAndDisplay(cx, cy) {
    this.orbitAngle += this.orbitSpeed;
    
    // Polar to Cartesian conversion
    let px = cx + this.polarRadius * cos(this.orbitAngle);
    let py = cy + this.polarRadius * sin(this.orbitAngle);

    fill(255, 220, 0, 180);
    stroke(255);
    strokeWeight(1.5);
    circle(px, py, this.size);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);

  x = random(width);
  y = random(height);
  d = 20;

  xDir = random(-2, 2);
  yDir = random(-2, 2);
  speed = 10;

  angle = 0;
  angleSpeed = 5;

  r = 100;
  g = 200;
  b = 100;

  // Initialize objects into Array using Class
  for (let i = 0; i < 4; i++) {
    satellites.push(new OrbitingSatellite(60 + i * 25, 2 + i * 1.5, 12 - i * 2));
  }
}

function draw() {
  background(255, 60, 100, 20);

  colorInvert();

  x += xDir * speed;
  y += yDir * speed;

  keepInCanvas();

  angle += angleSpeed;
  let dynamicDiam = mapSin(angle, 10, 150);

  // Store position history in Array
  trail.push({ x: x, y: y, size: dynamicDiam * 0.3 });
  if (trail.length > 15) {
    trail.shift(); // keep array size managed
  }

  // Render trail using ARRAY iteration
  noStroke();
  for (let i = 0; i < trail.length; i++) {
    fill(r, g, b, (i / trail.length) * 100);
    circle(trail[i].x, trail[i].y, trail[i].size);
  }

  // NESTED LOOPS requirement (MFA) - Subtle background geometric grid pattern
  drawNestedGridPattern();

  // Primary shape rendering
  display(7, dynamicDiam, r, g, b);

  // Update orbiting satellites using CLASS + POLAR COORDINATES (MFA)
  for (let s of satellites) {
    s.updateAndDisplay(x, y);
  }
}

// Custom mapping helper function using sin wave
function mapSin(a, target1, target2) {
  let myMap = map(sin(a), -1, 1, target1, target2);
  return myMap;
}

// Keep shape within canvas boundaries and change color on bounce
function keepInCanvas() {
  if (x > width || x < 0) {
    randomColor();
    xDir = -xDir;
  }
  if (y > height || y < 0) {
    randomColor();
    yDir = -yDir;
  }
}

// Generate random color values
function randomColor() {
  r = random(0, 255);
  g = random(0, 255);
  b = random(0, 255);
}

// Interactive invert mode on click
function colorInvert() {
  if (mouseIsPressed) {
    background(0, 195, 155, 20);
    r = 255 - r;
    g = 255 - g;
    b = 255 - b;
  }
}

// Render nested primary concentric circles
function display(numShapes, diam, cr, cg, cb) {
  for (let i = numShapes; i > 0; i--) {
    let offSetX = mapSin(angle, -5, 5);
    let offSetY = mapSin(angle, -7, 7);
    fill(cr, cg, cb);
    stroke('yellow');
    strokeWeight(2);
    circle(x + offSetY * i, y + offSetX * i, diam * i);
  }
}

// MFA Requirement: NESTED LOOPS background motif
function drawNestedGridPattern() {
  stroke(255, 30);
  strokeWeight(0.5);
  noFill();
  let step = 100;
  for (let gx = 20; gx < width; gx += step) {
    for (let gy = 20; gy < height; gy += step) {
      rect(gx, gy, 15, 15);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}