function main_init() {
    resQR = null;
    controlInfo.volume = 5;
    controlInfo.speed = 1;
    controlInfo.font = 62.5;
    playSign("0000000036-0000000160-4529bae287574407bb11f49f85af2402-c0cfd86cdb814b0292ead9906370c584")
};

// 화면 크기
function fn_setfontSizeByFlag(b_chageFlag) {
    if(b_chageFlag){
        switch(controlInfo.font){
            case 62.5 : {
                controlInfo.font = 68.75
            }
            break;

            case 68.75 : {
                controlInfo.font = 75
            }
            break;

            case 75 : {
                return
            }
        }
        document.documentElement.style.fontSize = controlInfo.font + '%';
    }else{
        switch(controlInfo.font){
            case 62.5 : {
                return
            }
            break;

            case 68.75 : {
                controlInfo.font = 62.5
            }
            break;

            case 75 : {
                controlInfo.font = 68.75
            }
        }
        document.documentElement.style.fontSize = controlInfo.font + '%';
    }

    fn_setFontSize(controlInfo.font, true)
}

function fn_setFontSize(n_chageValue) {

    controlInfo.font = n_chageValue;

    $("#ul_fontSize").find("li").each(function () {

        if ($(this).data("font") == controlInfo.font + "") {
            $(this).addClass("active");
        } else {
            $(this).removeClass("active");
        }
    });
}
// 화면 크기

// TTS

function checkFileAndPlay(fileName) {
    const xhr = new XMLHttpRequest();
    let audiofile = "include/tts/" + fileName + ".mp3";
    xhr.open('HEAD', audiofile, true);
    xhr.onload = function () {
        if (xhr.status == 200) {
            // 파일이 존재하는 경우에만 재생합니다.
            $("#reAudio").val(fileName);
            const audioPlayer = document.getElementById("audioPlayer");
            audioPlayer.src = audiofile;
            audioPlayer.style.display = "block";
            audioPlayer.playbackRate = 1;
            audioPlayer.volume = 1;
            audioPlayer.play();
        } else {
            console.error("파일이 존재하지 않습니다.");
            return;
        }
    };
    xhr.send();
}


// Speed
function fn_setAudioSpeedByFlag(b_chageFlag) {
    if (b_chageFlag) {
        if (controlInfo.speed < 2) {
            if (controlInfo.speed == 1) {
                fn_setAudioSpeed(1.5, true)
            } else if (controlInfo.speed == 1.5) {
                fn_setAudioSpeed(2, true)
            }
        }
    } else {
        if (controlInfo.speed > 1) {

            if (controlInfo.speed == 1.5) {
                fn_setAudioSpeed(1, true)
            } else if (controlInfo.speed == 2) {
                fn_setAudioSpeed(1.5, true)
            }
        }
    }
}

function fn_setAudioSpeed(n_chageValue, b_send) {
    controlInfo.speed = n_chageValue;

    $("#ul_audiospeed").find("li").each(function () {

        if ($(this).data("speed") == controlInfo.speed + "") {
            $(this).addClass("active");
        } else {
            $(this).removeClass("active");
        }
    });

    // if (b_send)
    //     fn_sendAudioSpeed();
}

function fn_sendAudioSpeed() {
    tts.SetAudioSpeed(controlInfo.speed);
}
// Speed

// Volume
function fn_setVolumeByFlag(b_chageFlag) {
    let audioVolume = (controlInfo.volume / 10)
    const noteAuido = document.getElementById('noteAudio');

    noteAuido.pause();

    noteAuido.volume = audioVolume;
    noteAuido.currentTime = 0;
    noteAuido.play();

    if (b_chageFlag) {
        if (controlInfo.volume < 10) {
            fn_setVolume(controlInfo.volume + 1, true);
        }
    } else {
        if (controlInfo.volume > 1) {
            fn_setVolume(controlInfo.volume - 1, true);
        }
    }
}

function fn_setVolume(n_chageValue, b_send) {
    controlInfo.volume = n_chageValue;

    $("#ul_volume").find("li").each(function () {

        if ($(this).data("volume") == controlInfo.volume + "") {
            $(this).addClass("active");
        } else {
            $(this).removeClass("active");
        }
    });

    if (b_send)
        fn_sendVolumeFlag();
}

function fn_sendVolumeFlag() {
    if (controlInfo.volume > 10) {
        controlInfo.volume = 10;
    }
    // tts.SetVolume(controlInfo.volume);
}
// Volume
// TTS