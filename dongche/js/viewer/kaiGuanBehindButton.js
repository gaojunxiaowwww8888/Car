/**
 * Created by 京美电子 on 2017/11/8.
 */
Viewer.kaiGuanBehindButton = function () {

    this.initChild = function ( obj ) {
        var meshName = obj.name.substr( 0, 1 );
        var oPName = obj.name.substr( 0, 2 );
        if ( oPName == 'HA' ) {
            this.hAButton( obj );
        } else if ( oPName == 'HG' || oPName == 'HB' ) {
            this.hGButton( obj );
        }
    }

    this.hAButton = function ( obj ) {
        var opName = obj.name;
        for ( var i=0; i< HAButton.length; i++ ) {
            if ( opName == HAButton[i].name ) {
                if ( HAButton[i].HA1tag) {
                    obj.rotateZ( -0.765 );
                    HAButton[i].HA1tag = false;
                } else if( !HAButton[i].HA1tag ){
                    obj.rotateZ( 0.765 );
                    HAButton[i].HA1tag = true;
                }
            }
        }
    }

    this.hGButton = function ( obj ) {
        var opName = obj.name;
        for ( var i=0; i< HGButton.length; i++ ) {
            if ( opName == HGButton[i].name && opName != 'HG25' && opName != 'HB8' ) {
                if ( HGButton[i].HG1tag ) {
                    obj.rotateX( 0.765 );
                    HGButton[i].HG1tag = false;
                } else if( !HGButton[i].HG1tag ){
                    obj.rotateX( -0.765 );
                    HGButton[i].HG1tag = true;
                }
            }else if( opName == 'HB8'){
                if ( HGButton[i].HB1tag ) {
                    obj.rotateY( 1.53 );
                    HGButton[i].HB1tag = false;
                } else if( !HGButton[i].HB1tag ){
                    obj.rotateY( -1.53 );
                    HGButton[i].HB1tag = true;
                }
            }
        }
    }
    
    this.hCButton = function ( obj,flag ) {
        if ( flag == 'add') {
            if ( obj != null) {
                var opName = obj.name;
                switch ( opName ){
                    case  'HC6':
                        if ( HCStep.HC6Step <= 0.09 ) {
                            obj.rotateOnAxis( new THREE.Vector3( 0,0,1 ), 0.05 );
                            HCStep.HC6Step =  HCStep.HC6Step + 0.01;
                            console.log( '加' + HCStep.HC6Step );
                        }
                        break;

                    case  'HC7':
                        if ( HCStep.HC7Step >= -0.01 ) {
                            obj.rotateOnAxis( new THREE.Vector3( 0,0,1 ), 0.05 );
                            HCStep.HC7Step =  HCStep.HC7Step - 0.01;
                            console.log( '加' + HCStep.HC7Step );
                        }
                        break;

                    case  'HC8':
                        if ( HCStep.HC8Step <= 0.09 ) {
                            obj.rotateOnAxis( new THREE.Vector3( 1,0,0 ), -0.05 );
                            HCStep.HC8Step = HCStep.HC8Step + 0.01;
                            console.log( '加' + HCStep.HC8Step );
                        }
                        break;

                    case  'HC9':
                        if ( HCStep.HC9Step <= 0.09 ) {
                            obj.rotateOnAxis( new THREE.Vector3( 1,0,0 ), -0.05 );
                            HCStep.HC9Step =  HCStep.HC9Step + 0.01;
                            console.log( '加' + HCStep.HC9Step );
                        }
                        break;

                    case  'HC10':
                        if ( HCStep.HC10Step <= 0.09 ) {
                            obj.rotateOnAxis( new THREE.Vector3( 1,0,0 ), -0.05 );
                            HCStep.HC10Step =  HCStep.HC10Step + 0.01;
                            console.log( '加' + HCStep.HC10Step );
                        }
                        break;

                    case  'HC11':
                        if ( HCStep.HC11Step <= 0.09 ) {
                            obj.rotateOnAxis( new THREE.Vector3( 1,0,0 ), -0.05 );
                            HCStep.HC11Step =  HCStep.HC11Step + 0.01;
                            console.log( '加' + HCStep.HC11Step );
                        }
                        break;

                    case  'HC12':
                        if ( HCStep.HC12Step <= 0.09 ) {
                            obj.rotateOnAxis( new THREE.Vector3( 1,0,0 ), -0.05 );
                            HCStep.HC12Step =  HCStep.HC12Step + 0.01;
                            console.log( '加' + HCStep.HC12Step );
                        }
                        break;

                    case  'HC14':
                        if ( HCStep.HC14Step <= 0.11 ) {
                            obj.rotateOnAxis( new THREE.Vector3( 1,0,0 ), -0.05 );
                            HCStep.HC14Step = HCStep.HC14Step + 0.015;
                            console.log( '加' + HCStep.HC14Step );
                        }
                        break;

                    case  'HC13':
                        if ( HCStep.HC13Step <= 0.11 ) {
                            obj.rotateOnAxis( new THREE.Vector3( 1,0,0 ), -0.05 );
                            HCStep.HC13Step =  HCStep.HC13Step + 0.015;
                            console.log( '加' + HCStep.HC13Step );
                        }
                        break;

                    default:
                        break;
                }
            }
        }
        if ( flag == 'sub') {
            if ( obj != null) {
                var opName = obj.name;
                switch ( opName ){
                    case  'HC6':
                        if ( HCStep.HC6Step >= -0.08 ) {
                            obj.rotateOnAxis( new THREE.Vector3( 0,0,1 ), -0.05 );
                            HCStep.HC6Step = HCStep.HC6Step - 0.01;
                            console.log( '减' + HCStep.HC6Step );
                        }
                        break;

                    case  'HC7':
                        if ( HCStep.HC7Step <= 0.11 ) {
                            obj.rotateOnAxis( new THREE.Vector3( 0,0,1 ), -0.05 );
                            HCStep.HC7Step = HCStep.HC7Step + 0.01;
                            console.log( '减' + HCStep.HC7Step );
                        }
                        break;

                    case  'HC8':
                        if ( HCStep.HC8Step >= -0.04 ) {
                            obj.rotateOnAxis( new THREE.Vector3( 1,0,0 ), 0.05 );
                            HCStep.HC8Step = HCStep.HC8Step - 0.01;
                            console.log( '减' + HCStep.HC8Step );
                        }
                        break;

                    case  'HC9':
                        if ( HCStep.HC9Step >= -0.08 ) {
                            obj.rotateOnAxis( new THREE.Vector3( 1,0,0 ), 0.05 );
                            HCStep.HC9Step = HCStep.HC9Step - 0.01;
                            console.log( '减' + HCStep.HC9Step );
                        }
                        break;

                    case  'HC10':
                        if ( HCStep.HC10Step >= -0.08 ) {
                            obj.rotateOnAxis( new THREE.Vector3( 1,0,0 ), 0.05 );
                            HCStep.HC10Step = HCStep.HC10Step - 0.01;
                            console.log( '减' + HCStep.HC10Step );
                        }
                        break;

                    case  'HC11':
                        if ( HCStep.HC11Step >= -0.08 ) {
                            obj.rotateOnAxis( new THREE.Vector3( 1,0,0 ), 0.05 );
                            HCStep.HC11Step = HCStep.HC11Step - 0.01;
                            console.log( '减' + HCStep.HC11Step );
                        }
                        break;

                    case  'HC12':
                        if ( HCStep.HC12Step >= -0.08 ) {
                            obj.rotateOnAxis( new THREE.Vector3( 1,0,0 ), 0.05 );
                            HCStep.HC12Step = HCStep.HC12Step - 0.01;
                            console.log( '减' + HCStep.HC12Step );
                        }
                        break;

                    case  'HC14':
                        if ( HCStep.HC14Step >= -0.18 ) {
                            obj.rotateOnAxis( new THREE.Vector3( 1,0,0 ), 0.05 );
                            HCStep.HC14Step = HCStep.HC14Step - 0.015;
                            console.log( '减' + HCStep.HC14Step );
                        }
                        break;

                    case  'HC13':
                        if ( HCStep.HC13Step >= -0.18 ) {
                            obj.rotateOnAxis( new THREE.Vector3( 1,0,0 ), 0.05 );
                            HCStep.HC13Step = HCStep.HC13Step - 0.015;
                            console.log( '减' + HCStep.HC13Step );
                        }
                        break;

                    default:
                        break;
                }
            }
        }
    }

    this.hModeRotate = function ( obj, flag ) {
        if ( flag == 'add' ) {
            if ( obj != null ) {
                var opName = obj.name;
                switch ( opName ){
                    case 'HC24':
                        if ( HCStep.HC24Step <= 0.025 ) {
                            obj.rotateX( 0.10 );
                            HCStep.HC24Step = HCStep.HC24Step + 0.001;
                        }
                        console.log( HCStep.HC24Step + "前" );
                        break;

                    case 'HC15':
                        if ( HCStep.HC15Step <= 0.025 ) {
                            obj.rotateY( -0.10 );
                            HCStep.HC15Step = HCStep.HC15Step + 0.001;
                        }
                        console.log( HCStep.HC15Step + "前" );
                        break;

                    case 'HC16':
                        if ( HCStep.HC16Step <= 0.025 ) {
                            obj.rotateY( -0.10 );
                            HCStep.HC16Step = HCStep.HC16Step + 0.001;
                        }
                        console.log( HCStep.HC16Step + "前" );
                        break;

                    case 'HC18':
                        if ( HCStep.HC18Step <= 0.025 ) {
                            obj.rotateY( -0.10 );
                            JCStep.HC18Step = HCStep.HC18Step + 0.001;
                        }
                        console.log( HCStep.HC18Step + "前" );
                        break;

                    case 'HB7':
                        if ( HBStep.HB7Step <= 0.025 ) {
                            obj.rotateY( -0.10 );
                            HBStep.HB7Step = HBStep.HB7Step + 0.001;
                        }
                        console.log( HBStep.HB7Step + "前" );
                        break;

                    case 'HB9':
                        if ( HBStep.HB9Step <= 0.025 ) {
                            obj.rotateY( -0.10 );
                            HBStep.HB9Step = HBStep.HB9Step + 0.001;
                        }
                        console.log( HBStep.HB9Step + "前" );
                        break;

                    default:
                        break;
                }
            }
        }
        if ( flag == 'sub' ) {

            if ( obj != null ) {
                var opName = obj.name;
                switch ( opName ){
                    case 'HC24':
                        if ( HCStep.HC24Step >= -0.025 ) {
                            obj.rotateX( -0.10 );
                            HCStep.HC24Step = HCStep.HC24Step - 0.001;
                        }
                        console.log( HCStep.HC24Step + "后" );
                        break;

                    case 'HC15':
                        if ( HCStep.HC15Step >= -0.025 ) {
                            obj.rotateY( 0.10 );
                            HCStep.HC15Step = HCStep.HC15Step - 0.001;
                        }
                        console.log( HCStep.HC15Step + "后" );
                        break;

                    case 'HC16':
                        if ( HCStep.HC16Step >= -0.025 ) {
                            obj.rotateY( 0.10 );
                            HCStep.HC16Step = HCStep.HC16Step - 0.001;
                        }
                        console.log( HCStep.HC16Step + "后" );
                        break;

                    case 'HC18':
                        if ( HCStep.HC18Step >= -0.025 ) {
                            obj.rotateY( 0.10 );
                            HCStep.HC18Step = HCStep.HC18Step - 0.001;
                        }
                        console.log( HCStep.HC18Step + "后" );
                        break;

                    case 'HB7':
                        if ( HBStep.HB7Step >= -0.025 ) {
                            obj.rotateY( 0.10 );
                            HBStep.HB7Step = HBStep.HB7Step - 0.001;
                        }
                        console.log( HBStep.HB7Step + "后" );
                        break;

                    case 'HB9':
                        if ( HBStep.HB9Step >= -0.025 ) {
                            obj.rotateY( 0.10 );
                            HBStep.HB9Step = HBStep.HB9Step - 0.001;
                        }
                        console.log( HBStep.HB9Step + "后" );
                        break;

                    default:
                        break;
                }
            }
        }
    }
}
Viewer.kaiGuanBehindButton.prototype = {
    constructor: Viewer.kaiGuanBehindButton,
}
var beHindChild = new Viewer.kaiGuanBehindButton();