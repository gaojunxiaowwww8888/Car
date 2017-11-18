/**
 * Created by 京美电子 on 2017/7/3.
 */
Viewer.PickMesh = function ( scene, camera ) {
    
    this.scene = scene;
    this.camera = camera;
    var scope = this;
    scope.movingadd;
    scope.movingsub;
    var point = new THREE.Vector3(), pickMesh;
    var mouseMoveY, mouseMoveX;
    var highlightMat = new THREE.MeshPhongMaterial({
        color: 0x00ff00, specular: 0xfaf7f7, shininess: 45, shading: THREE.SmoothShading
    });
    var highlightMathy = new THREE.MeshPhongMaterial({
        color: 0x00ff00, specular: 0xfaf7f7, shininess: 45, shading: THREE.SmoothShading
    });

    var findmodel = new THREE.MeasurementGizmoMaterial( { color: 0xff0000, opacity: 0.4 } );
    var matMeshMaterial, matMesh,open = true;

    //创建模型的点击事件
    document.addEventListener( 'mousedown', onMouseDown, false );
    document.addEventListener( 'mousemove', onMouseMove, false );
    document.addEventListener( 'mouseup', onMouseUp, false );

    function onMouseDown( e ) {
        if ( e.button != 0 ) return;
        if ( e.target && e.target.tagName == "CANVAS" ) {
            if ( wgtag ){
                spotLighttag = true;
            }
            var movementX = e.movementX || e.mozMovementX || e.webkitMovementX || 0;
            var movementY = e.movementY || e.mozMovementY || e.webkitMovementY || 0;

            var _mousePt = new THREE.Vector2();
            _mousePt.x = ( e.offsetX / container.clientWidth ) * 2 - 1;
            _mousePt.y = -( e.offsetY / container.clientHeight ) * 2 + 1;
            var raycaster = new THREE.Raycaster();
            if ( camera != undefined ) {
                raycaster.setFromCamera( _mousePt, camera );
            }
            var interObjs = raycaster.intersectObjects( Agroup, true );
            if ( interObjs.length > 0 ) {
                control.enabled = false;
                document.body.style.cursor = "url(./res/toolbar/pan3.png),auto";
                mouseMoveY = e.offsetY;
                mouseMoveX = e.offsetX;
                pickMesh = interObjs[0].object;
                handclick = true;

                kaiguanbt.initAbt( interObjs[0].object );

                var toTop = container.getBoundingClientRect().top + document.body.scrollTop; //兼容滚动条
                var x = e.pageX - container.getBoundingClientRect().left - w / 2; //获取当前鼠标的x轴位置（相对于这个li的中心点）
                var y = e.pageY - toTop - h / 2; ////获取当

                var res = Math.atan2(y, x) / (Math.PI / 180) + 180;
                dir = res;
            }
        }
    }

    function  onMouseMove( e ) {
        xzflag = false;

        if ( e.button != 0 ) return;
        if ( e.target && e.target.tagName == "CANVAS" ) {
            var vector= new THREE.Vector3();
            var _mousePt = new THREE.Vector2();
            _mousePt.x = ( e.offsetX / container.clientWidth ) * 2 - 1;
            _mousePt.y = -( e.offsetY / container.clientHeight ) * 2 + 1;

            var raycaster = new THREE.Raycaster();
            if ( camera != undefined ) {
                raycaster.setFromCamera( _mousePt, camera );
            }
            var interObjs = raycaster.intersectObjects( Agroup, true );

            if ( interObjs.length > 0 ) {
                scope.movingadd = 'add';
                scope.movingsub = 'sub';
                var pickName = interObjs[0].object.name.substr( 0, 1 );
                var pickNameQC = interObjs[0].object.name.substr( 0, 2 );

                if ( pickName == 'Q' || pickName == 'H' ) {

                    if ( handclick ) {
                        document.body.style.cursor = "url(./res/toolbar/pan3.png),auto";
                    } else {
                        document.body.style.cursor = "url(./res/toolbar/pan.png),auto";
                    }

                    var toTop = container.getBoundingClientRect().top + document.body.scrollTop; //兼容滚动条
                    var x = e.pageX - container.getBoundingClientRect().left - w / 2; //获取当前鼠标的x轴位置（相对于这个li的中心点）
                    var y = e.pageY - toTop - h / 2; ////获取当
                    var res = Math.atan2(y, x) / (Math.PI / 180) + 180;

                    // if ( dir < res ) {
                    //     // kaiguanbt.modeRotate( pickMesh, scope.movingsub );
                    //     dir = res;
                    // } if(  dir > res ){
                    //     kaiguanbt.modeRotate( pickMesh, scope.movingadd );
                    //     dir = res;
                    // }

                    if ( mouseMoveX > e.offsetX ) {
                        kaiguanbt.modeRotate( pickMesh, scope.movingadd );
                        beHindChild.hModeRotate( pickMesh, scope.movingadd );
                    } if ( mouseMoveX < e.offsetX ) {
                        kaiguanbt.modeRotate( pickMesh, scope.movingsub );
                        beHindChild.hModeRotate( pickMesh, scope.movingsub );
                    }
                    console.log( mouseMoveX +  ':' + e.offsetX );

                    if ( pickNameQC == 'QC'|| pickNameQC == 'HC' ) {
                        if (  mouseMoveY > e.offsetY ) {
                            kaiguanbt.cButton( pickMesh, scope.movingadd );
                            beHindChild.hCButton( pickMesh, scope.movingadd );
                            mouseMoveY = e.offsetY;

                        } if (  mouseMoveY < e.offsetY ) {
                            kaiguanbt.cButton( pickMesh, scope.movingsub );
                            beHindChild.hCButton( pickMesh, scope.movingsub );
                            mouseMoveY = e.offsetY;
                        }
                    }

                    // if ( interObjs[0].object.name == 'A8' ) {
                    //     if ( mouseMoveX > e.offsetX ) {
                    //         modeRoate( pickMesh, scope.movingsub );
                    //     }
                    //     if (  mouseMoveX < e.offsetX  ) {
                    //         modeRoate( pickMesh, scope.movingadd );
                    //     }
                    // }
                    //
                    // if (  mouseMoveY > e.offsetY ) {
                    //     aOperate( pickMesh, scope.movingadd );
                    //     mouseMoveY = e.offsetY;
                    // }
                    //
                    // if (  mouseMoveY < e.offsetY ) {
                    //     aOperate( pickMesh, scope.movingsub );
                    //     mouseMoveY = e.offsetY;
                    // }
                } else {
                    document.body.style.cursor = "default";
                }

            } else {
                document.body.style.cursor = "default";
            }

            //鼠标移动是显示名称
           showName( interObjs[0], e );
        }
    }

    function onMouseUp() {
        spotLighttag = false;
        scope.movingadd = null;
        scope.movingsub = null;
        pickMesh = null;
        point = null;
        handclick = false;
        if ( control != undefined ) {
            control.enabled = true;
        }
    }

    //鼠标移动是显示mesh的名称
    function  showName( interObjs, e ) {

        var thisx = e.offsetX;
        var thisy = e.offsetY;
        var hiddentips = true;
        var tips = null;

        if ( interObjs ) {
            matMeshMaterial = interObjs.object.material;
            matMesh = interObjs.object;
            tips = document.getElementById('tips');
            if ( tips == null ) {
                tips = document.createElement('div');
                tips.setAttribute('id', 'tips');
                container.appendChild(tips);
            }

            tips.style.left = thisx + 20 + 'px';
            tips.style.top = thisy - 20 + 'px';
            tips.innerText = interObjs.object.name;

            interObjs.object.material.specular = highlightMat.specular;
            interObjs.object.material.shading = THREE.SmoothShading;
            interObjs.object.material.shininess = 20;
            hiddentips = false;
        }

        if (hiddentips) {
            tips = document.getElementById('tips');
            if (tips) {
                tips.innerText = "";
            }
            if( matMesh != undefined ){
               for ( var i = 0; i< materialArray.length; i++ ){
                   if ( matMesh.name == materialArray[i][0].name ) {
                       matMesh.material.specular = highlightMathy.specular;
                       matMesh.material.shading = THREE.SmoothShading;
                       matMesh.material.shininess = 10;
                   }
               }
            }
        }
    }
}

Viewer.PickMesh.prototype = {

    constructor: Viewer.PickMesh,
    init:function () {
        
    }
}

var pickMesh = new Viewer.PickMesh();
