function index_init() {
    document.addEventListener("mousemove", resetTimer);
    document.addEventListener("keypress", resetTimer);

    const ttsBtn = document.querySelectorAll('.btn_tts');
    const homeBtn = document.getElementById('btnHome');
    const signBtn = document.getElementById('signBtn');
    const reverseBtn = document.getElementById('reverseBtn');
    const noSignArr = ['camera', 'camera_result'];
    let signPopFlag = true;

    ttsBtn.forEach(v => {
        v.addEventListener('click', (e) => {
            e.preventDefault();
            let thisTTS = v.getAttribute('data-tts');
            checkFileAndPlay(thisTTS);
        })
    })

    // 홈버튼
    homeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        checkFileAndPlay('SPEAK32_');
        clearAllInterval();
        goPage({'link': 'main'})
    })

    // 수어안내 버튼
    signBtn.addEventListener('click', function (e) {
        e.preventDefault();
        checkFileAndPlay('SPEAK38_');
        reSign();
        
        if (noSignArr.some(v => v === nowPage.value)) {
            if (signPopFlag != null) {
                clearTimeout(signPopFlag);
                signPopFlag = null;
            }

            $('.sign_pop').fadeIn();

            signPopFlag = setTimeout(() => {
                $('.sign_pop').fadeOut();
            }, 1000);

        } else {
            if (signFlag) {
                signFlag = false;
                if (this.classList.contains('active')) {
                    body.classList.remove('sign_on');
                    this.classList.remove('active');
                    this.textContent = 'OFF';
                } else {
                    body.classList.add('sign_on');
                    this.classList.add('active');
                    this.textContent = 'ON';
                }
                signFlag = true;
            }
        }
    })
    // 수어안내 버튼

    // 고대비 버튼
    reverseBtn.addEventListener('click', function (e) {
        e.preventDefault();
        if (reverseFlag) {
            if (this.classList.contains('active')) {
                body.classList.remove('reverse');
                this.classList.remove('active')
                this.textContent = 'OFF';

            } else {
                body.classList.add('reverse');
                this.classList.add('active')
                this.textContent = 'ON';
            }

            reverseFlag = true;
        }
    })
    // 고대비 버튼
}

// 초기화 함수
function clearAllInterval(){
    let originalSetTimeout = window.setTimeout;
    window.setTimeout = function(func, delay) {
        let timeoutID = originalSetTimeout(func, delay);
        timeoutIDs.push(timeoutID);
        return timeoutID;
    };
    
    let originalSetInterval = window.setInterval;
    window.setInterval = function(func, delay) {
        let intervalID = originalSetInterval(func, delay);
        intervalIDs.push(intervalID);
        return intervalID;
    };

    clearAllTimeoutsAndIntervals();
}

function clearAllTimeoutsAndIntervals() {
    timeoutIDs.forEach(function(id) { clearTimeout(id); });
    intervalIDs.forEach(function(id) { clearInterval(id); });
    timeoutIDs = [];
    intervalIDs = [];
}