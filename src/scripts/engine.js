const state = {

view:{
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
    lives: document.querySelector("#lives"),
   
},
values:{
    timeId:null,
    gameVelocity: 1000,
    hitPosition: 0,
    result:0,
    error:0,
    lives: 4,
    curretTime:60,
},
actions:{
    
    timeId:setInterval(randomSquare,1000 ),
    countDownTimerId: setInterval(countDown, 1000),
}

};

 
function playSound() {
    let audio = new Audio("./src/audios/hit.m4a");
    audio.volume = 0.2
    audio.play();
}

function countDown(){
    state.values.curretTime --;
    state.view.timeLeft.textContent =state.values.curretTime;
    if (state.values.curretTime<=0) {
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timeId);
        alert("O tempo acabou! O seu resultado foi: "+ state.values.result)
    }

}

function randomSquare(){
    state.view.squares.forEach((square)=>{
        square.classList.remove("enemy");
    }) 
    let randomNumber = Math.floor(Math.random()*9);
    let randomSquare = state.view.squares[randomNumber]
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id
}

function addListenerHitBox() {
   state.view.squares.forEach((square)=>{
    square.addEventListener("mousedown", () =>{
        
if (square.id === state.values.hitPosition) {
    state.values.result++;
    state.view.score.textContent = state.values.result;
    state.values.hitPosition = null;
    playSound()

}else{
    state.values.error ++
    if(state.values.error == 4){
        state.values.lives --
        state.values.error = 0;
        state.view.lives.textContent = state.values.lives
    }else if(state.values.lives == 0){
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timeId);
        alert("Game Over! Sua pontuação foi: " + state.values.result)
        initialize();
    }
}
    })
   })
}


function initialize(){
   
    addListenerHitBox();
}
initialize()
