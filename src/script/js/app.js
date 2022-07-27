"use strict";
//================= UI =================
const UI = {
    header: {
        toGarageBtn: document.querySelector('#to-garage'),
        toWinnersBtn: document.querySelector('#to-winners'),
    },
    form: {
        formCreate: document.querySelector('#garage-form-create'),
        formUpdate: document.querySelector('#garage-form-update'),
        nameInput: document.querySelector('#name-input'),
        colorInput: document.querySelector('#color-input'),
        createBtn: document.querySelector('#create-btn'),
        nameInputUpdate: document.querySelector('#name-input-update'),
        colorInputUpdate: document.querySelector('#color-input-update'),
        updateBtn: document.querySelector('#update-btn')
    },
    menu: {
        raceBtn: document.querySelector('#race-btn'),
        resetBtn: document.querySelector('#reset-btn'),
        generateCarsBtn: document.querySelector('#generate-cars-btn')
    },
    garage: {
        carsNum: document.querySelector('#cars-num-garage'),
        pageNumGarage: document.querySelector('#page-num-garage'),
    },
    article: {
        selectBtn: document.querySelector('#select-btn'),
        removeBtn: document.querySelector('#remove-btn'),
        title: document.querySelector('#article-title'),
        startBtn: document.querySelector('#start-btn'),
        breakBtn: document.querySelector('#break-btn'),
        carImg: document.querySelector('#car-img'),
        flagImg: document.querySelector('#flag-img'),
    },
    footer: {
        prevBtn: document.querySelector('#prev-btn'),
        nextBtn: document.querySelector('#next-btn')
    },
    winners: {
        winnersNum: document.querySelector('#winners-num'),
        pageNumWinners: document.querySelector('#page-num-winners')
    }
};
for (let key in UI) {
    console.log(UI[key]);
}
