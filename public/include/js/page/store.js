storeSwiper = null;

function store_init() {
    playSign('0000000036-0000000160-4529bae287574407bb11f49f85af2402-ac7e9994edc54af18cc27975df1b4be5')
    makeStore();
    document.getElementById('signBtn').addEventListener('click', (e) => {
        e.preventDefault();
        nowPage.value === 'store' ? makeStore() : null;
    })
}

function makeStore() {
    let swiperCount = 0;
    let divCnt = body.classList.contains('sign_on') ? 4 : 6

    let storeCnt = Math.round(DataList.storeList.length / divCnt);
    let storeDiv = '';

    for (let i = 0; i < storeCnt; i++) {
        storeDiv += `<div class="swiper-slide" id="swiper${i + 1}">
                        <ul></ul>
                    </div>`
    }

    if (document.querySelectorAll('#storeSwiper .swiper-wrapper')[0]) {
        document.querySelectorAll('#storeSwiper .swiper-wrapper')[0].innerHTML = storeDiv;
    }

    DataList.storeList.map((v, i) => {
        let name = v.STORE_NAME_KOR;
        let address = v.STORE_ADDRESS_KOR;
        let lat = v.STORE_LAT;
        let lon = v.STORE_LON;
        let id = v.id;

        let storeHtml = `
        <li class="list_shadow" data-name="${name}" data-address="${address}" data-lat="${lat}" data-lon="${lon}" data-id="${id}" onclick="onClickStoreInfo(this)">
                <div class="item">
                    <div class="img_box">
                        <img src="${v.FILE_URL[0]}" alt="${v.STORE_NAME_KOR}">
                    </div>
                    <div class="txt_box">
                        <div class="txt">
                            <span>${v.STORE_NAME_KOR}</span>
                        </div>
                        <button class="location">
                            <img src="./images/common/location.svg" alt="위치안내">
                        </button>
                    </div>
                </div>
            </li>
            `

        if (i % divCnt === 0) {
            swiperCount++;
        }
        document.getElementById('swiper' + swiperCount).querySelector('ul').innerHTML += storeHtml;
    })

    SwiperInit();
}

function SwiperInit() {
    if (storeSwiper != null) storeSwiper.destroy();

    storeSwiper = new Swiper(".swiper", {
        slidesPerView: 1,
        spaceBetween: 90,
        pagination: {
            el: ".store-pagination",
        },
        navigation: {
            nextEl: ".store-button-next",
            prevEl: ".store-button-prev",
        },
    });
}

function onClickStoreInfo(target) {
    playSign('0000000036-0000000160-4529bae287574407bb11f49f85af2402-ac7e9994edc54af18cc27975df1b4be5');
    
    const name = target.getAttribute('data-name');
    const id = target.getAttribute('data-id');
    const address = target.getAttribute('data-address');
    const lat = target.getAttribute('data-lat');
    const lon = target.getAttribute('data-lon');

    let params = {
        "name": name,
        "address": address,
        "id": id,
        "lat": lat,
        "lon": lon
    };

    goPop(params);
}