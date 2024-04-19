function tourlist_init(){
    playSign('0000000036-0000000160-4529bae287574407bb11f49f85af2402-e246520d58404eb0bde2cea6d7365720');

    const Popbox = document.getElementById('imgPop');
    const listResult = document.getElementById('resultList');
    const closeImgBtn = document.getElementById('closeImgBtn');
    const caption = document.querySelector('.caption')
    let pinch = new pinchInfo(document.getElementById('zoomable-image'), {draggableUnzoomed: false, tapZoomFactor: 2});

    let tourBtnHtml = DataList.tourList.map(v => { 
        return `<li><button class="btn_shadow" onclick="listBtnClick(this)"><span>${v.TOUR_NAME_KOR}</span></button></li>`
    }).join('');

    listResult.innerHTML = `<ul>${tourBtnHtml}</ul>`;

    setTimeout(() => {
        caption.style.opacity = 0;
        caption.style.transition = 'opacity 1s';
    }, 3000)

    closeImgBtn.addEventListener('click', () => { Popbox.style.display = 'none';})
    
}

function appendTourHtml(name, desc, imgSrc) {
    const Popbox = document.getElementById('imgPop');
    const popImg = Popbox.querySelector('img');

    Popbox.style.display = 'block';
    popImg.src = imgSrc;

    return `
    <h3 id="resultTitle" class="sub_title">${name}</h3>
    <div class="detail_item">
        <p id="resultDesc">${desc}</p>
    </div>`
}

function listBtnClick(target) {
    const DetailBox = document.getElementById('resultDetail');
    const parentDiv = target.parentNode.parentNode;
    const name = target.querySelector('span').textContent;
    const targetList = DataList.tourList.find((list => list.TOUR_NAME_KOR === name));
    const desc = targetList.TOUR_DESC_KOR;
    const imgSrc = targetList.FILE_URL

    parentDiv.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
    target.classList.add('active');

    DetailBox.innerHTML = appendTourHtml(name, desc, imgSrc);

    // 0000000036-0000000160-4529bae287574407bb11f49f85af2402-0d7fc029eb6642328fab418eda63e943 광한루
    // 0000000036-0000000160-4529bae287574407bb11f49f85af2402-e23135a3d12041fda24b64b7214c1117 완월정
    // 0000000036-0000000160-4529bae287574407bb11f49f85af2402-45e3bed3be744d8faab5acbbf079dec8 남원다움관
    // 0000000036-0000000160-4529bae287574407bb11f49f85af2402-152b2ee032474f1db59f83bb6e2aac3d 남원 추어거리
    // 0000000036-0000000160-4529bae287574407bb11f49f85af2402-916e10e999e64c1eb2314ae00c18cd9a 전통한옥 체험시설
    // 0000000036-0000000160-4529bae287574407bb11f49f85af2402-e0c8b40776d74d9f987e68517e9e0a3d 남원 고전소설 문학관

    let signId = null;

    switch(targetList.TOUR_NAME_KOR){
        case '광한루' : {
            signId = '0000000036-0000000160-4529bae287574407bb11f49f85af2402-0d7fc029eb6642328fab418eda63e943'
            console.log('광한루')
        }
        break;

        case '완월정' : {
            signId = '0000000036-0000000160-4529bae287574407bb11f49f85af2402-e23135a3d12041fda24b64b7214c1117'
            console.log('완월정')
        }
        break;

        case '남원다움관' : {
            signId = '0000000036-0000000160-4529bae287574407bb11f49f85af2402-45e3bed3be744d8faab5acbbf079dec8'
            console.log('남원다움관')
        }
        break;

        case '남원 추어거리' : {
            signId = '0000000036-0000000160-4529bae287574407bb11f49f85af2402-152b2ee032474f1db59f83bb6e2aac3d'
            console.log('남원 추어거리')
        }
        break;

        case '전통한옥 체험시설' : {
            signId = '0000000036-0000000160-4529bae287574407bb11f49f85af2402-916e10e999e64c1eb2314ae00c18cd9a'
            console.log('전통한옥 체험시설')
        }
        break;

        case '전통문화 체험시설' : {
            signId = '0000000036-0000000160-4529bae287574407bb11f49f85af2402-916e10e999e64c1eb2314ae00c18cd9a'
            console.log('전통문화 체험시설')
        }
        break;

        case '남원 고전소설 문학관' : {
            signId = '0000000036-0000000160-4529bae287574407bb11f49f85af2402-e0c8b40776d74d9f987e68517e9e0a3d';
            console.log('남원 고전소설 문학관')
        }
        break;
    }

    playSign(signId);
}