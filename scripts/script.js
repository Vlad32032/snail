
// НОДЫ

const buttonStartNode = document.querySelector("#button-start");
const snailBackgroundNode = document.querySelector("#snail-background");
const snailEarthNode = document.querySelector("#snail-earth");
const backgroundShadowNode = document.querySelector("#background-shadow");
const snailNode = document.querySelector("#snail");
const timeNode = document.querySelector("#time");
const dayNode = document.querySelector("#day");
const lenghtNode = document.querySelector("#lenght");

// ПЕРЕМЕННЫЕ

let on = false;
let day = 0;
let time = 6;
let lenght = 0;
let snailPosition = 0;
let snailDayPosition = -140;
let snailEveningPosition = -295;
let snailNightPosition = -440;

// ОБРАБОТЧИКИ

buttonStartNode.addEventListener("click", () => {
    if (on) {
        on = false;
        day = 0;
        time = 6;
        lenght = 0;
        snailNode.style.left = `${0}px`;
        snailNode.style.top = `${snailDayPosition}px`;
        timeNode.innerHTML = `Время: ${time} часов`
        dayNode.innerHTML = `День: ${day}-й`;
        lenghtNode.innerHTML = `Расстояние: ${lenght}м`;
        console.log(on);
    } else {
        on = true;
        console.log(on);
    }

    if (on) {
        dayCounter();
        moveDecor(snailBackgroundNode, 30);
        moveDecor(snailEarthNode, 10);
}});

// ФУНКЦИИ

function snailMoveDay() {
    snailPosition++;
    if (snailPosition > 3) {
        snailPosition = 0; 
    }
    snailNode.style.left = `-${snailPosition * 150}px`;
};

function snailMoveNight() {
    if (time === 20 || time === 6) {
        snailNode.style.left = `${0}px`;
        snailNode.style.top = `${snailEveningPosition}px`;
    }
    if (time === 21 || time === 5) {
        snailNode.style.left = `${0}px`;
        snailNode.style.top = `${snailNightPosition}px`;
    }
    if (time === 22 || time === 4) {
        snailNode.style.left = `${-180}px`;
        snailNode.style.top = `${snailNightPosition}px`;
    }
    if (time === 23 || time === 3) {
        snailNode.style.left = `${-378}px`;
        snailNode.style.top = `${snailNightPosition}px`;
    }
};

function moveDecor(Node, timeMove) {
    let a = 0;
    let timerId = setInterval(() => {
        if (time > 6 && time < 20 ) {
            a -= 1;
        }
        if (time < 5 || time > 21) {
            a += 1;
        }
        Node.style.backgroundPositionX = `${a}px`;
    }, timeMove);
    buttonStartNode.addEventListener("click", () => clearInterval(timerId));
};

function dayCounter () {
    let timerId = setInterval(() => {
        if (time < 24) {
            time++;
            timeNode.innerHTML = `Время: ${time} часов`

            if (time > 6 && time < 20 ) {
                if (time === 7) {
                    snailPosition = 0;
                    snailNode.style.top = `${snailDayPosition}px`;
                }
                snailMoveDay();
            }
            if (time <= 6 || time >= 20) {
                snailMoveNight();
            }
            if(time === 20) {
                    letNight();
            }
        } else {
            time = 1;
            day++;
            dayNode.innerHTML = `День: ${day}-й`;
        }
        lenghtCounter ()
    }, 300);
    buttonStartNode.addEventListener("click", () => clearInterval(timerId));
};

function lenghtCounter () {
    if (time === 1 || time === 5) {
        lenght--;
        lenghtNode.innerHTML = `Расстояние: ${lenght}м`;
    }
    if ((time > 9 && time < 19 ) && time % 2 === 0) {
        lenght++;
        lenghtNode.innerHTML = `Расстояние: ${lenght}м`;
    }
}

function letNight () {
        let iTime = 1;
        for (let i = 1; i < 6; i++) {
            setTimeout(() => {backgroundShadowNode.style.backgroundColor = `rgb(0, 0, 0, 0.${i})`}, iTime * 300);
            iTime++;
        }

        for (let i = 4; i > -1; i--) {
            setTimeout(() => {backgroundShadowNode.style.backgroundColor = `rgb(0, 0, 0, 0.${i})`}, iTime * 300);
            iTime++;
        }
};
