/**
 * Created by 京美电子 on 2017/5/15.
 */
Viewer.AtrributeManager = function () {

    var data =
        [{
            name: "A34",
            value: 'Item 1',
        },
        {
            name: "A35",
            value: 'Item 2',
        }];

    this.initAtrributeForm = function ( objNum ) {

        var divDoc = document.createElement('div');
        divDoc.setAttribute('id', 'wp_property');
        divDoc.style.position = 'fixed';
        divDoc.style.right = 1 + 'px';
        divDoc.style.top = 50 + 'px';

        var html =
            '<div id="property_panel" style="width:100%; height:100%; overflow:hidden">' +
            '<h2 style="text-align: left">' +
            '<p style="float: left; cursor:pointer; margin-left:0px; margin-top:3px">' + "属性信息"+ '</p>'+
            '<p style="float: right; cursor:pointer; margin-right:8px; margin-top:3px">' +
            '<img src="./res/treeview/close.png">' +
            '</p>' +
            '</h2>' +
            '<div id="main_demo" style="margin-left: 10px; margin-right: 10px">'+
            '<select id="edu" name="edu">'+
            '<option value="0">A6</option>'+
            '<option value="1">A7</option>'+
            '<option value="2">A8</option>'+
            '<option value="3">A9</option>'+
            '<option value="4">A10</option>'+
            '<option value="5">A11</option>'+
            '<option value="6">A31</option>'+
            '<option value="7">A32</option>'+
            '<option value="8">A34</option>'+
            '<option value="9">A35</option>'+
            '</select>'+
            '</div>'+
            '<div style="margin-left: 10px; margin-top: 10px; text-align: center" >' +
            '<button type="button" class="btn btn-info" id="czwz">查找位置</button>'+
            '<button type="button" class="btn btn-info" style="margin-left: 25px" id="xssx">显示属性</button>'+
            '</div>'+
            '<div style="width:90%;height:auto; overflow:hidden; border:1px solid #ccc; margin-top:10px;  margin-left:10px;  margin-right:10px" >' +
            '<div class="container" style="width:95%; height:95%; overflow:auto">' +
            '<table id ="table">'+
             '<thead>'+
              '<tr>'+
               '<th data-field = "name">名称：</th>'+
               '<th data-field = "value">属性值：</th>'+
              '</tr>'+
             '</thead>'+
            '</table>'+
            '</div>' +
            '</div>' +
            '</div>';

        divDoc.innerHTML = html;
        document.body.appendChild(divDoc);

        $(function(){
            $('select').selectlist({
                zIndex: 10,
                width: 227,
                height: 30
            });
        });

        //属性窗口的关闭按钮
        $('#property_panel').find('img').click(function () {

            if (divDoc) {
                divDoc.style.display = "none";
            }
        });

        $('#table').bootstrapTable({
            data: data
        });

        $('#czwz').click(function () {

            // console.log( control.target );
            // console.log( camera.position );

            control.target.set( 0.52, 24.72, -93.52 );
            camera.position.set( 0.52, 24.72, -93.51 );

        });
    };

    this.setAtrributeValue = function ( objNum ) {

        if (objNum != "" ) {

            var oDiv2 = document.getElementById("property_panel");
            var p1 = oDiv2.getElementsByTagName("p")[0];
            p1.textContent = objNum;

            $('#table').bootstrapTable({
                data: data
            });
        }
    }
}

Viewer.AtrributeManager.prototype = {

    constructor: Viewer.AtrributeManager,

    initForm: function ( objNum ) {

        if ( $( '#wp_property' ).attr( 'id' ) == null ) {

            this.initAtrributeForm( objNum );

        } else {

            $("#wp_property").css( "display", "" );
            $("#property_panel").css( "display", "" );
            this.setAtrributeValue( objNum );
        }
    },
}

var atrributeManager = new Viewer.AtrributeManager();
