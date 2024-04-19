function camera_result_init(){
    let imgSrc = `http://13.209.62.118:8080/uploads/face/${resName}.png`;
    let targetImg = document.getElementById('resultImg');
    targetImg.src = imgSrc;
    
    let targetBg = document.getElementById('resultBg');
    targetBg.src = `./images/camera/bg/${resParams.Bg}`

    setTimeout(() => {
        makeQRimg(targetImg, resParams.Bg);
        moveImg(targetImg, resName, resParams.Bg);
    }, 150)
}

function makeQRimg(targetImg, bg){
    bg = bg.replace('.jpg', '');

    const canvas = document.getElementById('QRcanvas');
    const context = canvas.getContext('2d');

    canvas.width = 2160 / 4;
    canvas.height = 3840 / 4;

    const bgImg = new Image();
    const bgImgWidth = canvas.width;
    const bgImgHeight = canvas.height;

    bgImg.onload = function(){    
        context.drawImage(bgImg, 0, 0, bgImgWidth, bgImgHeight);

        const img = new Image();
        img.crossOrigin = "Anonymous";

        const imgWidth = targetImg.width;
        const imgHeight = targetImg.height;

        img.onload = function(){
            context.drawImage(img, bgImgWidth / 2 - imgWidth / 2, bgImgHeight / 2 - imgHeight / 2, imgWidth, imgHeight );

        let qrImage = canvas.toDataURL('image/png');

        fetch('http://localhost/uploads/qr', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    image: qrImage,
                }),
            })
            .then(response => response.json())
            .then(data => {
               qrImgName = data.imgName;
               let qrSrc = `http://localhost/qrcode.html?=${qrImgName}`;
               fn_CustomQRImage(qrSrc) // 실서버용

               qrSrc = null;
            })
            .catch(error => {
                console.error('서버에 이미지 전송 중 오류 발생:', error);
            });
        }
        img.src = targetImg.src;
    }
    bgImg.src = `./images/camera/bg/qrbg/${bg}.png`;
}

function fn_CustomQRImage(url) {
    document.getElementById('qrCode').innerHTML = '';
    const customQR = new QRCode(document.getElementById('qrCode'), {
        width: 350,
        height: 350,
        correctLevel: QRCode.CorrectLevel.L,
    });

    customQR.makeCode(url)
}

function moveImg(target, img, bg) {
    const image = target;
    let isDragging = false;
    let startY, originalTop;

    image.addEventListener('mousedown', startDrag);
    image.addEventListener('touchstart', startDrag);

    image.addEventListener('mousemove', drag);
    image.addEventListener('touchmove', drag);

    image.addEventListener('mouseup', endDrag);
    image.addEventListener('touchend', endDrag);

    function startDrag(event) {
        let offsetY;
        event.preventDefault();

        const caption = document.querySelector('.caption');
        caption.style.opacity = '0';
        caption.style.transition = 'opacity 3s';

        isDragging = true;

        startY = event.type === 'mousedown' ? event.clientY : event.touches[0].clientY;
        offsetY = image.offsetTop;
        originalTop = parseInt(image.style.top) || 0; // 이미지의 초기 top 위치를 저장
    }

    function drag(event) {
        if (!isDragging) return;
        event.preventDefault();

        let y = event.type === 'mousemove' ? event.clientY : event.touches[0].clientY;
        const moveY = y - startY;

        image.style.top = originalTop + moveY > 0 ? '0px' : originalTop + moveY + 'px';

        if (Math.abs(originalTop + moveY) > (image.clientHeight / 3)) {
            image.style.transition = 'top 1s ease-out';
            image.style.top = -image.clientHeight * 2 + 'px';
            image.style.pointerEvents = 'none';

            const hand = document.querySelector('.hand');
            hand.style.opacity = '0';
            hand.style.transition = 'opacity 3s';

        const socket = io('http://13.209.62.118:8080');
        socket.emit('chat message', { img, bg });

        // console.log('5분 뒤 메인 화면으로 이동합니다.');
        // setTimeout(() => { goPage({'link' : 'main'}) }, 300000)
        } else {
            image.style.transition = '';
        }
    }

    function endDrag() {
        isDragging = false;
    }
}