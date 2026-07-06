let gameseq = [];
let playerseq = [];
let colors = ["but1", "but2", "but3", "but4"];
let h2 = document.querySelector("h2");
let started = false;
let level = 0;
let highscore = 0;
let high = document.querySelector(".maxscore")
let score=document.querySelector(".score");
document.querySelector("#startBtn").addEventListener("click", function () {
    if (!started) {
        started = true;
        levelup();
    }
});

function levelup() {
    playerseq = []
    level++;
    if (level - 1 > highscore) {
        highscore = level - 1;
    }
    high.innerHTML = `<h3>High Score: ${highscore}</h3>`;
    score.innerHTML = `<h3>Score: ${level-1}</h3>`;
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
        h2.innerHTML = `<b>GAME OVER!!</b><br>YOUR SCORE WAS ${Math.max(level - 1, 0)} <br> press start again`;
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
    if (!started) return;

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
//gsap
gsap.from("#startBtn", {
    y:100,
    opacity: 0,
    scale: 0.8,
    duration: 1,
});
gsap.from("h1", {
    y: -50,
    opacity: 0,
    scale: 0.8,
    duration: 1,
    stagger: 0.2,
    ease: "back.out(1.7)",
    delay: 0.8
});
gsap.from(".box,h2,h3", {
    x: -60,
    opacity: 0,
    duration: 2,
    ease: "power3.out",
    delay:0.6
});
gsap.from(".but1, .but3", {
    opacity: 0,
    x: -200,
    rotation: -270,
    duration: 1.2,
    stagger: 0.2,
    delay: 1.2,
    ease: "back.out(2)"
});
 
gsap.from(".but2, .but4", {
    opacity: 0,
    x: 200,
    rotation: 270,
    duration: 1.2,
    stagger: 0.2,
    delay: 1.2,
    ease: "back.out(2)"
});

