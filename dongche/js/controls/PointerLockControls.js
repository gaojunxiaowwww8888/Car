/**
 * @author mrdoob / http://mrdoob.com/
 */

THREE.PointerLockControls = function ( camera, domElement ) {
    var scope = this;
    scope.object = camera;
    camera.rotation.set( 0, 0, 0 );

    var pitchObject = new THREE.Object3D();
    pitchObject.add( camera );

    var yawObject = new THREE.Object3D();
    yawObject.position.y = 10;
    yawObject.add( pitchObject );

    var PI_2 = Math.PI / 2;
    scope.tag = false;
    var ps = 0;

    //外加
    scope.domElement = ( domElement !== undefined ) ? domElement : document;
    scope.enableRotate = true;
    scope.rotateSpeed = 1.0;

    scope.autoRotate = false;
    scope.autoRotateSpeed = 2.0;

    var spherical = new THREE.Spherical();
    var sphericalDelta = new THREE.Spherical();

    var scale = 1;
    var panOffset = new THREE.Vector3();

    var rotateStart = new THREE.Vector2();
    var rotateEnd = new THREE.Vector2();
    var rotateDelta = new THREE.Vector2();
    scope.target = new THREE.Vector3();

    scope.target0 = scope.target.clone();
    scope.position0 = scope.object.position.clone();
    // scope.object.rotateX( Math.PI / 4 );
    // scope.object.position.z = 0;

    scope.minPolarAngle = 0; // radians
    scope.maxPolarAngle = Math.PI/10; // radians

    // How far you can orbit horizontally, upper and lower limits.
    // If set, must be a sub-interval of the interval [ - Math.PI, Math.PI ].
    scope.minAzimuthAngle = - Infinity; // radians
    scope.maxAzimuthAngle = Infinity; // radians

    // Set to true to enable damping (inertia)
    // If damping is enabled, you must call controls.update() in your animation loop
    scope.enableDamping = false;
    scope.dampingFactor = 0.25;

    scope.minDistance = 0;
    scope.maxDistance = Infinity;

    var changeEvent = { type: 'change' };
    var startEvent = { type: 'start' };
    var endEvent = { type: 'end' };

    this.mouseButtons = { ORBIT: THREE.MOUSE.LEFT, ZOOM: THREE.MOUSE.MIDDLE, PAN: THREE.MOUSE.RIGHT };

    var STATE = { NONE: - 1, ROTATE: 0, DOLLY: 1, PAN: 2, TOUCH_ROTATE: 3, TOUCH_DOLLY: 4, TOUCH_PAN: 5 };

    var state = STATE.NONE;

    function getAutoRotationAngle() {

        return 2 * Math.PI / 60 / 60 * scope.autoRotateSpeed;

    }


    function rotateLeft( angle ) {

        sphericalDelta.theta -= angle;

    }

    function rotateUp( angle ) {

        sphericalDelta.phi -= angle;

    }

    function handleMouseDownRotate( event ) {
        rotateStart.set( event.clientX, event.clientY );
    }

    function handleMouseMoveRotate( event ) {

        //console.log( 'handleMouseMoveRotate' );

        rotateEnd.set( event.clientX, event.clientY );
        rotateDelta.subVectors( rotateEnd, rotateStart );

        var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

        // rotating across whole screen goes 360 degrees around
        rotateLeft( 2 * Math.PI * rotateDelta.x / element.clientWidth * scope.rotateSpeed );

        // rotating up and down along whole screen attempts to go 360, but limited to 180
        rotateUp( 2 * Math.PI * rotateDelta.y / element.clientHeight * scope.rotateSpeed );

        rotateStart.copy( rotateEnd );

        scope.update();

    }

    this.dispose = function() {

        scope.domElement.addEventListener( 'mousedown', onMouseDown, false );
    };

    scope.domElement.addEventListener( 'mousedown', onMouseDown, false );

    function onMouseUp( event ) {

        if ( scope.enabled === false ) return;

        // handleMouseUp( event );

        document.removeEventListener( 'mousemove', onMouseMove, false );
        document.removeEventListener( 'mouseup', onMouseUp, false );

        scope.dispatchEvent( endEvent );

        state = STATE.NONE;

    }

    function onMouseMove( event ) {

        if ( scope.enabled === false ) return;

        event.preventDefault();

        switch ( state ) {

            case STATE.ROTATE:

                if ( scope.enableRotate === false ) return;

                handleMouseMoveRotate( event );

                break;
        }
    }

    function onMouseDown( event ) {

        if ( scope.enabled === false ) return;

        event.preventDefault();

        switch ( event.button ) {

            case scope.mouseButtons.ORBIT:

                if ( scope.enableRotate === false ) return;

                handleMouseDownRotate( event );

                state = STATE.ROTATE;

                break;

        }

        if ( state !== STATE.NONE ) {

            document.addEventListener( 'mousemove', onMouseMove, false );
            document.addEventListener( 'mouseup', onMouseUp, false );

            scope.dispatchEvent( startEvent );
        }
    }

    this.enabled = false;

    this.getObject = function () {

        return yawObject;

    };

    this.getpitchObject = function () {

        return pitchObject;

    };

    this.update = function () {

        var offset = new THREE.Vector3();

        // so camera.up is the orbit axis
        var quat = new THREE.Quaternion().setFromUnitVectors( scope.object.up, new THREE.Vector3( 0, 1, 0 ) );
        var quatInverse = quat.clone().inverse();

        var lastPosition = new THREE.Vector3();
        var lastQuaternion = new THREE.Quaternion();

        return function update() {

            var position = scope.object.position;

            offset.copy( position ).sub( scope.target );

            // rotate offset to "y-axis-is-up" space
            offset.applyQuaternion( quat );

            // angle from z-axis around y-axis
            spherical.setFromVector3( offset );

            if ( scope.autoRotate && state === STATE.NONE ) {
                rotateLeft( getAutoRotationAngle() );
            }

            spherical.theta += sphericalDelta.theta;
            spherical.phi += sphericalDelta.phi;

            // restrict theta to be between desired limits
            spherical.theta = Math.max( scope.minAzimuthAngle, Math.min( scope.maxAzimuthAngle, spherical.theta ) );

            // restrict phi to be between desired limits
            spherical.phi = Math.max( scope.minPolarAngle, Math.min( scope.maxPolarAngle, spherical.phi ) );
            spherical.makeSafe();
            spherical.radius *= scale;

            // restrict radius to be between desired limits
            spherical.radius = Math.max( scope.minDistance, Math.min( scope.maxDistance, spherical.radius ) );

            // move target to panned location
            // scope.target.add( panOffset );

            offset.setFromSpherical( spherical );
            // rotate offset back to "camera-up-vector-is-up" space
            offset.applyQuaternion( quatInverse );

            position.copy( scope.target ).add( offset );

            scope.object.lookAt( new THREE.Vector3( 0, 0, 100 ) );

            if ( scope.enableDamping === true ) {

                sphericalDelta.theta *= ( 1 - scope.dampingFactor );
                sphericalDelta.phi *= ( 1 - scope.dampingFactor );

            } else {
                sphericalDelta.set( 0, 0, 0 );
            }

            scale = 1;
            return false;
        };

    }();
};

THREE.PointerLockControls.prototype = Object.create( THREE.EventDispatcher.prototype );


