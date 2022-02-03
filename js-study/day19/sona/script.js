const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo(){
    navigator.mediaDevices.getUserMedia({video:true, audio:false})
        .then(localMediaStream =>{
            console.log(localMediaStream)
            video.srcObject = localMediaStream;
            video.play(); 
        })
        .catch(err=>{
            console.error(err);
        })
}

function paintToCanvas(){
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    setInterval(() => {
        ctx.drawImage(video,0,0,canvas.width,canvas.height);
        let pixels = ctx.getImageData(0,0,canvas.width,canvas.height);
        pixels = redEffect(pixels);
        ctx.putImageData(pixels,0,0);
    },16);
}

function takePhoto(){
    //played the sound
    snap.currentTime = 0;
    snap.play();
    //take the data out of the canvas 
    const data = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download','image');
    link.innerHTML = `<img src=${data} alt="image" />`;
    strip.insertBefore(link,strip.firstChild);
    console.log(data);
}

function redEffect(pixels){
    for (let i=0;i<pixels.data.length;i+=4){
        pixels.data[i+0] = pixels.data[i+0]+100; //red;
        pixels.data[i+1] = pixels.data[i+1]-50; //green;
        pixels.data[i+2] = pixels.data[i+2]*0.5; //blue;
    }
    return pixels;
}

getVideo();

video.addEventListener('canplay',paintToCanvas);