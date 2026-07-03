let gameseq = [];
let playerseq = [];
let colors = ["but1", "but2", "but3", "but4"];
let h2 = document.querySelector("h2");
let started = false;
let level = 0;
let highscore = 0;
let high = document.querySelector(".maxscore")
document.addEventListener("keypress", function () {
    if (started == false) {
        started = true;
        levelup();
    }
})

function levelup() {
    playerseq = []
    level++;
    if (level > highscore) {
        highscore = level;
    }
    h2.innerHTML = `Level ${level}`;
    high.innerHTML = `<h3>HighScore ${highscore - 1}</h3>`
    //producing random color first
    let randIdx = Math.floor(Math.random() * 4);
    let randColor = colors[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameseq.push(randColor);
    gameflash(randBtn);
}

function checkans(idx) {
    if (gameseq[idx] === playerseq[idx]) {
        if (gameseq.length === playerseq.length) {
            setTimeout(levelup, 1000);
        }
    }
    else {
        h2.innerHTML = `<b>GAME OVER!!</b><br>YOUR SCORE WAS ${level - 1} <br> press any key to start again`;
        let main = document.querySelector(".main");
        main.classList.add("gameover");
        setTimeout(() => {
            main.classList.remove("gameover");
        }, 250);
        reset();
    }
}


function gameflash(btn) {
    btn.classList.add("gameflash");
    setTimeout(function () {
        btn.classList.remove("gameflash");
    }, 240);
}

function userflash(btn) {
    btn.classList.add("greenflash");
    setTimeout(function () {
        btn.classList.remove("greenflash");
    }, 259);
}

function pressbtn() {
    let btn = this;
    userflash(btn);
    let usercolor = btn.getAttribute("id");
    playerseq.push(usercolor);
    checkans(playerseq.length - 1);
}
function reset() {
    started = false;
    gameseq = [];
    playerseq = [];
    level = 0;
}

let allbtns = document.querySelectorAll(".but");
for (btn of allbtns) {
    btn.addEventListener("click", pressbtn);
}
