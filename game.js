const gameSummary = {
    number: 0,
    wins: 0,
    losses: 0,
    draws: 0,
}

const game = {
    playerHand: "",
    playerHandHTML: "",
    aiHand: ""
}

const hands = [...document.querySelectorAll(".select img")];
console.log(hands)

const btnStart = document.querySelector(".start");

function handSelection(e) {
    console.log(e.currentTarget);
    console.log(e.target);
    console.log(this);
    game.playerHand = this.dataset.option; 
    game.playerHandHTML = this; 

    hands.forEach(hand => hand.style.boxShadow = "");
    this.style.boxShadow = "0 0 0 4px yellow";
}

function startGame() {
    if (!game.playerHand) return alert("wybierz dłoń!")

    game.playerHandHTML.style.boxShadow = "";

    game.aiHand = computerChoice();
    console.log(game.playerHand)

    const gameResult = checkResult(game.playerHand, game.aiHand) //moj wybór i wybór komputera

    publishResult(game.playerHand, game.aiHand, gameResult)
}

function computerChoice() {
    const drawHand = Math.floor(Math.random() * 3);
    return hands[drawHand].dataset.option; 
}

function publishResult(player, ai, result) {
    console.log(result)
    wyborGraczaHtml.textContent = player;
    wyborAiHtml.textContent = ai;

    gameSummary.number++
    numberAllGame.textContent = gameSummary.number;

    if (result === "win") {
        gameSummary.wins++
        numberAllWins.textContent = gameSummary.wins;
        ktoWygralHtml.style.color = "cadetblue";
        ktoWygralHtml.textContent = "TY!"
    } else if (result === "loss") {
        gameSummary.losses++
        numberAllLoses.textContent = gameSummary.losses;
        ktoWygralHtml.style.color = "red";
        ktoWygralHtml.textContent = "komputer :(";
    } else {
        gameSummary.draws++
        numberAllDraws.textContent = gameSummary.draws;
        ktoWygralHtml.style.color = "gray";
        ktoWygralHtml.textContent = "Remis"
    }

    game.playerHand = "";
}

function checkResult(player, ai) {
    console.log(`player wybrał ${player}`)
    console.log(`ai wybrał ${ai}`)
    if (player == ai) return "draw"
    else if ((player === "papier" && ai === "kamień") || (player === "kamień" && ai === "nożyczki") || (player === "nożyczki" && ai === "papier")) return "win"
    else if ((player === "papier" && ai === "nożyczki") || (player === "kamień" && ai === "papier") || (player === "nożyczki" && ai === "kamień")) return "loss"
    else return "draw"
}

const wyborGraczaHtml = document.querySelector('[data-summary="your-choice"]')
const wyborAiHtml = document.querySelector('[data-summary="ai-choice"]')
const ktoWygralHtml = document.querySelector('[data-summary="who-win"]')
console.log(wyborAiHtml);
const wyborAI = document.querySelector(".panel-left p:nth-of-type(2)")

const numberAllGame = document.querySelector(".numbers span")
const numberAllWins = document.querySelector(".wins span")
const numberAllLoses = document.querySelector(".losses span")
const numberAllDraws = document.querySelector(".draws span")

hands.forEach(hand => hand.addEventListener("click", handSelection))
btnStart.addEventListener("click", startGame);
