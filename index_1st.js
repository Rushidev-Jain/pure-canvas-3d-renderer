//A 3D-Render without Dlls/libs like OpenGL. 
//Concept:
//  observer is at origin looking forward into the z axis. 
//  at z = 0.                  at z = 1, perpendicularly,
//  a screen of predefined width & height is rendered in
//  x , y plane with center of the plane where Z-axis is 
//  passing is origin of screen.
//  by similar triangles: 
//      X_screen_plane = X/Z
//      Y_screen_plane = y/Z.    (just plot at X/Z, Y/Z)
//
// Prerequesties:
//  -install node.js & it's path should be specified in the
//      systems Variables' PATH variable.
//  -if code Editor is VS-Code:
//  -then, use Extention "ritwickdey.LiveServer".
//  -then, press the "Go Live" button in bottom right. 

//Author:
//  Rushidev Jain

const scene = document.getElementById("scene");
console.log(scene);

scene.width = 1246
scene.height = 648
const ctx = scene.getContext("2d")
console.log(ctx)

const BACKGROUND = "#101010"
const FOREGROUND = "#50FF50"

//center_x = 673  
//center_y = 374     
const s = 15;
const e = 2.718281828459045
    

function clear() {          //flushing for FPS & animation
    ctx.fillStyle = BACKGROUND
    ctx.fillRect(0,0,scene.width, scene.height)
}

function point({x,y},{x: S_x, y:S_y, z:S_z}) {
    // 1st arg* is of screen co-ordinate and 2nd is for 3d scene
    ctx.fillStyle = FOREGROUND;
    const dist = Math.sqrt(S_x**2 + S_y**2 + S_z**2);
    const s= 40 / dist;
    ctx.fillRect(x - s/2,y +s/2,s,s);
}

function screen(p) {
    //-1.. 1 => 0.. 2 => 0.. w/h
    // okay theres a prob, our system has a domain & range
    // of [-1,1] & [-1,1] respectivly. but in html origin 
    // is by default at top left corner with positive y axis
    // being downwards.    we will shift the html's orign 
    // to our origin to wrap this..
    // p should be a object now two seprate component obj
    // 
    return {
        x: ((p.x + 1)/2)*scene.width,     // on doing + 1 
        // domian shifted so a /2 then *w. 
        y: (1 - (p.y + 1)/2)*scene.height,
        //GK: to shift funck upside on y, we add dx. 
        // for shift in x to right side, we substract dx. 
    }
}

function project({x,y,z}) {
    //x'=x/z & y'=y/z wala projection
    // x,y,z ==proj==> x',y' ==scrn==> point funck 
    // of rendering
    return {
        x: x/z,
        y: y/z,
    };
}

//# Dynamics 

let dz = 0;
let dy = 0;
let dx = 0;

//vel:
let V_z = 1;
let V_x = -1;

const FPS = 24;
const dt = 1/FPS;
//animation 

//Gravitaional pull in y: 
// Y = u_y* t + (1/2)*9.8*t**2
let U_y = 0;
let V_y = 0;
let g = 2;

// Collision with ground at y = -s/2. s: Size defined
// at function point. 
const ground_level = -1;

//lets do friction. we'll only include kinetic friction
//fric = mu * m * g  let the obj get a 10 N force constant
//at collision contineously i'll substract dz but this will
// make the program very specific to current scenario.
//      i should calculate the velocity vector in x & z
// component when it touches ground. and then substract
// both with a factor of friction (mu)


function frame() {
    dz += V_z*dt;
    V_y += -g*dt;
    dy += V_y*dt;

    const x = 0.5;
    const y = 0.5 + dy; //coefficent 20 for scale.
    const z = 0.1 + dz;

    if (y<ground_level) {       //Collision with ground 
        V_y += -2*V_y*0.9;  //coefficient of restitution
        V_x -= V_x*0.6;  //mu
        V_z -= V_z*0.6;  //mu

    };

    clear();
    point(screen(project({x,y,z})), {x, y, z}); 
    setTimeout(frame, 1000/FPS);
};
setTimeout(frame, 1000/FPS);

//
// my recomendation:
//      Z >= 1   (point obj should be behind/on the screen)
//work Done !