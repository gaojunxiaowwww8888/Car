/**
 * Created by 京美电子 on 2017/11/8.
 */
Viewer.addBehindChildren = function ( scene, camera ) {
    this.scene = scene;
    this.camera = camera;
    Viewer.groupH.name = 'Hlj';

    this.initAddChild = function () {
        scene.add( Viewer.groupH );
        var modeLength = modeNameBehind.length;
        while( modeLength-- ){
            this.addModeChild( modeNameBehind[modeLength]);
        }
        // for ( var i = 0; i < modeNameBehind.length; i++ ) {
        //     this.addModeChild( modeNameBehind[i]);
        // }
    }

    this.addModeChild = function ( childName ) {
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
        mtlLoader.setTexturePath('./res/kaiguanlingjianbehind/');
        mtlLoader.setPath('./res/kaiguanlingjianbehind/');

        mtlLoader.load( childName + '.mtl', function ( materials ) {
            materials.preload();
            var objLoader = new THREE.OBJLoader( manager );
            objLoader.setMaterials(materials);
            objLoader.setPath('./res/kaiguanlingjianbehind/');
            objLoader.load( childName + '.obj', function ( object) {
                child[0] = object.children[0];
                object.traverse( function( child ) {

                    // if ( child.name == 'c23' ) {
                    //     modeMesh.meshQC23 = child;
                    // }
                    if( child.name.substr( 0,1 ) == 'A'){
                        child.rotateY( 1.615 );
                    } else {
                        child.rotateY( 1.53 );
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
                    for ( var i = 0; i< modeChildPositionBeHind.length; i++ ) {
                        if ( child.name == modeChildPositionBeHind[i].name) {
                            object.position.copy( modeChildPositionBeHind[i].position );
                            object.scale.set( 10, 10, 10 );
                        }if ( child.name == 'F3' ) {
                            child.rotateY( -0.110 );
                        } if ( child.name == 'G25' ) {
                            child.rotateX( 0.002 );
                        } if( child.name == 'C6' ){
                            child.rotateY( -0.010 );

                        }if( child.name == 'C7'){
                            child.rotateY(-0.011 );
                        }
                        if( child.name == 'C8' ){
                            child.rotateY( -0.001 );
                        }
                        if( child.name == 'C13' ){
                            child.rotateY( 0.0009 );
                        }
                        if( child.name == 'C14'){
                            child.rotateY( 0.0008 );
                        }
                        if ( child.name == 'C24' ) {
                            child.rotateY( 0.017 );

                        }if ( child.name == 'C23' || child.name == 'c23' ) {
                            // child.rotateY( 0.017 );
                            // child.rotateZ( -0.005 );
                        }
                    }
                    child.name = 'H' + child.name;

                });
                Viewer.groupH.visible = false;
                Viewer.groupH.add( object );
            }, onProgress, onError );
        });
    }
}
Viewer.addBehindChildren.prototype = {
    constructor: Viewer.addBehindChildren,
    initBehindChild: function () {
        this.initAddChild();
    }
}

var addBehindChild = new Viewer.addBehindChildren();