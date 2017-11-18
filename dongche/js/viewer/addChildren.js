/**
 * Created by 京美电子 on 2017/8/2.
 */
Viewer.addChildren = function ( scene, camera ) {

    this.scene = scene;
    this.camera = camera;
    var child = [];
    Viewer.groupQ.name = "Qlj";

    // var highlightMat = new THREE.MeshPhongMaterial({
    //     color: 0x00ff00, specular: 0xedecec, shininess: 45, shading: THREE.SmoothShading
    // });

    this.initaddchild = function () {
        scene.add( Viewer.groupQ );
        //加载小模型
        var modeLength = modeNameBefored.length;
        while ( modeLength-- ){
            this.addchild( modeNameBefored[modeLength] );
        }
        // for ( var i = 0; i < modeNameBefored.length; i++ ) {
        //     this.addchild( modeNameBefored[i] );
        // }
    }

    this.addchild = function ( childName ) {

        var manager = new THREE.LoadingManager();
        manager.onProgress = function (item, loaded, total) {
        };
        var onProgress = function (xhr) {
            if (xhr.lengthComputable) {
                var percentComplete = xhr.loaded / xhr.total * 100;
            }
        };

        var onError = function (xhr) {
            console.error(xhr);
        };

        var mtlLoader = new THREE.MTLLoader(manager);
        mtlLoader.setTexturePath('./res/kaiguanlingjian/');
        mtlLoader.setPath('./res/kaiguanlingjian/');

        mtlLoader.load( childName + '.mtl', function ( materials ) {
            materials.preload();
            var objLoader = new THREE.OBJLoader( manager );
            objLoader.setMaterials(materials);
            objLoader.setPath('./res/kaiguanlingjian/');
            objLoader.load( childName + '.obj', function ( object) {
                child[0] = object.children[0];
                object.traverse( function( child ) {

                    if ( child.name == 'c23' ) {
                        modeMesh.meshQC23 = child;
                    }
                    child.castShadow = false;
                    child.receiveShadow = false;
                    if ( child instanceof THREE.Mesh ) {
                        if ( Agroup.length == 0 ) {
                            Agroup[0] = child;
                        } else {
                            Agroup[ Agroup.length ] = child;
                        }
                    }
                    for ( var i = 0; i< modeChildPositionBeFored.length; i++ ) {
                        if ( child.name == modeChildPositionBeFored[i].name) {
                            object.position.copy( modeChildPositionBeFored[i].position );
                            object.scale.set( 10, 10, 10 );
                        } if ( child.name == 'F3' ) {
                            child.rotateY( -0.110 );
                        } if ( child.name == 'G25' ) {
                            child.rotateX( 0.002 );
                        } if ( child.name == 'C6' ){
                            child.rotateY( -0.010 );
                        }if ( child.name == 'C7'){
                            child.rotateY(-0.010 );
                        } if ( child.name == 'C8' ){
                            child.rotateY( -0.001 );
                        } if ( child.name == 'C13' ){
                            child.rotateY( -0.0009 );
                        } if ( child.name == 'C14'){
                            child.rotateY( -0.0008 );
                        } if ( child.name == 'C24' ) {
                            child.rotateY( 0.007 );
                        } if ( child.name == 'C23' || child.name == 'c23' ) {
                            child.rotateY( -0.017 );
                            child.rotateZ( -0.002 );
                        }
                    }
                    child.name = 'Q' + child.name;
                });
                Viewer.groupQ.visible = false;
                Viewer.groupQ.add( object );
            }, onProgress, onError);
        });
    }
}

Viewer.addChildren.prototype = {
    constructor: Viewer.addChildren,

    initAddChild: function () {
        this.initaddchild();
    }
}

var child = new Viewer.addChildren();