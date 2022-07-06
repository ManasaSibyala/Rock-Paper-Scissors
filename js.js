const game=()=>{
    let pScore=0;
    let cScore=0;
    const playerScore=document.querySelector('.player-score p');
    const computerScore=document.querySelector('.computer-score p');
    const result_div=document.querySelector('.result')
    const introScreen=document.querySelector('.intro');
    const match=document.querySelector('.match');
    const playBtn=document.querySelector('.intro button');
    const resBtn=document.querySelector('.result button');
    document.querySelector('.player-score p').innerHTML=pScore
    document.querySelector('.computer-score p').innerHTML=cScore

    const startGame=()=>{
        playBtn.addEventListener('click',()=>{
            introScreen.classList.add('fadeOut');
            match.classList.add('fadeIn')
        })
    };
    const startMatch=()=>{
        const options=document.querySelectorAll('.options button');
        const hands=document.querySelectorAll('.hands img');
        const playerHand=document.querySelector('.player-hand');
        const computerHand=document.querySelector('.computer-hand');
        //ending animations
        hands.forEach(hand=>{
            hand.addEventListener('animationend',()=>{
                hand.style.animation=''
            })
        })
        //computer options
        computerOptions=['rock','paper','scissors'];
        options.forEach(option=>{
            option.addEventListener('click',function(){
                computerNumber=Math.floor(Math.random()*3);
                computerChoice=computerOptions[computerNumber];
                setTimeout(()=>{
                //calling function to compare user and computer choices
                compareHands(this.textContent,computerChoice);
                //updating images
                playerHand.src=`${this.textContent}.png`;
                computerHand.src=`${computerChoice}.png`;
                },1000)
                playerHand.style.animation='shakePlayer 1s ease';
                computerHand.style.animation='shakeComputer 1s ease';
            })
        })

        const compareHands=(playerChoice,computerChoice)=>{
            const winner=document.querySelector('.winner')
            if(playerChoice===computerChoice){
                winner.textContent="It's a tie";
                //checking Winner
                return;
            }
            if(playerChoice==='rock'){
                if(computerChoice==='paper'){
                    winner.textContent='Computer Wins';
                    cScore++;
                    updateScore()
                    //checking Winner
                    return;
                }else{
                    winner.textContent='Player Wins';
                    pScore++;
                    updateScore()
                    //checking Winner
                    return;
                }
            }
            if(playerChoice==='scissors'){
                if(computerChoice==='paper'){
                    winner.textContent='Player Wins';
                    pScore++;
                    updateScore()
                    return;
                }else{
                    winner.textContent='Computer Wins';
                    cScore++;
                    updateScore()
                    return;
                }
            }
            if(playerChoice==='paper'){
                if(computerChoice==='rock'){
                    winner.textContent='Player Wins';
                    pScore++;
                    updateScore();
                    
                    return;
                }else{
                    winner.textContent='Computer Wins';
                    cScore++;
                    updateScore();
                    
                    return;
                }
            }
        }
        const updateScore=()=>{
            playerScore.textContent=pScore;
            computerScore.textContent=cScore;
            checkWinner()
        }
        const checkWinner=()=>{
            const result=document.querySelector('.result h1')
            if (pScore==5){
                match.classList.remove('fadeIn')
                setTimeout(()=>{
                    result_div.classList.add('fadeIn')
                    result.innerHTML='Player Won!🥳'
                },1000)
            }
            if (cScore==5){
                match.classList.remove('fadeIn')
                setTimeout(()=>{
                result_div.classList.add('fadeIn')
                result.innerHTML='Computer Won!😶'
            },1000)
            }
        }
        
        resBtn.addEventListener('click',()=>{
            pScore=0;
            cScore=0
            playerScore.textContent=pScore;
            computerScore.textContent=cScore;
            result_div.classList.add('declare')
            introScreen.classList.remove('fadeOut');
            game()
            startGame();
            startMatch();
        })
        
    };
    //calling internal functions of game
    startGame();
    startMatch();
}
game();
