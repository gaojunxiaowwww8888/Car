/**
 * Created by 京美电子 on 2017/10/23.
 */
Viewer.DrawDongcheWay = function () {

    this.drawWay = function () {

        this.addSphereGeometry();
        curvefx = new THREE.SplineCurve3([
            new THREE.Vector3( -10, 0, -5000 ),
            new THREE.Vector3( -10, 0, -100 ),
        ]);

        curve = new THREE.SplineCurve3([

            new THREE.Vector3( -10, 0, -100 ),
            new THREE.Vector3( -10, 0, -5000 ),
            // new THREE.Vector3( -10, 0, 100 ),
            // new THREE.Vector3( -10, 0, -550 ),
            // new THREE.Vector3( -9, 0, -700 ),
            // new THREE.Vector3( -11.5, 0, -850 ),
            // new THREE.Vector3( -11, 0, -950 ),
            // new THREE.Vector3( -15, 0, -980 ),
            // new THREE.Vector3( -11, 0, -1000 ),
            // new THREE.Vector3( -11, 0, -1150 ),
            // new THREE.Vector3( -10, 0, -1300 ),
            // new THREE.Vector3( -11, 0, -1450 ),
            // new THREE.Vector3( -10, 0, -1600 ),
            // new THREE.Vector3( -9, 0, -1750 ),
            //
            // new THREE.Vector3( -12, 0, -1370 ),
            // new THREE.Vector3( -13, 0, -1400 ),
            // new THREE.Vector3( -14, 0, -1450 ),
            // new THREE.Vector3( -15, 0, -1480 ),
            // new THREE.Vector3( -16, 0, -1400 ),
            // new THREE.Vector3( -17, 0, -1450 ),
            // new THREE.Vector3( -18, 0, -1500 ),
            // new THREE.Vector3( -19, 0, -1550 ),
            // new THREE.Vector3( -20, 0, -1600 ),
            //
            //
            // new THREE.Vector3( -21, 0, -1650 ),
            // new THREE.Vector3( -22, 0, -1680 ),
            // new THREE.Vector3( -23, 0, -1700 ),
            // new THREE.Vector3( -24, 0, -1750 ),
            // new THREE.Vector3( -25, 0, -1780 ),
            // new THREE.Vector3( -26, 0, -1800 ),
            // new THREE.Vector3( -27, 0, -1850 ),
            // new THREE.Vector3( -28, 0, -1880 ),
            // new THREE.Vector3( -29, 0, -2000 ),


            // new THREE.Vector3( -30, 0, -1500 ),
            // new THREE.Vector3( -16, 0, -1600 ),
            // new THREE.Vector3( -1, 0, -1700 ),
            // new THREE.Vector3( -20, 0, -2000 ),
            // new THREE.Vector3( -17, 0, -1600 ),

            // new THREE.Vector3(  -2, 0, -3985.9 ),
            // new THREE.Vector3(  -5, 0, -4274.81 ),
            // new THREE.Vector3(  -8, 0, -4563.68 ),
            // new THREE.Vector3(  -8, 0, -4850.05 ),
            // new THREE.Vector3(  -8, 0, -5133.7 ),

            // new THREE.Vector3(  -10, 0, -5427.31 ),
            // new THREE.Vector3(  -10, 0, -5716.23 ),
            // new THREE.Vector3(  -10, 0, -6002.6 ),
            // new THREE.Vector3(  -10, 0, -6291.46 ),
            // new THREE.Vector3(  -10, 0, -6580.38 ),

        ]);

        curveq = new THREE.SplineCurve3([

            new THREE.Vector3( -10, 0, 540 ),
            new THREE.Vector3( -10, 0, 250 ),
            new THREE.Vector3( -10, 0, -40 ),
            new THREE.Vector3( -10, 0, -300 ),
            new THREE.Vector3( -10, 0, -600 ),

            new THREE.Vector3( -10, 0, -700 ),
            new THREE.Vector3( -15, 0, -800 ),
            new THREE.Vector3( -17, 0, -900 ),
            new THREE.Vector3( -20, 0, -1000 ),
            new THREE.Vector3( -24, 0, -1100 ),

            new THREE.Vector3( -26, 0, -1200 ),
            new THREE.Vector3( -27, 0, -1300 ),
            new THREE.Vector3( -28, 0, -1400 ),
            new THREE.Vector3( -30, 0, -1500 ),
            new THREE.Vector3( -32, 0, -1600 ),

            new THREE.Vector3(  -33, 0, -1700 ),
            new THREE.Vector3(  -34, 0, -1800 ),
            new THREE.Vector3(  -35, 0, -1900 ),
            new THREE.Vector3(  -34, 0, -2000 ),
            new THREE.Vector3(  -32, 0, -2100 ),

            new THREE.Vector3( -33, 0, -2200 ),
            new THREE.Vector3( -30, 0, -2400 ),
            new THREE.Vector3( -28, 0, -2600 ),
            new THREE.Vector3( -26, 0, -2700 ),
            new THREE.Vector3( -23, 0, -2800 ),

            new THREE.Vector3(  -21, 0, -2900 ),
            new THREE.Vector3(  -20, 0, -3000 ),
            new THREE.Vector3(  -17, 0, -3100 ),
            new THREE.Vector3(  -16, 0, -3200 ),
            new THREE.Vector3(  -14, 0, -3300 ),

            new THREE.Vector3( -12, 0, -3400 ),
            new THREE.Vector3( -10, 0, -3500 ),
            new THREE.Vector3( -7, 0, -3600 ),
            new THREE.Vector3( -5, 0, -3800 ),
            new THREE.Vector3( -3, 0, -4000 ),

            new THREE.Vector3( -1, 0, -4300 ),
            new THREE.Vector3( 4, 0, -4500 ),
            new THREE.Vector3( 5, 0, -4800 ),
            new THREE.Vector3( 6, 0, -5000 ),

            new THREE.Vector3( 5, 0, -5200 ),
            new THREE.Vector3( 4, 0, -5500 ),
            new THREE.Vector3( 3, 0, -5800 ),
            new THREE.Vector3( -2, 0, -6000 ),
            new THREE.Vector3( -5, 0, -6500 ),
            new THREE.Vector3( -7, 0, -6800 ),

            new THREE.Vector3( -10, 0, -7000 ),
            new THREE.Vector3( -9, 0, -8500 ),

        ]);

        curvezx = new THREE.SplineCurve3([

            new THREE.Vector3( -9, 0, -8600 ),
            new THREE.Vector3( -9, 0, -8700 ),
            new THREE.Vector3( -9, 0, -8800 ),
            new THREE.Vector3( -9, 0, -10000 ),

        ]);

        var geometry = new THREE.Geometry();
        geometry.vertices = curve.getPoints( 100 );
        var material = new THREE.LineBasicMaterial( {
            color: 0xffffff,
            linewidth: 50,
            linecap: 'round', //ignored by WebGLRenderer
            linejoin:  'round' //ignored by WebGLRenderer
        } );
        // line = new THREE.Line( geometry, material );
        // scene.add( line );

    }

    this.addSphereGeometry = function () {
        var geometry = new THREE.SphereGeometry( 5, 10, 10 );
        var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
        sphere1 = new THREE.Mesh( geometry, material );
        sphere2 = new THREE.Mesh( geometry, material );
        // sphere1.position.set( -23, 0, -1600 );
        // sphere2.position.set( -15, 0, -1500 );
        // scene.add( sphere1 );
        // scene.add( sphere2 );

    }
}

Viewer.DrawDongcheWay.prototype = {
    constructor: Viewer.DrawDongcheWay,
}

var drawdoncheway = new Viewer.DrawDongcheWay();