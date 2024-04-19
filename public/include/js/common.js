const signCharacter = document.querySelector('.sign_character');
const includePop = document.getElementById("div_pop");
const includeDiv = document.getElementById("div_main_container");
const footer = document.getElementById('footer');
const nowPage = document.getElementById('nowPage')
const body = document.body;
const controlInfo = {'volume' : 5, 'speed' : 1, 'font' : 62.5,}

let timeoutIDs = new Array;
let intervalIDs = new Array;
let cameraData = null;
let selectData = null;
let resParams = null;
let resName = null;
let qrmgName = null;
let voicePopFlag = true;
let reverseFlag = true;
let signFlag = true;
let pageFlag = true;
let timer = null;
let backSecond = 300;
let pinchInfo;

function getUrl(){
    let urlBtn = document.querySelectorAll('.btn_url');
    urlBtn.forEach((v, i) => {
        v.addEventListener('click', (e) => {
            e.preventDefault();

            if(v.classList.contains('active')){ return; }
            
            let link = v.getAttribute('data-link');
            let sign = v.getAttribute('data-sign');
            let params = {'link' : link, 'sign' : sign};

            goPage(params)
        })
    })
}

function goPop(params){
    const popTitle = document.getElementById('popupTitle');
    const popAddress = document.getElementById('popUpAddress');
    const mapDiv = document.getElementById('Map');

    // 초기화
    popTitle.innerHTML = '';
    popAddress.innerHTML = '';
    mapDiv.innerHTML = '';
    // 초기화

    function getMapSize(){
        let size = new naver.maps.Size(1010, 1250);
        return size;
    }

    const map = new naver.maps.Map('Map', {
        center: new naver.maps.LatLng(parseFloat(params.lat), parseFloat(params.lon)),
        zoom: 17
    });

    const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(parseFloat(params.lat), parseFloat(params.lon)),
        map: map
    });

    map.setSize(getMapSize());

    popTitle.innerHTML = params.name;
    popAddress.innerHTML = params.address;
    includePop.style.display = 'block';
}

function closePop(){
    includePop.style.display = 'none';
}

function goPage(params){
    if(pageFlag){
        pageFlag = false;
        footer.style.display = params.link === 'intro'? 'none' : 'block';

        includeDiv.style.opacity = 0;
        includeDiv.style.transition = 'none';

        params.sign === 'N'
            ? body.classList.add('sign_remove')
            : body.classList.remove('sign_remove');
    
        fn_includeHTML(params.link);
        nowPage.value = params.link;
        pageFlag = true;
        
        setTimeout(() => {
            includeDiv.style.opacity = 1;
            includeDiv.style.transition = 'opacity 1s';
            setTimeout(() => { getUrl() }, 200)
        },150)


    }else{
        return;
    }
}

// INCLUDE START
async function fn_includeHTML(url) {
    try {
        const res = await fetch(url + '.html');
        const html = await res.text();
        includeDiv.innerHTML = html;

        fn_includeScript(url);
    } catch (error) {
        console.error(error);
    }
}

async function fn_includeScript(url) {
    try {
        const res = await fetch('./include/js/page/' + url + '.js');
        if (res.ok) {
            const script = document.createElement('script');
            script.src = './include/js/page/' + url + '.js';

            script.onload = () => {
                setTimeout(() => {
                    window[url.toLocaleLowerCase() + '_init']();
                }, 50)
            }
            includeDiv.prepend(script);
        } else if(res.status === 404){
            console.log(url + '.js 파일이 없습니다.');
        }else {
            console.log('파일을 가져오는 중에 에러가 발생했습니다.')
        }
    } catch (error) {
        console.error(error);
    }
}

// fn_includeHTML이 실행된 후 fn_includeScript가 실행되도록 호출
async function includeHTMLAndScript(url) {
    await fn_includeHTML(url);
    await fn_includeScript(url);
}
// INCLUDE END

//컨트롤 popup
function openModal(name) {
    if (voicePopFlag != null) {
        clearTimeout(voicePopFlag);
        voicePopFlag = null;
    }

    let b_open = true;
    $(".voice_pop").each(function () {
        if ($(this).hasClass(name) && $(this).css("display") == "block") {
            b_open = false;
        }
        else {
            $(this).fadeOut();
        }
    });

    if (b_open)
        $("." + name).fadeIn();
        voicePopFlag = setTimeout(() => {
        $("." + name).fadeOut();
    }, 1000);
}

// 스크린세이버
function startTimer(sec){
    clearTimeout(timer);
    timer = setTimeout(returnScreen, sec * 1000)
}

function returnScreen(){
    controlInfo.volume = 5;
    controlInfo.speed = 1;
    controlInfo.font = 62.5;

    document.documentElement.style.fontSize = controlInfo.font + '%';
    fn_setAudioSpeed(controlInfo.speed, true)
    fn_setVolume(controlInfo.volume, true)

    body.classList.remove('sign_on');
    signBtn.classList.remove('active');
    signBtn.textContent = 'OFF';

    body.classList.remove('reverse');
    reverseBtn.classList.remove('active');
    reverseBtn.textContent = 'OFF';

    includePop.style.display = 'none';

    goPage({'link' : 'intro', 'sign' : 'N'})
}

function resetTimer() {
    clearTimeout(timer);
    startTimer(backSecond); // 사용자의 동작 감지 후 10초 후에 돌아감
}
// 스크린세이버

// TTS
function playTTS(ttsId){

}
// TTS

// 수어
function playSign(signId){
    webGLPlayer.sendSentenceIdToPlayer(signId, (callback) => {console.log(callback)});
}

function reSign(){
    webGLPlayer.replay((callback) => {console.log(callback)});
}

function stopSign(){
    webGLPlayer.stop();
}

function pauseSign(){
    webGLPlayer.pause();
}

function resumeSign(){
    webGLPlayer.resume();
}
// 수어