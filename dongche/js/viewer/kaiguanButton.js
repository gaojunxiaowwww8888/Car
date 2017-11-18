/**
 * Created by 京美电子 on 2017/11/2.
 */
Viewer.kaiguanButton = function () {
    this.createAbt = function ( obj ) {
        var meshName = obj.name.substr( 0, 1 );
        var oPName = obj.name.substr( 0, 2 );

        if ( meshName == 'Q' ) {
            if ( oPName == 'QA' ) {
                this.qAButton( obj );
            } else if ( oPName == 'QG' || oPName == 'QB' ) {
                this.qGButton( obj );
            } else  if ( oPName == 'QF' ) {
                this.qFButton( obj );
            }
        } else if (  meshName == 'H'  ) {
            //调用后驾驶室的方法
            beHindChild.initChild( obj );
        }
    }

    //设置A按钮的操作
    this.qAButton = function ( obj ) {
        var opName = obj.name;
       for ( var i=0; i< QAButton.length; i++ ) {
           if ( opName == QAButton[i].name ) {
               if ( QAButton[i].A1tag) {
                   obj.rotateZ( -0.765 );
                   QAButton[i].A1tag = false;
               } else if( !QAButton[i].A1tag ){
                   obj.rotateZ( 0.765 );
                   QAButton[i].A1tag = true;
               }
           }
       }
    }

    //设置G开关的操作方法
    this.qGButton = function ( obj ) {
        var opName = obj.name;
        for ( var i=0; i< QGButton.length; i++ ) {
            if ( opName == QGButton[i].name && opName != 'QG25' && opName != 'QB8' ) {
                if ( QGButton[i].G1tag ) {
                    obj.rotateX( 1.53 );
                    QGButton[i].G1tag = false;
                } else if( !QGButton[i].G1tag ){
                    obj.rotateX( -1.53 );
                    QGButton[i].G1tag = true;
                }
            } else if( opName == 'QB8' ){
                if ( QGButton[i].B1tag ) {
                    obj.rotateY( 1.58 );
                    QGButton[i].B1tag = false;
                } else if( !QGButton[i].B1tag ){
                    obj.rotateY( -1.58 );
                    QGButton[i].B1tag = true;
                }
            }
        }
    }

    //设置F开关的操作
    this.qFButton =function ( obj ) {
        var opName = obj.name;
        for ( var i=0; i< QFButton.length; i++ ) {
            if ( opName == 'QF3' ) {
                if ( QFButton[i].F1tag ) {
                    obj.rotateZ( 0.034 );
                    QFButton[i].F1tag = false;
                } else if( !QFButton[i].F1tag ){
                    obj.rotateZ( -0.034 );
                    QFButton[i].F1tag = true;
                }
            } else if ( opName == QFButton[i].name && opName != 'QF3' ) {
                if ( QFButton[i].F1tag ) {
                    obj.rotateZ( 1.53 );
                    QFButton[i].F1tag = false;
                } else if( !QFButton[i].F1tag ){
                    obj.rotateZ( -1.53 );
                    QFButton[i].F1tag = true;
                }
            }
        }
    }
    
    //设置C开关的操作
    this.cButton = function ( obj, flag ) {
        if ( flag == 'add') {
            if ( obj != null) {
                var opName = obj.name;
                switch ( opName ){
                    case  'QC6':
                        if ( QCStep.QC6Step <= 0.09 ) {
                            obj.rotateOnAxis( new THREE.Vector3( 0,0,1 ), 0.05 );
                            QCStep.QC6Step =  QCStep.QC6Step + 0.01;
                            console.log( '加' + QCStep.QC6Step );
                        }
                        break;

                    case  'QC7':
                        if ( QCStep.QC7Step >= 0.008 ) {
                            obj.rotateOnAxis( new THREE.Vector3( 0,0,1 ), 0.05 );
                            QCStep.QC7Step =  QCStep.QC7Step - 0.01;
                            console.log( '加' + QCStep.QC7Step );
                        }
                        break;

                    case  'QC8':
                        if ( QCStep.QC8Step <= 0.11 ) {
                            obj.rotateOnAxis( new THREE.Vector3( 1,0,0 ), -0.05 );
                            QCStep.QC8Step =  QCStep.QC8Step + 0.01;
                            console.log( '加' + QCStep.QC8Step );
                        }
                        break;

                    case  'QC9':
                        if ( QCStep.QC9Step <= 0.09 ) {
                            obj.rotateOnAxis( new THREE.Vector3( 1,0,0 ), -0.05 );
                            QCStep.QC9Step =  QCStep.QC9Step + 0.01;
                            console.log( '加' + QCStep.QC9Step );
                        }
                        break;

                    case  'QC10':
                        if ( QCStep.QC10Step <= 0.09 ) {
                            obj.rotateOnAxis( new THREE.Vector3( 1,0,0 ), -0.05 );
                            QCStep.QC10Step =  QCStep.QC10Step + 0.01;
                            console.log( '加' + QCStep.QC10Step );
                        }
                        break;

                    case  'QC11':
                        if ( QCStep.QC11Step <= 0.09 ) {
                            obj.rotateOnAxis( new THREE.Vector3( 1,0,0 ), -0.05 );
                            QCStep.QC11Step =  QCStep.QC11Step + 0.01;
                            console.log( '加' + QCStep.QC11Step );
                        }
                        break;

                    case  'QC12':
                        if ( QCStep.QC12Step <= 0.09 ) {
                            obj.rotateOnAxis( new THREE.Vector3( 1,0,0 ), -0.05 );
                            QCStep.QC12Step =  QCStep.QC12Step + 0.01;
                            console.log( '加' + QCStep.QC12Step );
                        }
                        break;

                    case  'QC14':
                        if ( QCStep.QC14Step <= 0.11 ) {
                            obj.rotateOnAxis( new THREE.Vector3( 1,0,0 ), -0.05 );
                            QCStep.QC14Step =  QCStep.QC14Step + 0.015;
                            console.log( '加' + QCStep.QC14Step );
                        }
                        break;

                    case  'QC13':
                        if ( QCStep.QC13Step <= 0.11 ) {
                            obj.rotateOnAxis( new THREE.Vector3( 1,0,0 ), -0.05 );
                            QCStep.QC13Step =  QCStep.QC13Step + 0.015;
                            console.log( '加' + QCStep.QC13Step );
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
                    case  'QC6':
                        if ( QCStep.QC6Step >= -0.08 ) {
                            obj.rotateOnAxis( new THREE.Vector3( 0,0,1 ), -0.05 );
                            QCStep.QC6Step =  QCStep.QC6Step - 0.01;
                            console.log( '减' + QCStep.QC6Step );
                        }
                        break;

                    case  'QC7':
                        if ( QCStep.QC7Step <= 0.11 ) {
                            obj.rotateOnAxis( new THREE.Vector3( 0,0,1 ), -0.05 );
                            QCStep.QC7Step =  QCStep.QC7Step + 0.01;
                            console.log( '减' + QCStep.QC7Step );
                        }
                        break;

                    case  'QC8':
                        if ( QCStep.QC8Step >= -0.04 ) {
                            obj.rotateOnAxis( new THREE.Vector3( 1,0,0 ), 0.05 );
                            QCStep.QC8Step =  QCStep.QC8Step - 0.01;
                            console.log( '减' + QCStep.QC8Step );
                        }
                        break;

                    case  'QC9':
                        if ( QCStep.QC9Step >= -0.08 ) {
                            obj.rotateOnAxis( new THREE.Vector3( 1,0,0 ), 0.05 );
                            QCStep.QC9Step =  QCStep.QC9Step - 0.01;
                            console.log( '减' + QCStep.QC9Step );
                        }
                        break;

                    case  'QC10':
                        if ( QCStep.QC10Step >= -0.08 ) {
                            obj.rotateOnAxis( new THREE.Vector3( 1,0,0 ), 0.05 );
                            QCStep.QC10Step =  QCStep.QC10Step - 0.01;
                            console.log( '减' + QCStep.QC10Step );
                        }
                        break;

                    case  'QC11':
                        if ( QCStep.QC11Step >= -0.08 ) {
                            obj.rotateOnAxis( new THREE.Vector3( 1,0,0 ), 0.05 );
                            QCStep.QC11Step =  QCStep.QC11Step - 0.01;
                            console.log( '减' + QCStep.QC11Step );
                        }
                        break;

                    case  'QC12':
                        if ( QCStep.QC12Step >= -0.08 ) {
                            obj.rotateOnAxis( new THREE.Vector3( 1,0,0 ), 0.05 );
                            QCStep.QC12Step =  QCStep.QC12Step - 0.01;
                            console.log( '减' + QCStep.QC12Step );
                        }
                        break;

                    case  'QC14':
                        if ( QCStep.QC14Step >= -0.18 ) {
                            obj.rotateOnAxis( new THREE.Vector3( 1,0,0 ), 0.05 );
                            QCStep.QC14Step =  QCStep.QC14Step - 0.015;
                            console.log( '减' + QCStep.QC14Step );
                        }
                        break;

                    case  'QC13':
                        if ( QCStep.QC13Step >= -0.18 ) {
                            obj.rotateOnAxis( new THREE.Vector3( 1,0,0 ), 0.05 );
                            QCStep.QC13Step =  QCStep.QC13Step - 0.015;
                            console.log( '减' + QCStep.QC13Step );
                        }
                        break;

                    default:
                        break;
                }
            }
        }
    }

    this.modeRotate = function ( obj, flag ) {
        if ( flag == 'add' ) {
            if ( obj != null ) {
                var opName = obj.name;
                switch ( opName ){
                    case 'QC24':
                        if ( QCStep.QC24Step <= 0.025 ) {
                            obj.rotateX( 0.10 );
                            QCStep.QC24Step =  QCStep.QC24Step + 0.001;
                        }
                        console.log( QCStep.QC24Step + "前" );
                        break;

                    case 'QC23':
                        if ( QCStep.QC23Step <= 0.02 ) {
                            obj.rotateY( 0.02 );
                            modeMesh.meshQC23.rotateY( 0.02 );
                            QCStep.QC23Step =  QCStep.QC23Step + 0.001;
                        }
                        console.log( QCStep.QC23Step + "前" );
                        break;

                    case 'QC15':
                        if ( QCStep.QC15Step <= 0.025 ) {
                            obj.rotateY( -0.10 );
                            QCStep.QC15Step =  QCStep.QC15Step + 0.001;
                        }
                        console.log( QCStep.QC15Step + "前" );
                        break;

                    case 'QC16':
                        if ( QCStep.QC16Step <= 0.025 ) {
                            obj.rotateY( -0.10 );
                            QCStep.QC16Step =  QCStep.QC16Step + 0.001;
                        }
                        console.log( QCStep.QC16Step + "前" );
                        break;

                    case 'QC18':
                        if ( QCStep.QC18Step <= 0.025 ) {
                            obj.rotateY( -0.10 );
                            QCStep.QC18Step =  QCStep.QC18Step + 0.001;
                        }
                        console.log( QCStep.QC18Step + "前" );
                        break;

                    case 'QB7':
                        if ( QBStep.QB7Step <= 0.025 ) {
                            obj.rotateY( -0.10 );
                            QBStep.QB7Step =  QBStep.QB7Step + 0.001;
                        }
                        console.log( QBStep.QB7Step + "前" );
                        break;

                    case 'QB9':
                        if ( QBStep.QB9Step <= 0.025 ) {
                            obj.rotateY( -0.10 );
                            QBStep.QB9Step =  QBStep.QB9Step + 0.001;
                        }
                        console.log( QBStep.QB9Step + "前" );
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
                    case 'QC24':
                        if ( QCStep.QC24Step >= -0.025 ) {
                            obj.rotateX( -0.10 );
                            QCStep.QC24Step =  QCStep.QC24Step - 0.001;
                        }
                        console.log( QCStep.QC24Step + "后" );
                        break;

                    case 'QC23':
                        if ( QCStep.QC23Step >= -0.02 ) {
                            obj.rotateY( -0.02 );
                            modeMesh.meshQC23.rotateY( -0.02 );
                            QCStep.QC23Step =  QCStep.QC23Step - 0.001;
                        }
                        console.log( QCStep.QC23Step + "后" );
                        break;

                    case 'QC15':
                        if ( QCStep.QC15Step >= -0.025 ) {
                            obj.rotateY( 0.10 );
                            QCStep.QC15Step =  QCStep.QC15Step - 0.001;
                        }
                        console.log( QCStep.QC15Step + "后" );
                        break;

                    case 'QC16':
                        if ( QCStep.QC16Step >= -0.025 ) {
                            obj.rotateY( 0.10 );
                            QCStep.QC16Step =  QCStep.QC16Step - 0.001;
                        }
                        console.log( QCStep.QC16Step + "后" );
                        break;

                    case 'QC18':
                        if ( QCStep.QC18Step >= -0.025 ) {
                            obj.rotateY( 0.10 );
                            QCStep.QC18Step =  QCStep.QC18Step - 0.001;
                        }
                        console.log( QCStep.QC18Step + "后" );
                        break;

                    case 'QB7':
                        if ( QBStep.QB7Step >= -0.025 ) {
                            obj.rotateY( 0.10 );
                            QBStep.QB7Step = QBStep.QB7Step - 0.001;
                        }
                        console.log( QBStep.QB7Step + "后" );
                        break;

                    case 'QB9':
                        if ( QBStep.QB9Step >= -0.025 ) {
                            obj.rotateY( 0.10 );
                            QBStep.QB9Step = QBStep.QB9Step - 0.001;
                        }
                        console.log( QBStep.QB9Step + "后" );
                        break;

                    default:
                        break;
                }
            }
        }
    }
}

Viewer.kaiguanButton.prototype = {
    constructor: Viewer.kaiguanButton,

    initAbt: function ( obj ) {
        this.createAbt( obj );
        this.cButton(obj);
    }
}

var kaiguanbt = new Viewer.kaiguanButton();