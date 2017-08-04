// device check
console.log('sss');

var _detectClass = document.querySelector('html').className;
var _isMobile = _detectClass.indexOf("mobile") == -1 ? false : true;
var _isTablet = false;
if(!_isMobile){
    if(_detectClass.indexOf("tablet") == -1){
        _isTablet = false;
    }else{
        _isTablet = _detectClass.indexOf("ie") == -1 ? true : false;
    }
}else _isTablet = false;

console.log("this browser is -> " + _detectClass);


const noise = new SimplexNoise();

function init() {

    /* scene
    --------------------------------------*/
    let scene = new THREE.Scene();

    /* camera
    --------------------------------------*/
    let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 50;
    camera.lookAt(scene.position);
    scene.add(camera);

    /* renderer
    --------------------------------------*/
    let renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0x36D1C4));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;

    // /* Plane
    // --------------------------------------*/
    // let planeGeometry = new THREE.PlaneGeometry(60, 60, 20, 20);
    // let planeMaterial = new THREE.MeshLambertMaterial({
    //     color: 0xFFF2BE,
    //     side: THREE.DoubleSide
    // });
    // let plane = new THREE.Mesh(planeGeometry, planeMaterial);
    // plane.receiveShadow = true;
    // plane.rotation.x = -0.5 * Math.PI;
    // plane.position.x = 0;
    // plane.position.y = -15;
    // plane.position.z = 0;
    // scene.add(plane);

    /* Ball
    --------------------------------------*/
    let icosahedronGeometry = new THREE.IcosahedronGeometry(10, 4);
    let lambertMaterial = new THREE.MeshLambertMaterial({
        color: 0xF6318C,
        wireframe: false
    });
    let ball = new THREE.Mesh(icosahedronGeometry, lambertMaterial);
    ball.position.x = 0;
    ball.position.y = 0;
    ball.position.z = 0;
    ball.castShadow = true;
    scene.add(ball);

    /* AmbientLight
    --------------------------------------*/
    let ambientLight = new THREE.AmbientLight(0x999999); //0x999999
    scene.add(ambientLight);

    /* SpotLight
    --------------------------------------*/
    let spotLight = new THREE.SpotLight(0xaaaaaaa); //0xaaaaaaa
    spotLight.intensity = 0.8;
    spotLight.position.set(-10, 40, 20);
    spotLight.lookAt(ball);
    spotLight.castShadow = true;
    scene.add(spotLight);

    /* OrbitControls
    --------------------------------------*/
    // let orbitControls = new THREE.OrbitControls(camera);
    // orbitControls.autoRotate = false;

    /* datGUI
    --------------------------------------*/
    // let gui = new dat.GUI();
    // let guiControls = new function() {
    //     this.amp = 1;
    //     this.wireframe = false;
    // }
    // gui.add(guiControls, 'amp', 0, ball.geometry.parameters.radius - 1);
    // gui.add(guiControls, 'wireframe').onChange((e) => {
    //     ball.material.wireframe = e;
    // });

    document.getElementById('WebGL-output').appendChild(renderer.domElement);
    window.addEventListener('resize', onWindowResize, false);

    render();

    function render() {
        // makeRoughGround(plane);
        makeRoughBall(ball);
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function makeRoughBall(mesh) {
        mesh.geometry.vertices.forEach(function(vertex, i) {
            let offset = mesh.geometry.parameters.radius;
            // let amp = guiControls.amp;
            let amp = 2;
            let time = Date.now();
            vertex.normalize();
            let distance = offset + noise.noise3D(
                vertex.x + time * 0.0007,
                vertex.y + time * 0.0008,
                vertex.z + time * 0.0009
            ) * amp;
            vertex.multiplyScalar(distance);
        })
        mesh.geometry.verticesNeedUpdate = true;
        mesh.geometry.normalsNeedUpdate = true;
        mesh.geometry.computeVertexNormals();
        mesh.geometry.computeFaceNormals();
    }

    function makeRoughGround(mesh) {
        mesh.geometry.vertices.forEach(function(vertex, i) {
            let amp = 2;
            let time = Date.now();
            let distance = noise.noise2D(
                vertex.x + time * 0.0003,
                vertex.y + time * 0.0001
            ) * amp;
            vertex.z = distance;
        })
        mesh.geometry.verticesNeedUpdate = true;
        mesh.geometry.normalsNeedUpdate = true;
        mesh.geometry.computeVertexNormals();
        mesh.geometry.computeFaceNormals();
    }

}

console.log('webgl - init;');
window.onload = init;


