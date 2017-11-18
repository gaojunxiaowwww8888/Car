/**
 * Created by 京美电子 on 2017/7/20.
 */
function aOperate( mesh, flag ) {
    if ( flag == 'sub' ) {
        if ( mesh != null) {
            var name = spiltName( mesh );
            switch ( name ) {
                case 'A34':
                    if ( a34step >= -0.42 ) {
                        mesh.rotateOnAxis( new THREE.Vector3( 1,0,0 ), -0.05 );
                        a34step =  a34step - 0.015;
                        console.log( a34step + 'q' );
                    }
                    break;

                case 'A32':
                    if ( a32step >= -0.24 ) {
                        mesh.rotateOnAxis( new THREE.Vector3( 1,0,0 ), -0.05 );
                        a32step =  a32step - 0.015;
                        console.log( a32step + 'q' );
                    }
                    break;

                case 'A31':
                    if ( a31step >= -0.28 ) {
                        mesh.rotateOnAxis( new THREE.Vector3( 1,0,0 ), -0.05 );
                        a31step =  a31step - 0.015;
                        console.log( a31step + 'q' );
                    }
                    break;
                case 'A11':
                    if ( a11step >= -0.21 ) {
                        mesh.rotateOnAxis( new THREE.Vector3( 1,0,0 ), -0.05 );
                        a11step =  a11step - 0.015;
                    }
                    console.log( a11step + 'q' );
                    break;

                case 'A10':
                    if ( a10step >= -0.21 ) {
                        mesh.rotateOnAxis( new THREE.Vector3( 1,0,0 ), -0.05 );
                        a10step =  a10step - 0.015;
                    }
                    console.log( a10step + 'q' );
                    break;

                case 'A9':
                    if ( a9step >= -0.21 ) {
                        mesh.rotateOnAxis( new THREE.Vector3( 1,0,0 ), -0.05 );
                        a9step =  a9step - 0.015;
                    }
                    console.log( a9step + 'q' );
                    break;

                case 'A34h':
                    if ( a34steph >= -0.39 ) {
                        mesh.rotateOnAxis( new THREE.Vector3( 1,0,0 ), -0.05 );
                        a34steph =  a34steph - 0.015;
                        console.log( a34steph );
                    }
                    break;

                case 'A32h':
                    if ( a32steph >= -0.24 ) {
                        mesh.rotateOnAxis( new THREE.Vector3( 1,0,0 ), -0.05 );
                        a32steph =  a32steph - 0.015;
                    }
                    break;

                case 'A31h':
                    if ( a31steph >= -0.28 ) {
                        mesh.rotateOnAxis( new THREE.Vector3( 1,0,0 ), -0.05 );
                        a31steph =  a31steph - 0.015;
                    }
                    break;

                case 'A11h':
                    if ( a11steph >= -0.21 ) {
                        mesh.rotateOnAxis( new THREE.Vector3( 1,0,0 ), -0.05 );
                        a11steph =  a11steph - 0.015;
                    }
                    console.log( a11steph + 'h' );
                    break;

                case 'A10h':
                    if ( a10steph >= -0.21 ) {
                        mesh.rotateOnAxis( new THREE.Vector3( 1,0,0 ), -0.05 );
                        a10steph =  a10steph - 0.015;
                    }
                    console.log( a10steph + 'h' );
                    break;

                case 'A9h':
                    if ( a9steph >= -0.21 ) {
                        mesh.rotateOnAxis( new THREE.Vector3( 1,0,0 ), -0.05 );
                        a9steph =  a9steph - 0.015;
                    }
                    console.log( a9steph + 'h' );
                    break;

                default:
                    break;
            }
        }
    }
    if ( flag == 'add') {
        if ( mesh != null ) {
            var name = spiltName( mesh );
            switch ( name ) {
                case 'A34':
                    if ( a34step <= 0.42 ) {
                        mesh.rotateOnAxis( new THREE.Vector3( 1,0,0 ), 0.05 );
                        a34step =  a34step + 0.015;
                        console.log( a34step + 'h' );
                    }
                    break;

                case 'A32':
                    if ( a32step <= 0.24 ) {
                        mesh.rotateOnAxis( new THREE.Vector3( 1,0,0 ), 0.05 );
                        a32step =  a32step + 0.015;
                        console.log( a32step + 'h' );
                    }
                    break;

                case 'A31':
                    if ( a31step <= 0.28 ) {
                        mesh.rotateOnAxis( new THREE.Vector3( 1,0,0 ), 0.05 );
                        a31step =  a31step + 0.015;
                        console.log( a31step + 'h' );
                    }
                    break;

                case 'A11':
                    if ( a11step <= 0.21 ) {
                        mesh.rotateOnAxis( new THREE.Vector3( 1,0,0 ), 0.05 );
                        a11step =  a11step + 0.015;
                    }
                    console.log( a11step + 'h' );
                    break;

                case 'A10':
                    if ( a10step <= 0.21 ) {
                        mesh.rotateOnAxis( new THREE.Vector3( 1,0,0 ), 0.05 );
                        a10step =  a10step + 0.015;
                    }
                    console.log( a10step + 'h' );
                    break;

                case 'A9':
                    if ( a9step <= 0.21 ) {
                        mesh.rotateOnAxis( new THREE.Vector3( 1,0,0 ), 0.05 );
                        a9step =  a9step + 0.015;
                    }
                    console.log( a9steph + 'h' );
                    break;

                case 'A34h':
                    if ( a34steph <= 0.39 ) {
                        mesh.rotateOnAxis( new THREE.Vector3( 1,0,0 ), 0.05 );
                        a34steph =  a34steph + 0.015;
                    }
                    break;

                case 'A32h':
                    if ( a32steph <= 0.24 ) {
                        mesh.rotateOnAxis( new THREE.Vector3( 1,0,0 ), 0.05 );
                        a32steph =  a32steph + 0.015;
                        console.log( a32step );
                    }
                    break;

                case 'A31h':
                    if ( a31steph <= 0.28 ) {
                        mesh.rotateOnAxis( new THREE.Vector3( 1,0,0 ), 0.05 );
                        a31steph =  a31steph + 0.015;
                    }
                    break;

                case 'A11h':
                    if ( a11steph <= 0.21 ) {
                        mesh.rotateOnAxis( new THREE.Vector3( 1,0,0 ), 0.05 );
                        a11steph =  a11steph + 0.015;
                    }
                    console.log( a11steph + 'q' );
                    break;

                case 'A10h':
                    if ( a10steph <= 0.21 ) {
                        mesh.rotateOnAxis( new THREE.Vector3( 1,0,0 ), 0.05 );
                        a10steph =  a10steph + 0.015;
                    }
                    console.log( a10steph + 'q' );
                    break;

                case 'A9h':
                    if ( a9steph <= 0.21 ) {
                        mesh.rotateOnAxis( new THREE.Vector3( 1,0,0 ), 0.05 );
                        a9steph =  a9steph + 0.015;
                    }
                    console.log( a9steph + 'q' );
                    break;

                default:
                    break;

            }
        }
    }
}

