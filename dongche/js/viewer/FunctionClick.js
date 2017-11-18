/**
 * Created by 京美电子 on 2017/10/17.
 */
Viewer.FunctionClick = function () {

    this.initClick = function () {

        //外观预览的功能按钮
        $('#jcgw').click(function () {
            control.enableZoom = true;
            Viewer.jcqxflag = false;
            Viewer.qbflag = false;
            Viewer.hbflag = false;
            wgtag = true;
            control.target.set( 0, 0, 0 );
            camera.position.set( 0, 0, 200 );
            control.rotateSpeed = 2.0;
            control.zoomSpeed = 2.0;
            control.panSpeed = 3.0;
            control.maxPolarAngle = Math.PI / 2.2;
            Viewer.tiegui.position.set( -21, 0, -4000 );
            Viewer.tiegui.visible = true;
            Viewer.tieguizx.visible = false;
            Viewer.dongcheMode.position.set( -10, 0, 0 );
            wg = false;
        });

        //动车驾驶室前部的功能按钮
        $('#qb').click(function () {
            xzflag = false;
            control.enableZoom = false;
            wgtag = false;
            Viewer.qbflag = true;
            Viewer.hbflag = false;
            Viewer.jssjflag = false;
            Viewer.jcqxflag = false;
            control.target.set( -9.0, 30, -133 );
            camera.position.set( -9.0, 30, -132.5 );
            control.rotateSpeed = 0.5;
            control.maxPolarAngle = 2 * Math.PI;
            control.zoomSpeed = 2.0;
            control.panSpeed = 20.0;
            camera.rotation.y = -132.5;
            Viewer.tiegui.position.set( -21, 0, -4000 );
            Viewer.tiegui.visible = true;
            Viewer.dongcheMode.position.set( -10, 0, 0 );
            Viewer.tieguizx.visible = false;
            wg = false;
        });

        //动车驾驶室后部
        $('#hb').click(function () {
            xzflag = false;
            control.enableZoom = false;
            wgtag = false;
            Viewer.hbflag = true;
            Viewer.qbflag = false;
            Viewer.jssjflag = false;
            Viewer.jcqxflag = false;
            control.target.set( -9.3, 30, 130 );
            camera.position.set( -9.3, 30, 129 );
            control.rotateSpeed = 0.5;
            control.maxPolarAngle = 2 * Math.PI;
            control.zoomSpeed = 2.0;
            control.panSpeed = 20.0;
            camera.rotation.y = 129;
            Viewer.tiegui.position.set( -21, 0, -4000 );
            Viewer.tiegui.visible = true;
            Viewer.tieguizx.visible = false;
            Viewer.dongcheMode.position.set( -10, 0, 0 );
            wg = false;
        });

        //机车外观预览的功能按钮
        $('#wg').click(function () {
            xzflag = true;
            control.enableZoom = true;
            Viewer.jcqxflag = false;
            Viewer.qbflag = false;
            Viewer.hbflag = false;
            wgtag = true;
            control.target.set( 0, 0, 0 );
            camera.position.set( 0, 0, 200 );
            control.rotateSpeed = 2.0;
            control.zoomSpeed = 2.0;
            control.panSpeed = 3.0;
            control.maxPolarAngle = Math.PI / 2.2;
            Viewer.tieguizx.position.set( -32, 0, -4000 );
            Viewer.tieguizx.visible = true;
            Viewer.tiegui.visible = false;
            Viewer.dongcheMode.position.set( -10, 0, 0 );
            wg = true;
            out = 0;

        });

        //动车行驶的功能按钮
        $('#jcxs').click(function () {
            xzflag = false;
            control.enableZoom = false;
            Viewer.jcqxflag = true;
            wgtag = false;
            Viewer.qbflag = false;
            Viewer.hbflag = false;
            Viewer.jssjflag = false;
            control.target.set( -9.0, 30, -133 );
            camera.position.set( -9.0, 30, -132.5 );
            control.rotateSpeed = 0.5;
            control.maxPolarAngle = 2 * Math.PI;
            control.zoomSpeed = 2.0;
            control.panSpeed = 20.0;
            camera.rotation.y = -132.5;
            pos = 0;
            Viewer.tieguizx.visible = true;
            wg = false;

        });

        //属性窗口的界面功能按钮
        $('#sx').click(function () {
            atrributeManager.initForm();
        });
    }
}

Viewer.FunctionClick.prototype = {

    constructor: Viewer.FunctionClick,
    initFunction: function () {
        fclick.initClick();
    }
}

var fclick = new Viewer.FunctionClick();