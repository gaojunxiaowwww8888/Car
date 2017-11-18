 'use strict';
 Viewer.BrokenLineManger = function() {	
	 var scope = this;
	 this.shown = false;

	 var handleGizmos = {}, lineGizmos = {}, axisGizmos = {};
	 var controlPoints = [];
	 var distance;
	 var horisontal, horisontalCorrection, arrowCorrection, verticalCorrection, topPoints, twopointlength;
	 var clickt = 0;
	 var scheight = 0;
	 var text, textPanel, changecameral = false, pickclick = 1;
	 var tagcl = 0;
	 var distancevalue = [];
	 var nearPoint = undefined;
	 var pointAxis = new THREE.Vector3();
	 var pointAxisn = 'Axis';
	 var pointAxisArray = [];
	 var groupShere, groupCylinder, groupAxis;

    //相机与绘制点的距离
    this.getWidth = function(point, camera) {
		var camPosition = new THREE.Vector3().setFromMatrixPosition( camera.matrixWorld );
		return point.distanceTo( camPosition ) / 400;
	}

	this.getCenterPointWorld = function() {
		var center = new THREE.Vector3();
		var controlPoints = this.getControlPointsWorld();
		for (var i=0; i < controlPoints.length; ++i) {
			center.add(controlPoints[i]);
		}
		if (controlPoints.length > 0)
			center.divideScalar( controlPoints.length );		
		return center;
	}

	this.getControlPointsWorld = function() {
		//get points in world coordinates
		var controlPointsr = [];
		for ( var i=0; i< controlPoints.length; ++i ) {
			controlPointsr[i] = new THREE.Vector3().copy( controlPoints[i].point );
			// if ( controlPoints[i].object )
			// 	controlPoints[i].object.localToWorld( controlPointsr[i] );
		}
		return controlPointsr;
	}

	this.getValue = function() {
		if (controlPoints.length < 2) return null;     
		//get points in local coordinates
		var controlPointsv = scope.getControlPointsWorld();	
		for (var i=0; i< controlPointsv.length-1; i++) {
		    distancevalue[i] = controlPointsv[i+1].distanceTo(controlPointsv[i]);
		}
		for (var j=1; j< distancevalue.length; j++) {
			distancevalue[0] += distancevalue[j];
		}
		return distancevalue[0];		
	}

    this.getScreenCoords = function(position, camera) {
	    var rect = scope.textPanel.dom.getBoundingClientRect();
		var widthHalf = rect.width / 2, heightHalf = rect.height / 2;
		var vector = new THREE.Vector3().copy(position);
		if (vector.project)
			vector.project(camera);
		else
			projector.projectVector(vector, camera);
		return new THREE.Vector2(( vector.x * widthHalf ) + widthHalf, - ( vector.y * heightHalf ) + heightHalf);
	}

    //添加文本信息内容
	this.setText = function(text, position, camera) {
		if (scope.text) {
			scope.text.setDisplay( 'block' );		
			var coords = this.getScreenCoords(position, camera);
			var rect = scope.text.dom.getBoundingClientRect();
			coords.x -= rect.width/2;
			coords.y -= rect.height/2;

			var containerRect = scope.textPanel.dom.getBoundingClientRect();			
			if (text) scope.text.setValue(text);
			scope.text.setLeft(coords.x.toString() +'px'); 
			scope.text.setTop(coords.y.toString() +'px'); 			
			rect = scope.text.dom.getBoundingClientRect();
			if (rect.width > 0 && rect.height > 0 && (rect.left > containerRect.right || rect.right < containerRect.left || rect.top > containerRect.bottom || rect.bottom < containerRect.top))
				scope.text.setDisplay( 'none' );					
		}
	}
    
    //创建Group
	this.createGroup = function () {
		groupShere = new THREE.Group();
        groupShere.name = "groupShere";
        scene.add(groupShere);

        groupCylinder = new THREE.Group();
        groupCylinder.name = "groupCylinder";
        scene.add(groupCylinder);

        groupAxis = new THREE.Group();
        groupAxis.name = "groupAxis";
        scene.add(groupAxis);
	}

	this.init = function() {
        scope.createGroup();

 	    var w = container.clientWidth;  //window.innerWidth;
		var h = container.clientHeight; //window.innerHeight;
	 	//创建Panel对象
	    scope.textPanel = new UI.Panel();
	    scope.textPanel.dom.style.width = w;
	    scope.textPanel.dom.style.height = h;
	    scope.textPanel.dom.style.position = 'absolute';
	    scope.textPanel.dom.id = 'panelIdp2l';
		//创建Text对象
	    scope.text = new UI.Text();
		scope.text.setDisplay( 'none' );
		scope.text.setPosition( 'absolute' );
		scope.text.setColor('#ff0000');
		scope.text.setPadding('3px');
		scope.text.setPaddingRight('8px');
		scope.text.setPaddingLeft('8px');
		scope.text.setBackgroundColor('#FFFFFF');
		scope.text.setBorder('1px solid #FF0000');
		scope.text.setOpacity('0.9');
		scope.text.setStyle('font', ["normal normal normal 15px/normal 'Helvetica Neue', arial, sans-serif"]);
		scope.text.setStyle('overflow', ['hidden']);
		scope.text.dom.id = 'textId';
		scope.textPanel.add( scope.text );

		//向Viewport中追加渲染器
		container.appendChild(scope.textPanel.dom);
		scope.textPanel.dom.appendChild(renderer.domElement);	

		//创建几何体对象的方法
	    this.initAxis();

	    //绘制几何体的方法
	    this.brokenLineScene();
	}
    
    //初始化十字架样式的对象
	this.initAxis = function() {
		// if (BrokenLineGeometry.SphereRadius == "") {
		// 	BrokenLineGeometry.SphereRadius = 5;
		// }
		// if (BrokenLineGeometry.CylinderRadius == "") {
		// 	BrokenLineGeometry.CylinderRadius = 2;
		// }
		for (var i=0; i<10; i++) {
			//创建圆柱体对象
			lineGizmos[i] = {
				Line: [
					new THREE.Mesh( new THREE.CylinderGeometry( 1, 1, 2, 8, 1, false ), new THREE.MeasurementGizmoMaterial( { color: 0xf60000, opacity: 0.4 } ) ),
					new THREE.Vector3( 0, 1.0, 0 ),
					new THREE.Vector3( Math.PI/2, 0, 0 )
				]
			};
            //创建小球的对象
			handleGizmos[i] = {
				Sphere: [
					new THREE.Mesh( new THREE.SphereGeometry( 3 ), new THREE.MeasurementGizmoMaterial( { color: 0xfcf600, opacity: 0.4 } ) )
				]
			};
			//创建十字架的对象
			axisGizmos[i] = {
				strX : [
					new THREE.Mesh( new THREE.CylinderGeometry( 0.8, 0.8, 2, 8, 1, false ), new THREE.MeasurementGizmoMaterial( { color: 0xf60000, opacity: 0.4 } ) ),
					new THREE.Vector3( 0.5, 0, 0 ),
					new THREE.Vector3( Math.PI / 2, 0, 0 )
	            ],
				strY: [
					new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.8, 2, 8, 1, false), new THREE.MeasurementGizmoMaterial({ color: 0x60f502, opacity: 0.4 })),
					new THREE.Vector3( 0, 0.01, 0 ),
					new THREE.Vector3( 0, Math.PI / 2, 0 )
	            ],
	            strZ: [
					new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.8, 2, 8, 1, false), new THREE.MeasurementGizmoMaterial({ color: 0x003da6, opacity: 0.4 })),
					new THREE.Vector3( 0, 0, 0.5 ),
					new THREE.Vector3( 0, 0, Math.PI/2 )
	            ]            
			}
		}
        
		scope.objectRotate(lineGizmos);
		scope.axisGizmosRotate(axisGizmos);
	}

	this.transformGizmo = function (mesh, translate, rotate) {
	    if (translate) mesh.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(translate.x, translate.y, translate.z));
	    if (rotate) {
	        var m = new THREE.Matrix4();

	        var m1 = new THREE.Matrix4();
	        var m2 = new THREE.Matrix4();
	        var m3 = new THREE.Matrix4();

	        m1.makeRotationX(rotate.x);
	        m2.makeRotationY(rotate.y);
	        m3.makeRotationZ(rotate.z);

	        m.multiplyMatrices(m1, m2);
	        m.multiply(m3);
	        mesh.geometry.applyMatrix(m);
	    }
	}

    //初始化集合体的当前位置
	this.objectRotate = function (lineGizmos) {
	    for (var i in lineGizmos) {
	        var handle = lineGizmos[i].Line;
	        handle.name = i;
	        scope.transformGizmo(handle[0], lineGizmos[i].Line[1], lineGizmos[i].Line[2]);
	    }
	}

	//初始化集合体的当前位置
	this.axisGizmosRotate = function (axisGizmos) {
		var j=0;		
	    for (var i in axisGizmos) {
	    	scope.swapGizmo(i, axisGizmos[j]);	
	    	j++;	   
	    }
	    j = 0;
	}
    
    //遍历几何体数组
	this.swapGizmo = function (str, axisGizmos) {
		var handle;
		handle = axisGizmos.strX[0];
	    handle.name = str;
	    scope.transformGizmo(handle, axisGizmos.strX[1], axisGizmos.strX[2]);

	    handle = axisGizmos.strY[0];
	    handle.name = str;
	    scope.transformGizmo(handle, axisGizmos.strY[1], axisGizmos.strY[2]);

	    handle = axisGizmos.strZ[0];
	    handle.name = str;
	    scope.transformGizmo(handle, axisGizmos.strZ[1], axisGizmos.strZ[2]);
	}
   
    //显示最大值得提示信息同属删除数组模型
    this.clearMs = function() {	   
		for (var i=sceneMgr.tempNodeArray.length-1; i>=0; i--) {
			var groupName = sceneMgr.tempNodeArray[i].name;
			if (groupName == "groupShere" || groupName == "groupCylinder" || groupName == "groupAxis") {
				sceneMgr.tempNodeArray.splice(i,1);
			}
	 	    // if (sceneMgr.tempNodeArray[i].name == "measurep2l") {
	 		   //  sceneMgr.tempNodeArray.splice(i,1);	 		    
	 	    // }
	    }
	    $('#textId').remove(); 
	    scene.dirty = true;
	 	controlPoints = [];
	 	distancevalue = [];
	 	pointAxisArray = [];          	 	
	 	clickt = 0;
	 	tagcl = 0;
	 	clickt ++ ;
        //重新创建Group的方法
	 	scope.createGroup();
	}

	//创建十字架的缩放的方法
	this.changeAxisScale = function (pointWidth) {
		for (var i=sceneMgr.tempNodeArray.length-1; i>=0; i-- ) {
			if (sceneMgr.tempNodeArray[i].name == "groupAxis") {
				var childGroup = sceneMgr.tempNodeArray[i].children;
				for (var j=0; j<childGroup.length; j++) {
					if (childGroup[j].name == "measurep2lAxisX") {
						childGroup[j].scale.set(pointWidth , pointWidth, pointWidth * 12);				
		     		    scene.dirty = true;

			     	} else if (childGroup[j].name == "measurep2lAxisY") {			
						childGroup[j].scale.set(pointWidth, pointWidth * 12, pointWidth);
		     		    scene.dirty = true;

			     	} else if (childGroup[j].name == "measurep2lAxisZ") {
						childGroup[j].scale.set(pointWidth * 12, pointWidth, pointWidth);
		     		    scene.dirty = true;
			     	}
				}	     	  	
	     	}
        }
	}

	//创建球点的缩放的方法
	this.changeSphereScale = function (pointWidth) {
		for (var i=sceneMgr.tempNodeArray.length-1; i>=0; i-- ) {
			if (sceneMgr.tempNodeArray[i].name == "groupShere") {
				var childGroup = sceneMgr.tempNodeArray[i].children;
				for (var j=0; j<childGroup.length; j++) {
					if (childGroup[j].name == "measurep2lsphere") {
						childGroup[j].scale.set(pointWidth , pointWidth, pointWidth);				
		     		    scene.dirty = true;
			     	} 
				}	     	  	
	     	}
        }
	}
    
    //创建圆柱体缩放的方法
	this.changeCyliderScale = function (width) {
		for (var i=sceneMgr.tempNodeArray.length-1; i>=0; i-- ) {
			if (sceneMgr.tempNodeArray[i].name == "groupCylinder") {
				var childGroup = sceneMgr.tempNodeArray[i].children;
				for (var j=0; j<childGroup.length; j++) {
					if (childGroup[j].name == "measurep2lCylinder") {
						var pointLenghth = pointAxisArray[j].distanceTo(pointAxisArray[j+1]);
						childGroup[j].scale.set(width, width, pointLenghth);	
						childGroup[j].lookAt(pointAxisArray[j+1]);			
		     		    scene.dirty = true;
			     	} 
				}	     	  	
	     	}
        }
	}

    //绘制折线的方法changeAxisScale
	this.brokenLineScene = function() {

        var scope = this;
	 	//定义鼠标的监听事件
		var pnaelclick = document.getElementById('panelIdp2l');
		pnaelclick.addEventListener( 'mousedown', onMouseDown, false );
		// pnaelclick.addEventListener( 'mousemove', onMouseMove, false );
		// pnaelclick.addEventListener( 'mouseup', onMouseUp, false );
		// window.addEventListener( 'resize', onWindowResize, false );
		// control.addEventListener('change', onMouseWheel, false );

		function onMouseDown(e) {
			var width = scope.getWidth(scope.getCenterPointWorld(), camera);
		 	if (e.button != 0) {
	            return;
	        }		 	  	 
	        var mousePt = new THREE.Vector2();
	        mousePt.x = (e.offsetX / container.clientWidth) * 2 - 1;
	        mousePt.y = -(e.offsetY / container.clientHeight) * 2 + 1;
	        var raycaster = new THREE.Raycaster();
	        raycaster.setFromCamera(mousePt, camera);
	        var interObjs = raycaster.intersectObject(scene, true);
	        if (interObjs.length > 0) {
	        	var centerPt = interObjs[0].point;
	        	clickt ++ ;	        	
	        	//将几何体缓存到数组中                 
	        	if (controlPoints.length >= 10) {
	        	    scope.clearMs();       		       	 	
	        	}
	        	if (controlPoints.length == 0 && clickt == 1) {
	        		controlPoints[0] = interObjs[0];
	        	}
	        	if (controlPoints.length == 1 && clickt == 2) {
	        		controlPoints[1] = interObjs[0];  
	        	}
	        	if (controlPoints.length >= 2) {	 
	         	    controlPoints[clickt-1] = interObjs[0];
	         	    tagcl++;
	             }

	        	switch(controlPoints.length) {
	                //第一个点
	        		case 1:   
	        		    //获取第一个点与相机的距离    
	        		    var object = handleGizmos[0].Sphere[0]; 
	        		    // var objectAXIS1X = axisGizmos[0].strX[0];
	        		    // var objectAXIS1Y = axisGizmos[0].strY[0];
	        		    // var objectAXIS1Z = axisGizmos[0].strZ[0];
                        var pointWidth = scope.getWidth(controlPoints[0].point, camera);
                        pointAxis = controlPoints[0].point;
                        pointAxisArray[0] = pointAxis;

						//设置测量的位置及线段的拉伸方式
						setObject(object, pointAxis, pointWidth);
				    break; 

				    //当绘制的点的个数大于等于2的具体操作   
				    default:
				        // var pointWidth = scope.getWidth(controlPoints[controlPoints.length-1].point, camera);
				        var object = handleGizmos[tagcl].Sphere[0];
				        var strAxis = pointAxisn + tagcl;
				        strAxis = new THREE.Vector3();

                        var pointWidth = scope.getWidth(controlPoints[controlPoints.length-1].point, camera);
                        strAxis = controlPoints[controlPoints.length-1].point;
                        pointAxisArray[tagcl] = controlPoints[controlPoints.length-1].point;

	        		    //设置测量点的坐标位置及线段的拉伸
	        		    setObject(object, strAxis, pointWidth);
				
						//计算两个点的中心位置
						horisontal = new THREE.Vector3().copy(pointAxisArray[pointAxisArray.length-1]).sub(pointAxisArray[pointAxisArray.length-2]);
						//计算两点之间的距离
	                    twopointlength = pointAxisArray[pointAxisArray.length-1].distanceTo(pointAxisArray[pointAxisArray.length-2]);

	                    if (controlPoints.length >= 2) {						 	
							var object = lineGizmos[tagcl].Line[0];
							var midPoint = new THREE.Vector3().copy(pointAxisArray[pointAxisArray.length-2]).add(pointAxisArray[pointAxisArray.length-1]).divideScalar(2);
	                        //设置当前点的位置
	                        var centerpointl = scope.getWidth(midPoint, camera);
							// object.position.copy(midPoint);
							object.position.copy( pointAxisArray[pointAxisArray.length-2] );
							//设置相机的位置
							object.lookAt( pointAxisArray[pointAxisArray.length-1] );

							//设置圆柱体按比例拉伸
                            // object.scale.set(centerpointl, centerpointl, horisontal.length() * 5);
                            object.scale.set( width, width, twopointlength / 2 );
	                        //将绘制的添加到场景中同时更新场景
							object.visible = true;
							// object.name = "measurep2l";
							object.name = "measurep2lCylinder";
							
							// sceneMgr.addTempNode(object);
							groupCylinder.add(object);
						    scene.dirty = true;
						 } 
	                     changecameral = true;
	                     //添加文本div显示信息
						 scope.textPanel.add(scope.text);

						 //计算两个点的中心位置
	                     var midPoint = new THREE.Vector3().copy(pointAxisArray[0]).add(pointAxisArray[1]).divideScalar(2);
	                     //显示角度的文本信息
						 var distance = scope.getValue();
						 scope.setText( "总长度:"+distance.toFixed(2)+"m", midPoint, camera );
				    break;   
	        	}            	           
            }
        }
        
        //设置测量点的位置及线段的拉伸方式的方法
        function setObject(object, pointAxis, pointWidth) {
        	object.position.copy(pointAxis);
			object.scale.set(pointWidth, pointWidth, pointWidth);
			object.visible = true;
		    object.name = "measurep2lsphere";
			groupShere.add(object);
			scene.dirty = true;
        }

        //鼠标移动时的监听事件
        function onMouseMove(e) {
        	// var pointWidth = scope.getWidth(pointAxisArray[0], camera);
         	if (changecameral = true && controlPoints.length >= 2 ) {
                //获取两点之间的中心点
				 var midPoint = new THREE.Vector3().copy(pointAxisArray[0]).add(pointAxisArray[1]).divideScalar(2);					
				//实现div中信息内容的显示功能
				var distance = scope.getValue();
				scope.setText( "总长度:"+distance.toFixed(2)+"m", midPoint, camera );
         	}
         	// scope.changeSphereScale(pointWidth);
         	//获取射线较点中的最近点
         	var mousePt = new THREE.Vector2();
	        mousePt.x = (e.offsetX / container.clientWidth) * 2 - 1;
	        mousePt.y = -(e.offsetY / container.clientHeight) * 2 + 1;

	        var raycaster = new THREE.Raycaster();
	        raycaster.setFromCamera(mousePt, camera);
	        var interObjs = raycaster.intersectObject(scene, true);
	        // if (interObjs.length > 0) {
             //    //查找网格的最近点的方法
	        //     findPoint(interObjs);
	        // } else {
	        //     nearPoint = undefined;
	        //     if (sceneMgr.tempNodeArray.length > 0) {
	        //         for (var i = sceneMgr.tempNodeArray.length - 1; i >= 0; i--) {
	        //             if (sceneMgr.tempNodeArray[i].name == "sphere") {
	        //                 sceneMgr.tempNodeArray.splice(i, 1);
	        //                 scene.dirty = true;
	        //             }
	        //         }
	        //     }
	        // }
        }

        //鼠标抬起时的监听事件
        function onMouseUp(e) {
         	changecameral = false;
        }

        //窗体的变化事件
        function onWindowResize(e) {
         	if(changecameral = true && controlPoints.length >= 2){
                //获取两点之间的中心点
				 var midPoint = new THREE.Vector3().copy(pointAxisArray[0]).add(pointAxisArray[1]).divideScalar(2);						
				//实现div中信息内容的显示功能
				var distance = scope.getValue();
				scope.setText("总长度:"+distance.toFixed(2)+"m", midPoint, camera);
         	}
	    }

        //鼠标滚动时空之文本信息显示的方法
	    function onMouseWheel(e) {
	    	// var width = scope.getWidth(scope.getCenterPointWorld(), camera);
	    	// var pointWidth = scope.getWidth(pointAxisArray[0], camera);
	     	camera.updateMatrixWorld();
	     	if (changecameral = true && controlPoints.length >= 2) {
                //获取两点之间的中心点
				var midPoint = new THREE.Vector3().copy(pointAxisArray[0]).add(pointAxisArray[1]).divideScalar(2);						
				//实现div中信息内容的显示功能
				var distance = scope.getValue();
				scope.setText("总长度:"+distance.toFixed(2)+"m", midPoint, camera);
         	}

         	//调用缩放的方法
         	if (pointAxisArray.length > 0) {
         		var width = scope.getWidth(scope.getCenterPointWorld(), camera);
	    	    var pointWidth = scope.getWidth(pointAxisArray[0], camera);
         		scope.changeAxisScale(pointWidth);
	         	scope.changeSphereScale(pointWidth);
	         	scope.changeCyliderScale(width);
         	}
	    }

	    //寻找3个目标点的方法
	    function findPoint(interObjs) {
	        if (interObjs.length > 0) {
	            var pointArray = [];
	            var point = interObjs[0].point;
                //第一个目标点
	            var firstPoint = new THREE.Vector3();
	            var ax = interObjs[0].face.a * 3;
	            var ay = ax + 1;
	            var az = ax + 2;
	            firstPoint.x = interObjs[0].object.geometry.attributes.position.array[ax];
	            firstPoint.y = interObjs[0].object.geometry.attributes.position.array[ay];
	            firstPoint.z = interObjs[0].object.geometry.attributes.position.array[az];
	            pointArray[0] = firstPoint;
                //第二个目标点
	            var twoPoint = new THREE.Vector3();
	            var bx = interObjs[0].face.b * 3;
	            var by = bx + 1;
	            var bz = bx + 2;
	            twoPoint.x = interObjs[0].object.geometry.attributes.position.array[bx];
	            twoPoint.y = interObjs[0].object.geometry.attributes.position.array[by];
	            twoPoint.z = interObjs[0].object.geometry.attributes.position.array[bz];
	            pointArray[1] = twoPoint;
                //第三个目标点
	            var threePoint = new THREE.Vector3();
	            var cx = interObjs[0].face.c * 3;
	            var cy = cx + 1;
	            var cz = cx + 2;
	            threePoint.x = interObjs[0].object.geometry.attributes.position.array[cx];
	            threePoint.y = interObjs[0].object.geometry.attributes.position.array[cy];
	            threePoint.z = interObjs[0].object.geometry.attributes.position.array[cz];
	            pointArray[2] = threePoint;
                //查找最近点的方法
	            findNearPoint(point, pointArray, interObjs);
	        }
	    }

 	    //判断射线与3个目标点哪个距离最近
	    function findNearPoint(point, pointArray, interObjs) {
	        var firstNearPoint = new THREE.Vector3();
	        var twoNearPoint = new THREE.Vector3();
	        var threeNearPoint = new THREE.Vector3();
	        firstNearPoint = pointArray[0].applyMatrix4(interObjs[0].object.matrixWorld);
	        twoNearPoint = pointArray[1].applyMatrix4(interObjs[0].object.matrixWorld);
	        threeNearPoint = pointArray[2].applyMatrix4(interObjs[0].object.matrixWorld);
	        var firstdistance = point.distanceTo(firstNearPoint);
	        var twodistance = point.distanceTo(twoNearPoint);
	        var threedistance = point.distanceTo(threeNearPoint);
	        //比较三个点的大小
	        var min;
	        min = firstdistance < twodistance ? firstdistance : twodistance;
	        min = min < threedistance ? min : threedistance;
	        if (min == firstdistance) {
                //判断最近点是否满足赋值的条件的方法
	            computesNearPoint(min, firstNearPoint);
	        } else if (min == twodistance) {
                //判断最近点是否满足赋值的条件的方法
	            computesNearPoint(min, twoNearPoint);
	        } else if (min == threedistance) {
                //判断最近点是否满足赋值的条件的方法
	            computesNearPoint(min, threeNearPoint);
	        }
	    }

 	    //判断最近点是否满足条件的方法
	    function computesNearPoint(min, nearpoint) {
            //获取最近点与相机的距离
	         var pointWidth = scope.getWidth(nearpoint, camera);
	         if (min <= 0.01) {
                 //创建最近点上小球对象
	            var geometry = new THREE.SphereGeometry(3);
	            var material = new THREE.MeshBasicMaterial({ color: 0xcdff00, opacity: 0.3 });
	            var sphere = new THREE.Mesh(geometry, material);
	            sphere.name = "sphere";
	            sphere.position.copy(nearpoint);
                 //小球随着相机的远近而拉伸的比例
	            sphere.scale.set(pointWidth, pointWidth, pointWidth);
	            sphere.visible = true;
                 //删除场景数组中的小球对象
	            // if (sceneMgr.tempNodeArray.length > 0) {
	            //     for (var i = sceneMgr.tempNodeArray.length - 1; i >= 0; i--) {
	            //         if (sceneMgr.tempNodeArray[i].name == "sphere") {
	            //             sceneMgr.tempNodeArray.splice(i, 1);
	            //             scene.dirty = true;
	            //         }
	            //     }
	            // }
	            scene.add(sphere);
	            nearPoint = nearpoint;
	         } else {
	             nearPoint = undefined;
                 //不满足最近点时删除场景中的小球对象
	            if (sceneMgr.tempNodeArray.length > 0) {
	                for (var i = sceneMgr.tempNodeArray.length - 1; i >= 0; i--) {
	                    if (sceneMgr.tempNodeArray[i].name == "sphere") {
	                        sceneMgr.tempNodeArray.splice(i, 1);
	                        scene.dirty = true;
	                    }
	                }
	            }
	        }
	    }    
	}

}

Viewer.BrokenLineManger.prototype = {
	constructor: Viewer.BrokenLineManger,
}

//创建折线测量的对象
var brokenLineDistance =  new Viewer.BrokenLineManger();
