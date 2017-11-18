
THREE.OrbitControls = function ( object, domElement ) {

    this.object = object;

    this.domElement = ( domElement !== undefined ) ? domElement : document;

    // Set to false to disable this control
    this.enabled = true;

    // "target" sets the location of focus, where the object orbits around
    this.target = new THREE.Vector3();

    // How far you can dolly in and out ( PerspectiveCamera only )
    this.minDistance = 0;
    this.maxDistance = Infinity;

    // How far you can zoom in and out ( OrthographicCamera only )
    this.minZoom = 0;
    this.maxZoom = Infinity;

    this.minPolarAngle = 0; // radians
    this.maxPolarAngle = Math.PI; // radians

    // How far you can orbit horizontally, upper and lower limits.
    // If set, must be a sub-interval of the interval [ - Math.PI, Math.PI ].
    this.minAzimuthAngle = - Infinity; // radians
    this.maxAzimuthAngle = Infinity; // radians

    // Set to true to enable damping (inertia)
    // If damping is enabled, you must call controls.update() in your animation loop
    this.enableDamping = false;
    this.dampingFactor = 0.25;

    // Set to false to disable rotating
    this.enableRotate = true;
    this.rotateSpeed = 1.0;

    this.autoRotate = false;
    this.autoRotateSpeed = 2.0; // 30 seconds per round when fps is 60

    // Mouse buttons
    this.mouseButtons = { ORBIT: THREE.MOUSE.LEFT, ZOOM: THREE.MOUSE.MIDDLE, PAN: THREE.MOUSE.RIGHT };

    // for reset
    this.target0 = this.target.clone();
    this.position0 = this.object.position.clone();
    this.zoom0 = this.object.zoom;

    //
    // public methods
    //

    this.getPolarAngle = function () {

        return spherical.phi;

    };

    this.getAzimuthalAngle = function () {

        return spherical.theta;

    };

    this.reset = function () {

        scope.target.copy( scope.target0 );
        scope.object.position.copy( scope.position0 );
        scope.object.zoom = scope.zoom0;

        scope.object.updateProjectionMatrix();
        scope.dispatchEvent( changeEvent );

        scope.update();

        state = STATE.NONE;

    };

    // this method is exposed, but perhaps it would be better if we can make it private...
    this.update = function () {

        var offset = new THREE.Vector3();

        // so camera.up is the orbit axis
        var quat = new THREE.Quaternion().setFromUnitVectors( object.up, new THREE.Vector3( 0, 1, 0 ) );
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
            scope.target.add( panOffset );

            offset.setFromSpherical( spherical );

            // rotate offset back to "camera-up-vector-is-up" space
            offset.applyQuaternion( quatInverse );

            position.copy( scope.target ).add( offset );

            scope.object.lookAt( scope.target );

            if ( scope.enableDamping === true ) {

                sphericalDelta.theta *= ( 1 - scope.dampingFactor );
                sphericalDelta.phi *= ( 1 - scope.dampingFactor );

            } else {

                sphericalDelta.set( 0, 0, 0 );

            }

            scale = 1;
            panOffset.set( 0, 0, 0 );

            if ( zoomChanged ||
                lastPosition.distanceToSquared( scope.object.position ) > EPS ||
                8 * ( 1 - lastQuaternion.dot( scope.object.quaternion ) ) > EPS ) {

                scope.dispatchEvent( changeEvent );

                lastPosition.copy( scope.object.position );
                lastQuaternion.copy( scope.object.quaternion );
                zoomChanged = false;

                return true;

            }

            return false;

        };

    }();

    this.dispose = function () {

        scope.domElement.removeEventListener( 'mousedown', onMouseDown, false );
    };

    var scope = this;

    var changeEvent = { type: 'change' };
    var startEvent = { type: 'start' };
    var endEvent = { type: 'end' };

    var STATE = { NONE: - 1, ROTATE: 0, DOLLY: 1, PAN: 2, TOUCH_ROTATE: 3, TOUCH_DOLLY: 4, TOUCH_PAN: 5 };

    var state = STATE.NONE;

    var EPS = 0.000001;

    // current position in spherical coordinates
    var spherical = new THREE.Spherical();
    var sphericalDelta = new THREE.Spherical();

    var scale = 1;
    var panOffset = new THREE.Vector3();
    var zoomChanged = false;

    var rotateStart = new THREE.Vector2();
    var rotateEnd = new THREE.Vector2();
    var rotateDelta = new THREE.Vector2();

    function getAutoRotationAngle() {

        return 2 * Math.PI / 60 / 60 * scope.autoRotateSpeed;

    }

    function getZoomScale() {

        return Math.pow( 0.95, scope.zoomSpeed );

    }

    function rotateLeft( angle ) {

        sphericalDelta.theta -= angle;

    }

    function rotateUp( angle ) {

        sphericalDelta.phi -= angle;

    }

    function handleMouseDownRotate( event ) {

        //console.log( 'handleMouseDownRotate' );
        rotateStart.set( event.clientX, event.clientY );
    }

    function handleMouseDownDolly( event ) {

        //console.log( 'handleMouseDownDolly' );
        dollyStart.set( event.clientX, event.clientY );

    }

    function handleMouseDownPan( event ) {

        panStart.set( event.clientX, event.clientY );

    }

    function handleMouseMoveRotate( event ) {

        rotateEnd.set( event.clientX, event.clientY );
        rotateDelta.subVectors( rotateEnd, rotateStart );

        var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

        rotateLeft( 2 * Math.PI * rotateDelta.x / element.clientWidth * scope.rotateSpeed );
        rotateUp( 2 * Math.PI * rotateDelta.y / element.clientHeight * scope.rotateSpeed );

        rotateStart.copy( rotateEnd );

        scope.update();

    }

    function handleMouseMoveDolly( event ) {

        dollyEnd.set( event.clientX, event.clientY );

        dollyDelta.subVectors( dollyEnd, dollyStart );

        if ( dollyDelta.y > 0 ) {

            dollyIn( getZoomScale() );

        } else if ( dollyDelta.y < 0 ) {

            dollyOut( getZoomScale() );

        }

        dollyStart.copy( dollyEnd );

        scope.update();

    }

    function handleMouseMovePan( event ) {

        panEnd.set( event.clientX, event.clientY );

        panDelta.subVectors( panEnd, panStart );

        pan( panDelta.x, panDelta.y );

        panStart.copy( panEnd );

        scope.update();

    }

    function handleMouseUp( event ) {
        // console.log( 'handleMouseUp' );
    }

    function onMouseDown( event ) {

        if ( scope.enabled === false ) return;

        event.preventDefault();

        if ( event.button === scope.mouseButtons.ORBIT ) {

            if ( scope.enableRotate === false ) return;

            handleMouseDownRotate( event );

            state = STATE.ROTATE;

        } else if ( event.button === scope.mouseButtons.ZOOM ) {

            if ( scope.enableZoom === false ) return;

            handleMouseDownDolly( event );

            state = STATE.DOLLY;

        } else if ( event.button === scope.mouseButtons.PAN ) {

            if ( scope.enablePan === false ) return;

            handleMouseDownPan( event );

            state = STATE.PAN;

        }

        if ( state !== STATE.NONE ) {

            document.addEventListener( 'mousemove', onMouseMove, false );
            document.addEventListener( 'mouseup', onMouseUp, false );
            scope.dispatchEvent( startEvent );

        }
    }

    function onMouseMove( event ) {

        if ( scope.enabled === false ) return;

        event.preventDefault();

        if ( state === STATE.ROTATE ) {

            if ( scope.enableRotate === false ) return;

            handleMouseMoveRotate( event );

        } else if ( state === STATE.DOLLY ) {

            if ( scope.enableZoom === false ) return;

            handleMouseMoveDolly( event );

        } else if ( state === STATE.PAN ) {

            if ( scope.enablePan === false ) return;

            handleMouseMovePan( event );

        }

    }

    function onMouseUp( event ) {

        if ( scope.enabled === false ) return;

        handleMouseUp( event );

        document.removeEventListener( 'mousemove', onMouseMove, false );
        document.removeEventListener( 'mouseup', onMouseUp, false );

        scope.dispatchEvent( endEvent );
        state = STATE.NONE;

    }
    scope.domElement.addEventListener( 'mousedown', onMouseDown, false );
    this.update();
};

THREE.OrbitControls.prototype = Object.create( THREE.EventDispatcher.prototype );
THREE.OrbitControls.prototype.constructor = THREE.OrbitControls;

Object.defineProperties( THREE.OrbitControls.prototype, {

    center: {

        get: function () {
            console.warn( 'THREE.OrbitControls: .center has been renamed to .target' );
            return this.target;
        }
    },
} );
