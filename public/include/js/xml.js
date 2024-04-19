const gl_xml_conf = {
    url_data: "xml/kiosk_contents.xml",
    xml_data: new Object()
}

const DataList = new Object();

window.addEventListener('DOMContentLoaded', function () {
    document.getElementById('progressBar').style.width = '10%';
    setTimeout(setInit, 50);
});

function setInit() {
    // XML 파일 가져오기
    fetchXML(gl_xml_conf.url_data)
        .then(xmlData => {
            const jsonData = xmlToJson(xmlData);
            gl_xml_conf.xml_data = jsonData;

            DataList.header = gl_xml_conf.xml_data.HEADER;
            DataList.eventList = gl_xml_conf.xml_data.EVENT_LIST.EVENT_INFO;
            DataList.hotelList = gl_xml_conf.xml_data.HOTEL_LIST.HOTEL_INFO;
            DataList.noticeList = gl_xml_conf.xml_data.NOTICE_LIST.NOTICE_INFO;
            DataList.storeList = gl_xml_conf.xml_data.STORE_LIST.STORE_INFO;
            DataList.tourList = gl_xml_conf.xml_data.TOUR_LIST.TOUR_INFO;
        });

        fetch('./include/json/camera.json')
        .then(res => res.json())
        .then(data => {cameraData = data;})

        document.getElementById('progressBar').style.width = '70%';
        setTimeout(setEnd, 50);
}

function setEnd() {
    document.getElementById('progressBar').style.width = '100%';

    setTimeout(() => {
        document.getElementById('loadingBar').remove();
        goPage({'link': 'intro', 'sign': 'N'})
        index_init();
    }, 1000)
}

async function fetchXML(url) {
    try {
        const response = await fetch(url);
        const xmlData = await response.text();
        return xmlData;
    } catch (error) {
        console.error('Error fetching XML:', error);
    }
}

// XML을 JSON으로 변환하는 함수
function xmlToJson(xmlData) {
    return $.xml2json(xmlData);
}