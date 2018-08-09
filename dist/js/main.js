function openStream(){
    const config = {audio: false, video: true};
    return navigator.mediaDevices.getUserMedia(config);
}
function playStream(videoTag, stream){
    const video = document.getElementById(videoTag);
    video.srcObject = stream;
    video.play();
}

var peer = new Peer();

peer.on('open', function(id) {
    $('#myId').append(id);
});

//Caller
$('#btnCall').on('click', function(){
    const remoteId = $('#remoteId').val();
    openStream()
    .then(stream => {
        playStream('localStream', stream);
        const call = peer.call(remoteId, stream);
        call.on('stream', remoteStream => {
            playStream('remoteStream', remoteStream);
        });
    });
});

//Answer
peer.on('call', call => {
    openStream()
    .then(stream => {
        call.answer(stream);
        playStream('localStream', stream);
        call.on('stream', remoteStream => {
            playStream('remoteStream', remoteStream);
        });
    });
});



