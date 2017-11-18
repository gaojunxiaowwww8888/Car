/**
 * Created by 京美电子 on 2017/10/17.
 */
Viewer.KeyBoard = function () {

    this.collision = function() {
        var raycaster = new THREE.Raycaster();
        raycaster.setFromCamera( mouse, camera );
        var intersections =  raycaster.intersectObjects( collmeshList, true );
        if ( Viewer.moveForward ) {
            if ( intersections.length != 0 ) {
                if (intersections[0].distance > 0 && intersections[0].distance < 3) {
                    Viewer.moveForward = false;
                }
            }
            return;
        }
    }

    this.collisionR = function() {
        var vector = new THREE.Vector3();
        //相机方向的判断
        if ( camera.getWorldDirection().z < 0 ){
            vector.set( 5, 0, 0 );
        } else {
            vector.set( -5, 0, 0 );
        }
        var raycaster = new THREE.Raycaster();
        raycaster.ray.set( camera.position, vector.normalize() );
        var intersections =  raycaster.intersectObjects( collmeshList, true );
        if ( Viewer.moveRight ) {
            if ( intersections.length != 0 ) {
                if (intersections[0].distance > 0 && intersections[0].distance < 3 ) {
                    Viewer.moveRight = false;
                }
            }
            return;
        }
    }

    this.collisionL = function() {
        var vector = new THREE.Vector3();
        //相机方向的判断
        if ( camera.getWorldDirection().z < 0 ){
            vector.set( -5, 0, 0 );
        } else {
            vector.set( 5, 0, 0 );
        }
        var raycaster = new THREE.Raycaster();
        raycaster.ray.set( camera.position, vector.normalize() );
        var intersections =  raycaster.intersectObjects( collmeshList, true );
        if (  Viewer.moveLeft ) {
            if ( intersections.length != 0 ) {
                if (intersections[0].distance > 0 && intersections[0].distance < 3 ) {
                    Viewer.moveLeft = false;
                }
            }
            return;
        }
    }

    this.keyBoad = function( delta ) {
        raycaster.setFromCamera( mouse, camera );
        if ( Viewer.moveForward ) {
            this.collision();
        }
        if ( Viewer.moveRight ) {
            this.collisionR();
        }
        if ( Viewer.moveLeft ) {
            this.collisionL();
        }

        // 机车前行
        // if ( Viewer.jcqxflag ) {
        //     if ( camera.getWorldDirection().z < 0 ) {
        //         if ( Viewer.moveForward ) {
        //             control.target.z -= 1.0;
        //             camera.position.z -= 1.0;
        //
        //         } if ( Viewer.moveBackward ) {
        //             control.target.z += 1.0;
        //             camera.position.z += 1.0;
        //
        //         } if ( Viewer.moveLeft ) {
        //             control.target.x -= kekstep * delta;
        //             camera.position.x -= kekstep * delta;
        //
        //         } if ( Viewer.moveRight ) {
        //             control.target.x += kekstep * delta;
        //             camera.position.x += kekstep * delta;
        //         }
        //     } else if( camera.getWorldDirection().z > 0 ){
        //         if ( Viewer.moveForward ) {
        //             control.target.z += kekstep * delta;
        //             camera.position.z += kekstep * delta;
        //
        //         } if ( Viewer.moveBackward ) {
        //             control.target.z -= kekstep * delta;
        //             camera.position.z -= kekstep * delta;
        //
        //         } if ( Viewer.moveLeft ) {
        //             control.target.x += kekstep * delta;
        //             camera.position.x += kekstep * delta;
        //
        //         } if ( Viewer.moveRight ) {
        //             control.target.x -= kekstep * delta;
        //             camera.position.x -= kekstep * delta;
        //         }
        //     }
        // }

        //前驾驶室
        if ( Viewer.qbflag ) {
            if ( camera.getWorldDirection().z < 0 ) {
                if ( Viewer.moveForward ) {
                    control.target.z -= kekstep * delta;
                    camera.position.z -= kekstep * delta;
                } if ( Viewer.moveBackward ) {
                    control.target.z += kekstep * delta;
                    camera.position.z += kekstep * delta;
                } if ( Viewer.moveLeft ) {
                    control.target.x -= kekstep * delta;
                    camera.position.x -= kekstep * delta;
                } if ( Viewer.moveRight ) {
                    control.target.x += kekstep * delta;
                    camera.position.x += kekstep * delta;
                }
            }else if( camera.getWorldDirection().z > 0 ){
                if ( Viewer.moveForward ) {
                    control.target.z += kekstep * delta;
                    camera.position.z += kekstep * delta;
                } if ( Viewer.moveBackward ) {
                    control.target.z -= kekstep * delta;
                    camera.position.z -= kekstep * delta;
                } if ( Viewer.moveLeft ) {
                    control.target.x += kekstep * delta;
                    camera.position.x += kekstep * delta;
                } if ( Viewer.moveRight ) {
                    control.target.x -= kekstep * delta;
                    camera.position.x -= kekstep * delta;
                }
            }
        }

        //后驾驶室
        if ( Viewer.hbflag || Viewer.jssjflag ) {
            if ( camera.getWorldDirection().z > 0 ) {
                if ( Viewer.moveForward ) {
                    control.target.z += kekstep * delta;
                    camera.position.z += kekstep * delta;
                } if ( Viewer.moveBackward ) {
                    control.target.z -= kekstep * delta;
                    camera.position.z -= kekstep * delta;
                } if ( Viewer.moveLeft ) {
                    control.target.x += kekstep * delta;
                    camera.position.x += kekstep * delta;
                }if ( Viewer.moveRight ) {
                    control.target.x -= kekstep * delta;
                    camera.position.x -= kekstep * delta;
                }
            }
            if ( camera.getWorldDirection().z < 0 ) {
                if ( Viewer.moveForward ) {
                    control.target.z -= kekstep * delta;
                    camera.position.z -= kekstep * delta;
                } if ( Viewer.moveBackward ) {
                    control.target.z += kekstep * delta;
                    camera.position.z += kekstep * delta;
                } if ( Viewer.moveLeft ) {
                    control.target.x -= kekstep * delta;
                    camera.position.x -= kekstep * delta;
                } if ( Viewer.moveRight ) {
                    control.target.x += kekstep * delta;
                    camera.position.x += kekstep * delta;
                }
            }
        }

        //升降视角
        if ( Viewer.canJumpup ) {
            control.target.y += kekstep * delta;
            camera.position.y += kekstep * delta;
        }
        if ( Viewer.canJumpdown ) {
            control.target.y -= kekstep * delta;
            camera.position.y -= kekstep * delta;
        }
    }
}

Viewer.KeyBoard.prototype = {
    constructor: Viewer.KeyBoard
}

var keyboard = new Viewer.KeyBoard();