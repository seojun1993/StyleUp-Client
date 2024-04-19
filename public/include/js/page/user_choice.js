function user_choice_init(){
    playSign('0000000036-0000000160-4529bae287574407bb11f49f85af2402-a376a58ae2654473bf9690b29891c2e9');
    document.querySelectorAll('.btn_choice').forEach(v => { v.addEventListener('click', () => {selectData = v.getAttribute('data-select');})})
}