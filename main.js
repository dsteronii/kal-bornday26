import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.179/build/three.module.js';
// cdn = content delivery network
//jsdeliver.net hosts opensource js stuff so i think this will work if i send you the package... it should work. i hope. bc it works on my local pc but i think as long as the package is here and its booting from opensource, it should work, no? 
// im not sure if this works offline though
// const = constant bc ure constantly on my mind ahah bowchikabowow
// i hope comments dont bloat this. 
//hi baby! im sure youre gonna wanna look into the javascript file to see how this works so im putting little notes here too

// SCENE
const scene = new THREE.Scene();


// CAM
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.z = 3;

// today i learned that this renderer thingy is for 3d stuff. i had to google "how to make 3d things in javascript" LOLOLOLOL
// RENDERER
const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha:true,
});

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

document.body.appendChild(renderer.domElement);


// Globe geometry
const geometry = new THREE.SphereGeometry(
    1.5,
    64,
    32
);


// WIREFRAME...

//DEAR FUTURE D IF YUOU WANT TO PUT THE WIREFRAME BACK JUST PUT wireframe:true,
const material = new THREE.MeshBasicMaterial({
    color: 0x094504,
    transparent: true,
    opacity: 0.7,
});


// da WORRRRRLD baby baby youre my sun and mooooon
const globe = new THREE.Mesh(
    geometry,
    material
);

scene.add(globe);
const loader = new THREE.FileLoader();
// a loader... loads things. i think. probably
loader.load(
    "countries.json",
    function(data) {

        const countries = JSON.parse(data);

        countries.features.forEach(country => {

            const geometry = country.geometry;
// i found out if you change this to multipolygon it doesnt work for shit HALF THE WORLD DISAPPEARS?!?!?! so dont use multipolygon 
            if (geometry.type === "Polygon") {
                drawCountry(geometry.coordinates);
            }

            if (geometry.type === "MultiPolygon") {
                geometry.coordinates.forEach(
                    polygon => drawCountry(polygon)
                );
            }

        });

    }
);
const glowGeometry = new THREE.SphereGeometry(
    1.51,
    64,
    64
);
// i just use 1.51 because that seems to be a nice size!
const glowMaterial = new THREE.MeshBasicMaterial({
    color: 0x0c6505,
    transparent: true,
    opacity: 0.067,
});

const glow = new THREE.Mesh(
    glowGeometry,
    glowMaterial
);

scene.add(glow);


// i like to move it move it
let dragging = false;
let previousX = 0;
let previousY = 0;

// THIS IS FOR THE THING SO WHEN U PINDOT IT IKOT KUHA MO BA
window.addEventListener("mousedown", (event) => {

    dragging = true;

    previousX = event.clientX;
    previousY = event.clientY;

});

// PHONE VER PLS DONT BREAK
window.addEventListener("touchstart", (event) => {

    dragging = true;

    previousX = event.touches[0].clientX;
    previousY = event.touches[0].clientY;

});
//release release release
window.addEventListener("mouseup", () => {
    dragging = false;
});

// PHONE: release
window.addEventListener("touchend", () => {

    dragging = false;

});
//moving while holding mouse edition

window.addEventListener("mousemove", (event) => {

    if (!dragging) return;

    let deltaX = event.clientX - previousX;
    let deltaY = event.clientY - previousY;

    globe.rotation.y += deltaX * 0.005;

    previousX = event.clientX;
    previousY = event.clientY;

});


// PHONE: move while touching
window.addEventListener("touchmove", (event) => {

    if (!dragging) return;

    let deltaX = event.touches[0].clientX - previousX;
    let deltaY = event.touches[0].clientY - previousY;

    globe.rotation.y += deltaX * 0.01;
    
    previousX = event.touches[0].clientX;
    previousY = event.touches[0].clientY;

});
// id like to make myself belieeeeve that planet earth turns sllwlyyyyy id like to say that idrather stay wakek when im asleep
// cuz everything is better aas it seems. is that the lyrics. im so sslepy 

function animate() {

    requestAnimationFrame(animate);

    if (!dragging) {
        globe.rotation.y += 0.002;
        glow.rotation.y += 0.002;
    }

    renderer.render(
        scene,
        camera
    );
}


animate();


// boom. resizable. not as sizable as that dih tho
window.addEventListener("resize", () => {

    camera.aspect =
        window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

});
//this sis to make the countriees. 
function drawCountry(coordinates) {

    const points = [];

    coordinates[0].forEach(point => {

        const longitude = point[0];
        const latitude = point[1];

       const phi = (90 - latitude) * Math.PI / 180;
const theta = (longitude + 180) * Math.PI / 180;

const radius = 1.51;

const x = radius * Math.sin(phi) * Math.cos(theta);
const y = radius * Math.cos(phi);
const z = radius * Math.sin(phi) * Math.sin(theta);

        points.push(
            new THREE.Vector3(x, y, z)
        );

    });


    const geometry =
        new THREE.BufferGeometry()
        .setFromPoints(points);


    const material =
        new THREE.LineBasicMaterial({
            color: 0x00bb44
        });


    const line =
        new THREE.Line(
            geometry,
            material
        );


    globe.add(line);
}

//GLOBE GRID TIME !!!!!! i sure hope i dont fuck up the math gagina!
function createLatitude(radius, latitude) {
    const points = [];

    const phi = THREE.MathUtils.degToRad(latitude);

    for (let k = 0; k<= 128; k++) {
        
        const theta = (k/128) * 2 * Math.PI;

        const x = radius * Math.cos(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi);
        const z = radius * Math.cos(phi) * Math.sin(theta);

        points.push(new THREE.Vector3(x, y, z));
    }
      const geometry = new THREE.BufferGeometry().setFromPoints(points);

    const material = new THREE.LineBasicMaterial({
        color: 0x0c6505,
        transparent: true,
        opacity: 0.7,
    });

    const line = new THREE.Line(geometry, material);

    globe.add(line);
}


function createLongitude(radius, longitude) {
    const points = [];

    const theta = THREE.MathUtils.degToRad(longitude);

    for (let k = 0; k <= 128; k++) {
        const phi = (k / 128) * Math.PI;

        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.cos(phi);
        const z = radius * Math.sin(phi) * Math.sin(theta);

        points.push(new THREE.Vector3(x, y, z));
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    const material = new THREE.LineBasicMaterial({
        color: 0x0c6505,
        transparent: true,
        opacity: 0.7,
    });

    const line = new THREE.Line(geometry, material);

    globe.add(line);
}
// these fucvkadss latitude longitiude lines mad em ecrahs out

for (let lat = -75; lat <= 75; lat += 15) {
    createLatitude(1.51, lat);
}

for (let lon = 0; lon < 360; lon += 15) {
    createLongitude(1.51, lon);
}

// positioning that thang

globe.position.y = -0.2;
glow.position.y = -0.2;
