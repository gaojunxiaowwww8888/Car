var scene, camera, renderer,  control, container,w, h;
var raycaster;
var collmeshList = [];

//存放A开头
var Agroup = [];
var mesh = [];
var mouse = new THREE.Vector2();
var materialArray = [];
var spotLighttag = false, wgtag = true, wg = false;
var handclick = false, xzflag = true, kekstep = 0.005, dir, sphere1,sphere2, curve,curveq,curveq10,curvezx,line,moveSpere,curvefx;
var prevTime = performance.now();

function  init() {

    container = document.getElementById('container');
    w = container.clientWidth;  //window.innerWidth;
    h = container.clientHeight; //window.innerHeight;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 50, w / h, 0.1, 800000 );
    camera.updateProjectionMatrix();
    camera.position.z = 200;
    camera.position.y = -20;
    var helper = new THREE.CameraHelper( camera );
    // scene.add( helper );
    scene.add( camera );

    //添加环境光
    var ambient = new THREE.AmbientLight( 0xffffff, 1.4 );
    scene.add( ambient );

    // init renderer.
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize( w, h );
    renderer.shadowMap.enabled = true;

    //设置阴影的类型
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
    renderer.shadowMapCullFace = 2;
    //设置渲染器的背景颜色
    // renderer.setClearColor(0x87CEEB);
    container.appendChild( renderer.domElement );

    //创建控制器
    control = new THREE.OrbitControls( camera, renderer.domElement );
    control.rotateSpeed = 2.0;
    control.zoomSpeed = 2.0;
    control.panSpeed = 3.0;
    control.maxPolarAngle = Math.PI / 2.2;
    control.enabled = false;

    //闯将RayCaster的对象
    raycaster = new THREE.Raycaster();

    //创建场景的灯光
    var light = new Viewer.LightManger( scene, camera );
    light.createLight();

    // //添加天空盒初始化模型并加载大模型
    // var addsky = new Viewer.AddSky( scene, camera );
    // addsky.initMode();

    var addchild = new Viewer.addChildren( scene, camera );
    addchild.initAddChild();

    var addBehindChild = new Viewer.addBehindChildren( scene, camera );
    addBehindChild.initBehindChild();

    //添加天空盒初始化模型并加载大模型
    var addsky = new Viewer.AddSky( scene, camera );
    addsky.initMode();

    //功能按钮的界面方法
    fclick.initFunction();

    animate();
    document.addEventListener( 'keydown', onKeyDown, false );
    document.addEventListener( 'keyup', onKeyUp, false );
    document.addEventListener( 'mousedown', onMouseDown, false );
    var pickMesh = new Viewer.PickMesh( scene, camera );
}

function onMouseDown() {
    
}

function onKeyDown( event ) {

    switch ( event.keyCode ) {

        case 38: // up
            Viewer.moveForward = true;
            break;
        case 87: // w
            Viewer.canJumpup = true;
            break;

        case 37: // left
        case 65: // a
            Viewer.moveLeft = true;
            break;

        case 40: // down
            Viewer.moveBackward = true;
            break;

        case 83: // s
            Viewer.canJumpdown = true;
            break;

        case 39: // right
        case 68: // d
            Viewer.moveRight = true;
            break;
    }
}

function onKeyUp( event ) {

    switch( event.keyCode ) {

        case 38: // up
            Viewer.moveForward = false;
            break;
        case 87: // w
            Viewer.canJumpup = false;
            break;

        case 37: // left
        case 65: // a
            Viewer.moveLeft = false;
            break;

        case 40: // down
            Viewer.moveBackward = false;
            break;
        case 83: // s
            Viewer.canJumpdown = false;
            break;

        case 39: // right
        case 68: // d
            Viewer.moveRight = false;
            break;
    }
}

function animate() {
    requestAnimationFrame( animate );
    raycaster.setFromCamera( mouse, camera );
    var time = performance.now();
    var delta = ( time - prevTime ) / 100;
    if ( delta > 30 ) {
        delta = 30;
    }

    //键盘事件
    keyboard.keyBoad( delta );
    //渲染场景
    render();
}

var pos = 0, zx = 0,out = 0;
var radius = 0, fx = 1;
var light,i = 0;
var position = new THREE.Vector3();
var vector = new THREE.Vector3();
var vector2 = new THREE.Vector3();
var tangent = new THREE.Vector3();
var fir = true, sec = false, thre = false;

function  inRun() {
    if (Viewer.dongcheMode != undefined && Viewer.tiegui != undefined ) {
        Viewer.dongcheMode.visible = true;
        if ( Viewer.scale < 10 ) {
            Viewer.dongcheMode.scale.set( Viewer.scale, Viewer.scale, Viewer.scale );
            Viewer.tiegui.scale.set( Viewer.scale, Viewer.scale, Viewer.scale );
            Viewer.scale += 0.03;

            Viewer.groupH.visible = true;
            Viewer.groupQ.visible = true;
        }
        // else if ( Viewer.scale > 10 ) {
        //     Viewer.groupH.visible = true;
        //     Viewer.groupQ.visible = true;
        //     scene.dirty = true;
        //     camera.dirty = true;
        // }
    }

    if ( Viewer.jcqxflag ) {
        Viewer.tieguizx.visible = true;
        Viewer.tiegui.visible = true;
        Viewer.tieguizx.position.set(  -32, 0, -13000 );
        Viewer.tiegui.position.set( -21, 0, -4000 );
        if( pos < 1 ){
            position = curveq.getPointAt( pos );
            Viewer.dongcheMode.position.copy( position );
            camera.position.set( position.x + 1, position.y + 30, position.z  - 135 );
            control.target.set( position.x + 1, position.y + 30, position.z - 135 );
            pos += 0.0012;
        } else {
            // pos = 0;
            if ( zx < 1 ) {
                position = curvezx.getPointAt( zx );
                Viewer.dongcheMode.position.copy( position );
                camera.position.set( position.x + 1, position.y + 30, position.z  - 135 );
                control.target.set( position.x + 1, position.y + 30, position.z -135 );
                zx += 0.06;
            } else {
                zx = 0;
            }
        }
    }
}

function outRun() {

    if ( wg ) {
        if ( out < 1) {
            if ( fir ) {
                position = curve.getPointAt( out );
                Viewer.dongcheMode.position.set( position.x, position.y, position.z + 300 );
                camera.position.set( position.x - 150, position.y + 50, position.z + 500 );
                control.target.set( position.x - 80, position.y + 50, position.z + 450 );
                camera.rotateY( -Math.PI/6 );
            } else if ( sec ){
                position = curve.getPointAt( out );
                Viewer.dongcheMode.position.set( position.x, position.y, position.z + 170 );
                camera.position.set( position.x - 80, position.y + 50, position.z + 500 );
                control.target.set( position.x - 50, position.y + 50, position.z + 440 );
                camera.rotateY( -Math.PI/6 );
            } else if ( thre  ){
                position = curvefx.getPointAt( out );
                Viewer.dongcheMode.position.copy( position );
                camera.position.set( position.x + 70, position.y + 50, position.z + 350 );
                control.target.set( position.x + 50, position.y + 50, position.z + 300 );
                camera.rotateY( -Math.PI/6 );
            }
            out += 0.002;
        } else {
            out = 0;
            if ( thre ) {
                thre =false;
                fir = true;
            } else  if ( sec ) {
                sec = false;
                thre = true;
            } else  if ( fir ) {
               sec = true;
               fir = false;
           }
        }
    }
}

function render() {

    //动车行驶的方法
    inRun();
    outRun();
    control.update();
    renderer.render( scene, camera );
}
