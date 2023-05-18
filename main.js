let localStream; //local computer. camera and audio
let remoteStream; //remote peer. camera and audio
let peerConnection;

let init = async () => {
    localStream = await navigator.mediaDevices.getUserMedia({video:true, audio:false}) //asking for user permissions
    document.getElementById('user-1').srcObject = localStream;

    createOffer()
}

let createOffer = async() => {
    peerConnection = new RTCPeerConnection(); // we have created a peerConnection between the local and remote machine
    
    remoteStream = new MediaStream();
    document.getElementById('user-2').srcObject = remoteStream;
    
    let offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

    console.log('Offer:',offer)
}
init()