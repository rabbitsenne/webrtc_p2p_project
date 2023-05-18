let localStream; //my camera and audio
let remoteStream; //the other users camera and audio

let init = async () => {
    localStream = await navigator.mediaDevices.getUserMedia({video:true, audio:false}) //asking for user permissions
    document.getElementById('user-1').srcObject = localStream;
}

init()