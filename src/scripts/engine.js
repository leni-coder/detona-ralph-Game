
const state = {

view:{
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
    lives: document.querySelector("#lives"),
    erros: document.querySelector("#erros"),
    btn: document.querySelector("#startStop"),
    

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

    // timeId:setInterval(randomSquare,1000 ),
    timeId:setInterval(null ),
    // countDownTimerId: setInterval(countDown, 1000),
    countDownTimerId: setInterval(null)

}

};
let count = 0;

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
 
 //  soma dos pontos
 if (square.id === state.values.hitPosition) {
    state.values.result++;
    state.view.score.textContent = state.values.result;
    state.values.hitPosition = null;
    playSound()
    if (state.values.result == 10) {
        state.values.gameVelocity = 1000/0.2
        state.actions.timeId = setInterval(randomSquare, state.values.gameVelocity);
        state.values.curretTime = state.values.curretTime + 5
        
    }
    if (state.values.result == 30) {
        state.values.gameVelocity = 1000/0.3
        state.actions.timeId = setInterval(randomSquare, state.values.gameVelocity);
        state.values.curretTime = state.values.curretTime + 10
        
    }
    if (state.values.result == 40) {
        state.values.gameVelocity = 1000/0.4
        state.actions.timeId = setInterval(randomSquare, state.values.gameVelocity);
        state.values.curretTime = state.values.curretTime + 10
        state.values.lives ++
        state.view.lives.textContent = state.values.lives
    }
    if (state.values.result == 50) {
        state.values.gameVelocity = 1000/0.5
        state.actions.timeId = setInterval(randomSquare, state.values.gameVelocity);
        state.values.curretTime = state.values.curretTime + 10
        state.values.lives = state.values.lives +2
        state.view.lives.textContent = state.values.lives
    }
    

}
// soma dos erros
else{
    state.values.error ++
    state.view.erros.textContent = state.values.error   
    if(state.values.error == 4){
        state.values.lives --
        state.values.error = 0;
        state.view.lives.textContent = state.values.lives
    }
    // Vidas finalizadas Game Over
    else if(state.values.lives == 0){
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timeId);
        alert("Game Over! Sua pontuação foi: " + state.values.result)
        initialize()
    }
    
}
    })
   })
}

function startStop() {
    if (count ==0) {
        startGame();
        
      
        count++
    }else{
        stopGame();
        count--
    }
   
}
function stopGame() {
    // parar os intervalos
 
    state.view.btn.value = "Pause" // Atualizar texto do botão

// Pausar o jogo
clearInterval(state.actions.timeId);
clearInterval(state.actions.countDownTimerId);

state.values.isPaused = true; // Atualizar estado

}
function startGame() {
    // Retomar o jogo
  
    state.actions.timeId = setInterval(randomSquare, state.values.gameVelocity);
    state.actions.countDownTimerId = setInterval(countDown, 1000);
    state.view.btn.value = "Play"
      state.values.isPaused = false; // Atualizar estado
      initialize()
}
function initialize(){
   addListenerHitBox();
}

// initialize()

