let localStream; //local computer. camera and audio
let remoteStream; //remote peer. camera and audio
let peerConnection;

const servers = {
    iceServers:[
        {
            urls:['stun:stun1.1.google.com:19302', 'stun:stun2.2.google.com:19302']
        }
    ]
}

let init = async () => {
    localStream = await navigator.mediaDevices.getUserMedia({video:true, audio:false}) //asking for user permissions
    document.getElementById('user-1').srcObject = localStream;

    createOffer()
}

let createOffer = async() => {
    peerConnection = new RTCPeerConnection(servers); // we have created a peerConnection between the local and remote machine
    
    remoteStream = new MediaStream();
    document.getElementById('user-2').srcObject = remoteStream;
    
    localStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, localStream);
    });

    peerConnection.ontrack = (event) => {
        event.streams[0].getTracks().forEach((track) => {
            remoteStream.addTrack(track);
        })
    }
    
    peerConnection.onicecandidate = async (event) => {
        if(event.candidate){
            console.log('New ICE candidate:', event.candidate);
        }
    }


    let offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

    console.log('Offer:',offer)
}

init()