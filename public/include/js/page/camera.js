bgSwiper = null;
dressSwiper = null;

function camera_init() {
    makeCamera();
    cameraOpen();

    selectData === 'am' 
    ? document.querySelector('.dress_box').style.top = '-300px'
    :  document.querySelector('.dress_box').style.top = 0;
}

function makeCamera() {
    const bgDiv = document.getElementById('bgSwiper');
    const dressDiv = document.getElementById('dressSwiper');
    const selectedBg = document.getElementById('SelectdBg');
    const selectedDress = document.getElementById('dress');

    let bgResult = cameraData.Bg.map((bg, idx) => {
        let firstActive = idx === 0 ? 'active' : '';

        return `<li class="swiper-slide">
                <button class="${firstActive}" onclick="selectBg(this, ${idx + 1})">
                    <img src="./images/camera/bg/thum/${idx + 1}.png" alt="1">
                </button>
            </li>`
    })

    let dressThumResult = cameraData.Dress[selectData].map((v, idx) => {
        let firstActive = idx === 0 ? 'active' : '';

        return `<li class="swiper-slide">
                <button class="${firstActive}" onclick="selectDress(this, ${idx + 1})"><img src="./images/camera/dress/${selectData}/thum/${idx + 1}.png" alt="IMG"></button>
            </li>`
    })


    bgDiv.querySelector('ul').innerHTML += bgResult.join('');
    selectedBg.src = `./images/camera/bg/1.jpg`;

    dressDiv.querySelector('ul').innerHTML += dressThumResult.join('');
    selectedDress.src = `./images/camera/dress/${selectData}/1.png`

    SwiperInit();
}

function selectBg(target, idx) {
    const parentBox = target.parentNode.parentNode;
    parentBox.querySelectorAll('li').forEach((list) => list.querySelector('button').classList.remove('active'));
    target.classList.add('active');
    
    document.getElementById('SelectdBg').src = `./images/camera/bg/${idx}.jpg`
    document.getElementById('SelectdBg').setAttribute('data-idx', idx);
}

function selectDress(target, idx) {
    const parentBox = target.parentNode.parentNode;
    parentBox.querySelectorAll('li').forEach((list) => list.querySelector('button').classList.remove('active'));
    target.classList.add('active');

    document.getElementById('dress').src = `./images/camera/dress/${selectData}/${idx}.png`
    document.getElementById('dress').setAttribute('data-idx', idx);
    
    setTimeout(() => {cameraXY(idx)}, 50)
}

function cameraOpen() {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (stream) {
            let video = document.getElementById('video');
            video.srcObject = stream;
            cameraXY(1);
    })
        .catch(function (err) {
            console.log("웹캠 접근 오류: ", err);
        });
}

function capture(params) {
    resName = null;
    console.log(params, 'params');

    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    const video = document.getElementById('video');
    const img = document.getElementById('dress');

    const zoom = 3;
    const imgWidth = img.width / zoom;
    const imgHeight = img.height / zoom;
    const videoWidth = 2560 / zoom;
    const videoHeight = 1920 / zoom;
    const topResult = selectData === 'am' ? 300 / zoom : 0;
    const faceWidth = cameraData.Dress[selectData][params.Dress - 1].width / zoom;
    const faceHeight = cameraData.Dress[selectData][params.Dress - 1].height / zoom;
    const faceX = cameraData.Dress[selectData][params.Dress - 1].left / zoom;
    const faceY = cameraData.Dress[selectData][params.Dress - 1].top / zoom;

    const mask = new Image();
    mask.onload = function(){
        // canvas.width = Math.max(imgWidth, videoWidth);
        // canvas.height = Math.max(imgHeight, videoHeight);

        canvas.width = imgWidth;
        canvas.height = imgHeight;

        context.drawImage(mask, faceX, faceY + topResult, faceWidth, faceHeight);
        context.globalCompositeOperation = 'source-in';
        context.drawImage(video,  videoWidth - canvas.width / 2, topResult , videoWidth, videoHeight);

        context.globalCompositeOperation = 'source-over';
        context.drawImage(img, 0, 0, imgWidth, imgHeight);
            
        let imageData = canvas.toDataURL('image/png');
        let userParams = {'Bg' : `${params.Bg}.jpg`, 'Dress' : `${selectData}/${params.Dress}.png`,}
    
        fetch('http://13.209.62.118:8080/uploads/face', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    image: imageData,
                    params: userParams
                }),
            })
            .then(response => response.json())
            .then(data => {
                resName = data.imgName;
                resParams = data.params;
                goPage({'link' : 'camera_result', 'sign' : 'N'});
            })
            .catch(error => {
                console.error('서버에 이미지 전송 중 오류 발생:', error);
            });
    }

    mask.src = `./images/camera/dress/${selectData}/face/${params.Dress}.png`;
}

function captureStart() {
    const selectBg = document.getElementById('SelectdBg').getAttribute('data-idx');
    const selectDress = document.getElementById('dress').getAttribute('data-idx');
    const selectParams = {'Bg' : selectBg, 'Dress' : selectDress};
    pictureTimer(selectParams);
}

function pictureTimer(params) {
    let captureTimer = 5;

    document.querySelectorAll('.swiper-slide').forEach(v => {v.style.pointerEvents = 'none'})

    const timerCnt = setInterval(() => {
        if (captureTimer === 0) {
            clearInterval(timerCnt);
            capture(params);
            return;
        } else {
            document.getElementById('captureButton').innerHTML = `<div><span style="font-size:11.2rem; padding:0;">${captureTimer}</span></div>`;
            captureTimer--;
        }
    }, 1000);
}

function cameraXY(idx) {
    selectIdx = idx - 1;
    const video = document.getElementById('video');
    video.style.maskImage = `url('./images/camera/dress/${selectData}/face/${idx}.png')`;
    video.style.webkitMaskImage = `url('./images/camera/dress/${selectData}/face/${idx}.png')`;
    video.style.maskPosition = `${cameraData.Dress[selectData][selectIdx].left - 640}px ${cameraData.Dress[selectData][selectIdx].top}px` 
    video.style.WebkitMaskPosition = `${cameraData.Dress[selectData][selectIdx].left - 640}px ${cameraData.Dress[selectData][selectIdx].top}px` 
}

function SwiperInit() {
    bgSwiper !== null ? bgSwiper.destroy()
    : new Swiper("#bgSwiper", {
        slidesPerView: 5,
        spaceBetween: 30,
        navigation: {
            nextEl: ".bg-button-next",
            prevEl: ".bg-button-prev",
        },
    });

    dressSwiper !== null ? dressSwiper.destroy()
    : new Swiper("#dressSwiper", {
        slidesPerView: 5,
        spaceBetween: 30,
        navigation: {
            nextEl: ".dress-button-next",
            prevEl: ".dress-button-prev",
        },
    });
}