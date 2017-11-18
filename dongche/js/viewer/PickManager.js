/**
 * Created by 京美电子 on 2017/5/15.
 */

var pickMgr;
Viewer.PickManager = function( scene, camera ){

    this.scene = scene;
    this.camera = camera;
    this.arrayMaterial = [];
    this.arrayMesh = [];
    this.shown = false;
    this.picking = false;
    pickMgr = this;

    this.highlightMat = new THREE.MeshPhongMaterial({
        color: 0x00ff00, specular: 0x111111, shininess: 50
    });

    //鼠标的点击事件
    window.addEventListener('mousedown', this.MouseDown, false);
    window.addEventListener('mousemove', this.MouseMove, false);

    this.materialRecover = function ( arrayMesh ) {

       if ( arrayMesh.length > 0 ) {

           for ( var i=0; i < arrayMesh.length; i++ ) {

               arrayMesh[i].material = this.arrayMaterial[i];
           }
       }
    }
}

Viewer.PickManager.prototype = {

    constructor: Viewer.PickManager,

    init: function () {

        pickMgr.picking = true;
        setCamera( 'picked' );

    },

    MouseDown: function ( e ) {

        if ( e.target && e.target.tagName == "CANVAS" ) {
            var _mousePt = new THREE.Vector2();
            _mousePt.x = ( e.offsetX / container.clientWidth ) * 2 - 1;
            _mousePt.y = -( e.offsetY / container.clientHeight ) * 2 + 1;

            var raycaster = new THREE.Raycaster();
            raycaster.setFromCamera( _mousePt, camera );

            var interObjs = raycaster.intersectObject( scene, true );
            //恢复原来的材质
            if ( pickManager.arrayMesh.length != 0 ) {

                pickManager.materialRecover( pickManager.arrayMesh );

            }

            if ( interObjs.length > 0 ) {

                var parentObj = interObjs[0].object.parent;
                if ( parentObj.children.length > 0 ) {
                    for ( var i = 0; i< parentObj.children.length; i++ ) {

                        if ( pickMgr.picking ) {

                            pickManager.arrayMesh[i] = parentObj.children[i];
                            pickManager.arrayMaterial[i] = parentObj.children[i].material;
                            parentObj.children[i].material = pickManager.highlightMat;

                        }
                    }
                }
            }

            if ( interObjs.length > 0 && pickMgr.picking ) {
                //创建属性窗口
                atrributeManager.initForm( interObjs[0].object.name );

            } else {

                $("#wp_property").css( "display", "none" );

            }
        }
    },

    MouseMove: function ( e ) {

        var thisx = e.offsetX;
        var thisy = e.offsetY;
        var hiddentips = true;
        var tips = null;
        var mousePt = new THREE.Vector2();
        if (e.target && e.target.tagName == "CANVAS")
        {
            var _mousePt = new THREE.Vector2();
            _mousePt.x = ( thisx / container.clientWidth ) * 2 - 1;
            _mousePt.y = -( thisy / container.clientHeight ) * 2 + 1;

            var raycaster = new THREE.Raycaster();
            raycaster.setFromCamera( _mousePt, camera );

            var interObjs = raycaster.intersectObject( scene, true );
            var interObjName = "";
            if ( interObjs.length > 0 ) {
                interObjName = interObjs[0].object.name;
            }

            if ( interObjs[0] ) {
                tips = document.getElementById('tips');
                if (tips == null) {
                    tips = document.createElement('div');
                    tips.setAttribute('id', 'tips');
                    container.appendChild(tips);
                }

                tips.style.left = thisx + 20 + 'px';
                tips.style.top = thisy - 20 + 'px';
                tips.innerText = interObjName;
                hiddentips = false;
            }
        }

        if ( hiddentips ) {

            tips = document.getElementById( 'tips' );
            if (tips) {
                tips.innerText = "";
            }
        }

        mousePt.x = e.offsetX;
        mousePt.y = e.offsetY;
    }
}

// Viewer.PickManager.prototype.event = new EventSource();
var pickManager = new Viewer.PickManager();