//开关的旋转控制
function modeRoate( mesh, flag ) {
    if ( flag == 'add' ) {
        if ( mesh != null) {
            var name = spiltName( mesh );
            switch ( name ) {
                case 'A8':
                    if ( a8step <= 0.025 ) {
                        mesh.rotateY( 0.10 );
                        a8step =  a8step + 0.001;
                    }
                    console.log( a8step + "前" );
                    break;

                case 'A13':
                    if ( a13step <= 0.055) {
                        mesh.rotateZ( 0.08 );
                        a14mf.rotateZ( 0.08 );
                        a13step =  a13step + 0.001;
                    }
                    console.log( a13step + "前" );
                    break;

                case 'A35':
                    if ( a35step <= 0.030 ) {
                        mesh.rotateY( 0.08 );
                        a35step =  a35step + 0.001;
                    }
                    break;

                case 'A8h':
                    if ( a8steph <= 0.025 ) {
                        mesh.rotateY( 0.10 );
                        a8steph =  a8steph + 0.001;
                    }
                    console.log( a8steph + "前" );
                    break;

                case 'A13h':
                    if ( a13step <= 0.055) {
                        mesh.rotateZ( 0.08 );
                        a14m.rotateZ( 0.08 );
                        a13step =  a13step + 0.001;
                    }
                    console.log( a13step + "前" );
                    break;

                case 'A35h':
                    if ( a35steph <= 0.04 ) {
                        mesh.rotateY( 0.05 );
                        a35steph =  a35steph + 0.001;
                    }
                    break;

                default:
                    break;
            }
        }
    }
    if ( flag == 'sub' ) {
        if ( mesh != null) {
            var name = spiltName( mesh );
            switch ( name ) {
                case 'A8':
                    if ( a8step >= -0.025 ) {
                        mesh.rotateY( -0.10 );
                        a8step =  a8step - 0.001;
                    }
                    console.log( a8step + "h后" );
                    break;

                case 'A13':
                    if ( a13step >= -0.035 ) {
                        mesh.rotateZ( -0.08 );
                        a14mf.rotateZ( -0.08 );
                        a13step =  a13step - 0.001;
                    }
                    console.log( a13step + "后" );
                    break;

                case 'A35':
                    if ( a35step >= -0.030 ) {
                        mesh.rotateY( -0.08 );
                        a35step =  a35step - 0.001;
                    }
                    console.log( a35step + "h后" );
                    break;

                case 'A8h':
                    if ( a8steph >= -0.025 ) {
                        mesh.rotateY( -0.10 );
                        a8steph =  a8steph - 0.001;
                    }
                    console.log( a8steph + "h后" );
                    break;

                case 'A13h':
                    if ( a13step >= -0.035 ) {
                        mesh.rotateZ( -0.08 );
                        a14m.rotateZ( -0.08 );
                        a13step =  a13step - 0.001;
                    }
                    console.log( a13step + "后" );
                    break;

                case 'A35h':
                    if ( a35steph >= -0.04 ) {
                        mesh.rotateY( -0.05 );
                        a35steph =  a35steph - 0.001;
                    }
                    console.log( a35steph + "h后" );
                    break;

                default:
                    break;
            }
        }
    }
}

//按钮的点击方法
function aOperateClick( mesh ) {
    var name;
    if ( mesh != null ) {
        name = spiltName( mesh );
    }
    switch ( name ){
        case 'A6':
            if ( clickStateA6 ) {
                mesh.translateY( 0.005 );
            } else if ( !clickStateA6 ){
                mesh.translateY( -0.005 );
            }
            clickStateA6 = clickStateA6 == false? true:false;
            break;

        case 'A7':
            if ( clickStateA7 ) {
                mesh.translateY( 0.005 );
            } else if ( !clickStateA7 ){
                mesh.translateY( -0.005 );
            }
            clickStateA7 = clickStateA7 == false? true:false;
            break;

        case 'A12':
            if ( clickStateA12 ) {
                mesh.translateY( 0.005 );
            } else if ( !clickStateA12 ){
                mesh.translateY( -0.005 );
            }
            clickStateA12 = clickStateA12 == false? true:false;
            break;

        default:
            break;
    }
}

function spiltName( mesh ) {

    var name;
    if ( mesh.name.length >5 ) {
        name = mesh.name.split("_");
        return name[1];
    } else {
        return mesh.name;
    }
}
