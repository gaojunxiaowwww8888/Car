/**
 * Created by 京美电子 on 2017/6/30.
 */
Viewer.AddSky = function ( scene, camera ) {

    this.scene = scene;
    this.camera = camera;
    var group = new THREE.Group();
    group.name = "qlj";
    var intext;

    var modeNameFront = [ 'A35','A34','A32','A31','A23','A14','A13','A11','A10','A9','A8'];
    var modechildPositionFront = [
        { name: 'A35', position: new THREE.Vector3( 0.52, 24.72, -93.52 )},
        { name: 'A34', position: new THREE.Vector3( -0.70, 24.54, -93.90 )},
        { name: 'A32', position: new THREE.Vector3( -8.49, 24.45, -93.95 )},
        { name: 'A31', position: new THREE.Vector3( -10.62, 24.44, -93.97 )},
        { name: 'A23', position: new THREE.Vector3( -10.78, 25.80, -98.10 )},

        { name: 'A14', position: new THREE.Vector3( 4.1, 25.99, -92.79 )},
        { name: 'A13', position: new THREE.Vector3( 4.1, 25.99, -92.79 )},
        { name: 'A11', position: new THREE.Vector3( -5.81, 24.36, -96.26 )},
        { name: 'A10', position: new THREE.Vector3( -6.22, 24.40, -96.26 )},
        { name: 'A9', position: new THREE.Vector3( -6.60, 24.35, -96.26 )},
        { name: 'A8', position: new THREE.Vector3( -7.24, 24.73, -96.25 )},
    ];

    var sceneList = [
        {
            name : 'Unity2Skfb (PBR)', url : 'res/car/jiche_waibu/Unity2Skfb.gltf',
        },
        {
            name : 'Unity2Skfb (PBR)', url : 'res/car/jiche_neibu/Unity2Skfb.gltf',
        }
    ];

    var highlightMat = new THREE.MeshPhongMaterial({
        color: 0x00ff00, specular: 0xedecec, shininess: 45, shading: THREE.SmoothShading
    });

    this.initAddsky = function () {

        //加载天空盒
        var cubeMap = new THREE.CubeTexture( [] );
        cubeMap.format = THREE.RGBFormat;

        var loader = new THREE.ImageLoader();
        loader.load( 'res/skyBox/skyboxsun25degtest.png', function ( image ) {

            var getSide = function ( x, y ) {
                var size = 1024;
                var canvas = document.createElement( 'canvas' );
                canvas.width = size;
                canvas.height = size;
                var context = canvas.getContext( '2d' );
                context.drawImage( image, - x * size, - y * size );
                return canvas;
            };

            cubeMap.images[ 0 ] = getSide( 2, 1 ); // px
            cubeMap.images[ 1 ] = getSide( 0, 1 ); // nx
            cubeMap.images[ 2 ] = getSide( 1, 0 ); // py
            cubeMap.images[ 3 ] = getSide( 1, 2 ); // ny
            cubeMap.images[ 4 ] = getSide( 1, 1 ); // pz
            cubeMap.images[ 5 ] = getSide( 3, 1 ); // nz
            cubeMap.needsUpdate = true;

        } );

        var cubeShader = THREE.ShaderLib[ 'cube' ];
        cubeShader.uniforms[ 'tCube' ].value = cubeMap;
        var skyBoxMaterial = new THREE.ShaderMaterial( {
            fragmentShader: cubeShader.fragmentShader,
            vertexShader: cubeShader.vertexShader,
            uniforms: cubeShader.uniforms,
            depthWrite: false,
            side: THREE.BackSide

        } );

        var skyBox = new THREE.Mesh(
            new THREE.BoxGeometry( 1000000, 1000000, 1000000 ),
            skyBoxMaterial
        );

        //添加天空盒
        scene.add( skyBox );

        //加载大模型
        this.addModetiegui();
        this.addModetieguizx();
        this.addModedongche();
        //加载小模型
        // for (var i = 0; i < modeNameFront.length; i++ ) {
        //     this.addModechild( modeNameFront[i] );
        // }
    }

    //绘制轨道路径
    drawdoncheway.drawWay();

    var manager = new THREE.LoadingManager();
    manager.onProgress = function( item, loaded, total ) {
        console.log( item, loaded, total );
    };

    var onProgress = function( xhr ) {

        if ( xhr.lengthComputable ) {
            var percentComplete = xhr.loaded / xhr.total * 100;
            console.log( xhr.total + ":"+ xhr.loaded + ":" + xhr.item );
            var bb = Math.round( percentComplete, 2 );
            intext = document.getElementById( 'loadbar' );
            intext.innerHTML = Math.round( percentComplete, 2 ) + '% Loading';
        }
    };

    var onError = function( xhr ) {
        console.error( xhr );
    };

    this.addModetiegui = function () {
        // model 34
        var mtlLoader = new THREE.MTLLoader( manager );
        mtlLoader.setTexturePath( './res/tiegui1/' );
        mtlLoader.setPath( './res/tiegui1/' );

        mtlLoader.load('tiegui_zon20171023.mtl', function( materials ) {
            materials.preload();
            var objLoader = new THREE.OBJLoader( manager );
            objLoader.setMaterials( materials );
            objLoader.setPath( './res/tiegui1/' );
            objLoader.load( 'tiegui_zon20171023.obj', function ( object ) {

                console.log( object );
                object.traverse( function ( child ) {

                    child.castShadow = false;
                    child.receiveShadow = false;
                } );
                Viewer.tiegui = object;
                object.position.set( -21, 0, -4000 );
                object.visible = true;
                scene.add( object );
                intext.style.display = 'none';
            }, onProgress, onError );
        });
    }

    this.addModetieguizx = function () {
        // model 34
        var mtlLoader = new THREE.MTLLoader( manager );
        mtlLoader.setTexturePath( './res/tiegui/' );
        mtlLoader.setPath( './res/tiegui/' );

        mtlLoader.load('tiegui(4).mtl', function( materials ) {
            materials.preload();
            var objLoader = new THREE.OBJLoader( manager );
            objLoader.setMaterials( materials );
            objLoader.setPath( './res/tiegui/' );
            objLoader.load( 'tiegui(4).obj', function ( object ) {

                console.log( object );
                object.traverse( function ( child ) {

                    child.castShadow = false;
                    child.receiveShadow = false;

                } );
                Viewer.tieguizx = object;
                Viewer.tieguizx.scale.set( 10, 10, 10 );
                Viewer.tieguizx.position.set( -32, 0, -13000 );
                Viewer.tieguizx.visible = false;
                scene.add( Viewer.tieguizx );
            }, onProgress, onError );
        });
    }

    // this.addModedongche = function () {
    //
    //     //添加gltf格式的模型
    //     var loader = new THREE.GLTF2Loader( manager );
    //     var extension = 'glTF';
    //     loader.load( './dongche_20171101_gitf(2)/Unity2Skfb.gltf', function(data) {
    //
    //         var gltf = data;
    //         var object = gltf.scene;
    //         object.traverse( function ( child ) {
    //
    //             child.castShadow = false;
    //             child.receiveShadow = false;
    //             if ( child instanceof THREE.Mesh ) {
    //                 var material = new THREE.MeshPhongMaterial( { emissive: 0x050504,ambient: 0x050505,
    //                     color: child.material.color, specular: 0x555555, shininess: 100, map:child.material.map} );
    //                 var childName = child.name.substr( 5, 4 );
    //                 child.material = material;
    //                 if ( childName == 'boli') {
    //                     child.material.transparent = true;
    //                     child.material.opacity = 0.4;
    //                     child.material.specular = new THREE.Color(0, 0, 0);
    //                     child.material.shading = 5;
    //                     child.material.shininess = 10;
    //                 }
    //             }
    //         } );
    //         Viewer.dongcheMode = object;
    //         object.scale.set( 10.05, 10.05, 10.05 );
    //         object.position.set( -10, 0, 0 );
    //
    //         scene.add( object );
    //     }, onProgress, onError );
    // }

    this.addModedongche = function () {
        // model 34
        var mtlLoader = new THREE.MTLLoader( manager );
        mtlLoader.setTexturePath( './dongche_20171103/' );
        mtlLoader.setPath( './dongche_20171103/' );

        mtlLoader.load('tiegui02_zon20171110.mtl', function( materials ) {
            materials.preload();
            var objLoader = new THREE.OBJLoader( manager );
            objLoader.setMaterials( materials );
            objLoader.setPath( './dongche_20171103/' );
            objLoader.load( 'tiegui02_zon20171110.obj', function ( object ) {

                object.traverse( function ( child ) {

                    child.castShadow = false;
                    child.receiveShadow = false;

                    if ( child instanceof THREE.Mesh ) {
                        if ( collmeshList.length ==0 ) {
                            collmeshList[0] = child;
                        } else {
                            collmeshList[ collmeshList.length ] = child;
                        }
                        var material = new THREE.MeshPhongMaterial( { emissive: 0x050504,ambient: 0x050505,
                            color: child.material.color, specular: 0x555555, shininess: 100, map:child.material.map} );
                        child.material = material;
                    }

                    var childName = child.name.substr( 0, 4 );
                    if ( childName == 'boli' ) {
                        console.log( child );
                        child.material.transparent = true;
                        child.material.opacity = 0.6;
                        child.material.specular = new THREE.Color( 0, 1, 1 );
                        child.material.shading = 5;
                        child.material.shininess = 10;
                        child.castShadow = false;
                        child.receiveShadow = false;
                    }
                } );

                Viewer.dongcheMode = object;
                object.position.set( -10, 0, 0 );
                Viewer.dongcheMode.visible = false;
                scene.add( Viewer.dongcheMode );
            }, onProgress, onError );
        });
    }

    //对mesh进行分类
    this.classify = function ( children ) {

        if ( children.length == 1 ) {
            if ( Agroup.length == 0 ) {
                Agroup[0] = children[0];
                materialArray[0] = [{
                    name: children[0].name,
                    material: children[0].material
                }];
            } else {
                Agroup[ Agroup.length ] = children[0];
                materialArray[materialArray.length] = [{
                    name: children[0].name,
                    material: children[0].material
                }];
            }
        } else {
            for ( var i = 0, j = 0; i < children.length; i++ ) {
                var meshName = children[i].name.substr( 5, 1 );
                if ( meshName == 'A' ) {
                    Agroup[ Agroup.length ] = children[i];
                    materialArray[materialArray.length] = [{
                        name: children[i].name,
                        material: children[i].material
                    }];
                    j++;
                }
            }
        }
    }
}

Viewer.AddSky.prototype = {
    constructor: Viewer.AddSky,
    initMode: function () {
        this.initAddsky();
    }
}

var addsky = new Viewer.AddSky();