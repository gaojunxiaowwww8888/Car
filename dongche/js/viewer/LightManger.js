/**
 * Created by 京美电子 on 2017/7/18.
 */
Viewer.LightManger = function ( scene, camera ) {

    this.scene = scene;
    this.camera = camera;
    var step = 0;
    scene.add( Viewer.groudLight );
    this.initCreate = function () {

        var light3 = new THREE.DirectionalLight( 0xeaedd4, 0.04 );
        light3.position.set( 0, 80, -10 );
        light3.distance = 0;
        light3.castShadow = false;
        light3.shadowCameraNear = 2;
        light3.shadowCameraFar = 100;
        light3.shadowCameraLeft = -50;
        light3.shadowCameraRight = 50;
        light3.shadowCameraTop = 50;
        light3.shadowCameraBottom = -50;
        var pointLightHelper = new THREE.DirectionalLightHelper( light3, 1 );
        // scene.add( pointLightHelper );
        scene.add( light3 );

        var pointLight1 = new THREE.PointLight( 0x404040, 1.0 );
        pointLight1.position.set( -15, 30, -58 );
        pointLight1.distance = 8;
        pointLight1.castShadow = false;
        var pointLightHelper = new THREE.PointLightHelper( pointLight1, 1 );
        // scene.add( pointLightHelper );
        // scene.add( pointLight1 );

        for( var i=0; i<9; i++ ){

            //创建光源小球
            var pointLight = new THREE.PointLight( 0x404040, 5.0 );
            pointLight.position.set( -10, 35, -80 + step );
            pointLight.distance = 5;
            pointLight.castShadow = false;
            pointLight.angle = 2 * Math.PI; //光源的角度
            // var pointLightHelper = new THREE.PointLightHelper( pointLight, 1 );
            // scene.add( pointLightHelper );
            Viewer.groudLight.add( pointLight );
            step += 20;
        }
    }
}

Viewer.LightManger.prototype = {

    constructor: Viewer.LightManger,
    createLight: function () {
        this.initCreate();
   }
}

var lightManger = new Viewer.LightManger();
