let Body = document.querySelector("body");
let Title = document.querySelector("#headTitle");
let Boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let MsgContainer = document.querySelector(".msg");
let Result = document.querySelector(".DispResult");
let Theme = document.querySelector("#Mode");
let count = 0;

const winPatterns = [ //These are the patterns when a player can win 

    [0, 1, 2],  //        |       |
    [3, 4, 5],  //       0|      1|      2
    [6, 7, 8],  // -------|-------|-------
    [0, 3, 6],  //        |       |
    [1, 4, 7],  //       3|      4|      5
    [2, 5, 8],  // -------|-------|-------
    [0, 4, 8],  //        |       |
    [2, 4, 6],  //       6|      7|      8
];

const disableBtns = () => { //Disable boxes when we get winner
    for (let box of Boxes) {
        box.disabled = true;
    }
}
const enableBtns = () => { //Enable boxes when game resets
    for (let box of Boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

let turn_X = true; //Initialise first turn of X 
Boxes.forEach((box) => { //Function to operate on each box
    box.addEventListener("click", () => { //When clicked
        count++;
        if (turn_X === true) {
            box.innerText = "X";
            box.style.backgroundColor = "#C4DFE8";
            turn_X = false; //Giving turn to the nexxt player i.e "X"
        } else {
            box.innerText = "O";
            box.style.backgroundColor = "#F0D0D0";
            turn_X = true; //Giving turn to first player i.e. "O"
        }
        box.disabled = true; //Disabling box when we get winner
        Winner();
    });
});

function Draw() {
    console.log("Match Draw");
    MsgContainer.innerText = "Match Draw";
    MsgContainer.classList.remove("hide");
}
function ShowWinner(winner) {
    console.log(`Winner is ${winner}`);
    MsgContainer.innerText = `Winner is ${winner}`;
    MsgContainer.classList.remove("hide");
    disableBtns();
}
const Winner = () => {
    let gameWon = false;

    for (let i of winPatterns) {
        let pos1Val = Boxes[i[0]].innerText;
        let pos2Val = Boxes[i[1]].innerText;
        let pos3Val = Boxes[i[2]].innerText;

        if (pos1Val !== "" && pos1Val === pos2Val && pos2Val === pos3Val) { //Check if the three positions match and are not empty
            gameWon = true; //A winner has been found
            ShowWinner(pos1Val); //Show the winner
            break; //Exit the loop since we have found a winner
        }
    }

    if (!gameWon && count === 9) {
        Draw();
    }
}

let currTheme = darkMode;
function lightMode() {
    // Body.style.backgroundImage = "url('file:///D:/lightTTT.jpg'), linear-gradient(rgba(240, 247, 244, 0), rgba(240, 247, 244, 0))";
    Body.style.backgroundSize = "auto";
    Body.style.backgroundRepeat = "repeat";
    Body.style.backgroundPosition = "center";
    Boxes.forEach(box => {
        box.style.backgroundColor = "#687C71";
    });
    Title.style.color = "#2E3C34";
    resetBtn.style.backgroundColor = "rgb(91, 96, 93)";
    resetBtn.style.color = "#F0F7F4";
    MsgContainer.style.color = "rgb(255, 255, 255)";
    MsgContainer.style.backgroundColor = "rgb(40, 97, 69)";
    Result.style.color = "black";
    Result.style.backgroundColor = "#A1D4E8"
    Result.style.border = "5px solid rgb(95, 104, 99)";
    Theme.style.backgroundColor = "rgb(95, 104, 99)";
    Theme.style.color = "#F0F7F4";
    Body.style.backgroundColor = "#E8E8E8"
}

function darkMode() {
    // Body.style.backgroundImage = "url('file:///D:/darkTTT.jpg'), linear-gradient(rgba(3, 43, 67, 0.8), rgba(3, 43, 67, 0.8))";
    Body.style.backgroundSize = "auto";
    Body.style.backgroundRepeat = "repeat";
    Body.style.backgroundPosition = "center";
    Boxes.forEach(box => {
        box.style.backgroundColor = "aliceblue";
    });
    Title.style.color = "#ddedf5";
    resetBtn.style.color = "aliceblue";
    resetBtn.style.backgroundColor = "#136F63";
    MsgContainer.style.color = "#D00000";
    MsgContainer.style.backgroundColor = "#FFBA08";
    Result.style.color = "white";
    Result.style.backgroundColor = "#3F88C5";
    Result.style.border = "5px solid  #136F63";
    Theme.style.backgroundColor = "#136F63";
    Theme.style.color = "aliceblue";
    Body.style.backgroundColor = "#032B43"
}
darkMode();
Theme.addEventListener("click", () => {
    if (currTheme === darkMode) {
        currTheme = lightMode;
        lightMode();
    } else {
        currTheme = darkMode;
        darkMode();
    }
});

const Reset = () => {
    turn_X = false;
    count = 0;
    enableBtns();
    Boxes.forEach((box) => {
        if (currTheme === lightMode) {
            box.style.backgroundColor = "#687C71";
        } else {
            box.style.backgroundColor = "aliceblue";
        }

    });
    MsgContainer.classList.add("hide")
}
resetBtn.addEventListener("click", Reset);

