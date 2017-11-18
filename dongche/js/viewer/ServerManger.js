// /**
//  * Created by 京美电子 on 2017/7/12.
//  */
var socket;
var wsUri ="ws://localhost:8080"

//创建websocket
function initServer() {
    testWebSocket();
}

function testWebSocket() {
    try{
        socket = new WebSocket(wsUri);
        socket.onopen = function(evt) {
            console.log("链接成功");
            onOpen(evt)
        };
        socket.onclose = function(evt) {
            onClose(evt)
        };
        socket.onmessage = function(evt) {
            onMessage(evt)
        };
        socket.onerror = function(evt) {
            onError(evt)
        };
    } catch (e){
        console.log("抛出异常");
    }

    // socket = new WebSocket(wsUri);
    // socket.onopen = function(evt) {
    //     console.log("链接成功");
    //     onOpen(evt)
    // };
    // socket.onclose = function(evt) {
    //     onClose(evt)
    // };
    // socket.onmessage = function(evt) {
    //     onMessage(evt)
    // };
    // socket.onerror = function(evt) {
    //     onError(evt)
    // };
}

function onOpen( evt ) {
    doSend("WebSocket rocks");
}

function onClose( evt ) {
   console.log( "关闭服务" );
}

function onMessage( evt ) {
    socket.close();
}

function onError( evt ) {
   console.log("输出错误");
}

function doSend( message ) {
    // console.log( message );
    socket.send(message);
}

function writeToScreen(message) {
    var pre = document.createElement("p");
    pre.style.wordWrap = "break-word";
    pre.innerHTML = message;
    output.appendChild(pre);
}
// window.addEventListener("load", init, false);

