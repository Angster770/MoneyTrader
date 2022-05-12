"use strict";

// TASKS
/*
1. Make log out func
a. Make func that will opactiy container to 0 and back to 100
b .set the timer interval timer to start going once logged in 
restart from any action from begining
beware to reset properly
get the dom of timer
let timer time 500
login func () => {
  timer interval {
    d
    get minutes and seconds

    , 1000
  }
}

*/

// calc funds
// const calcFunds = function (acc) {
//   acc.transactions.reduce((acc, cur) => acc + cur, 0);
// };
// .reduce((acc, cur) => acc + cur, 0);

// Data
const berel = {
  username: "berel",
  pin: 1111,
  transactions: [23, 45, -1],
};
// console.log(berel.calcFunds());
const shmerel = {
  username: "shmerel",
  pin: 2222,
  transactions: [21, 32, -4],
};

const accounts = [berel, shmerel];

// ELEMENTS
// container
const mainContainer = document.querySelector(".mainContainer");

// -- Buttons
const loginButton = document.querySelector(".loginButton");
const transButton = document.querySelector(".transButton");

//-- Inputs
const inputUsername = document.querySelector(".inputUN");
const userNameText = document.querySelector(".username");
const inputPin = document.querySelector(".inputPin");
const inputRecipient = document.querySelector(".recipientInput");
const inputBorrow = document.querySelector(".borrowInput");
const inputGive = document.querySelector(".giveInput");

// welcome
const welcomeUsername = document.querySelector(".username");

// --Displays
const moneyDisplay = document.querySelector(".money");
const transactionAmount = document.querySelector(".transactionRow");
const transactionContainer = document.querySelector(".transactionContainer");
const dateRow = document.querySelector(".dateRow");
const timerDisplay = document.querySelector(".timer");

// FUNCTIONS
//-- update Moneys
const updateDisplayFunds = () => {
  moneyDisplay.textContent = `${currentAccount.funds}`;
  console.log(currentAccount.funds);
};

// update the transaction of that account
const transactionFunc = () => {
  transactionAmount.innerHTML = "";
  currentAccount.transactions.forEach((trans) => {
    if (trans !== 0) {
      const html = `<p>${trans}</p>`;
      transactionAmount.insertAdjacentHTML("afterbegin", html);
    }
  });
};

//find Recipient
const findRecip = () => {
  if (accounts.find((acc) => acc.username === inputRecipient.value)) {
    if (inputRecipient.value !== currentAccount.username) {
      recipient = accounts.find((acc) => acc.username === inputRecipient.value);
      console.log(recipient);
    } else console.log("no");
  }
};

// Calc funds of transactions for account
const calcFunds = function () {
  accounts.forEach((acc) => {
    return (acc.funds = acc.transactions.reduce((acc, cur) => acc + cur, 0));
  });
};
calcFunds();

// enable borrowing input from other account
const borowFunc = function (recip, current) {
  if (recip.username !== current.username) {
    if (inputGive.value.length == 0) {
      if (inputBorrow.value < recip.funds) {
        current.transactions.push(Number(inputBorrow.value));
        recip.transactions.push(Number(inputBorrow.value) * -1);
      }
    }
  }
};

// enable giving input from other account
const giveFunc = function (recip, current) {
  if (recip.username !== current.username) {
    if (inputBorrow.value.length == 0) {
      if (inputGive.value < current.funds) {
        recip.transactions.push(Number(inputGive.value));
        current.transactions.push(Number(inputGive.value) * -1);
      }
    }
  }
};

// starts timer upon login / actions
const startTimerFunc = function () {
  const tick = () => {
    const minute = time / 60;
    const sec = time % 60;
    const countDownText = `${String(Math.trunc(minute)).padStart(
      2,
      0
    )}: ${String(sec).padStart(2, 0)}`;

    timerDisplay.textContent = `${countDownText}`;
    if (time === 0) {
      clearInterval(timer);
      mainContainer.style.opacity = 0;
      welcomeUsername.textContent = "Please Sign In";
    }
    time--;
  };

  let time = 150;

  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

// setting time to 8:20 mins

// dates to trans func
const dateTransUpdate = function () {
  dateRow.innerHTML = "";
  currentAccount.transactions.forEach((trans) => {
    if (trans !== 0) {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDay();
      const html = `<p>${year}/ ${month.toString().padStart(2, 0)}/${day
        .toString()
        .padStart(2, 0)}</p>`;
      dateRow.insertAdjacentHTML("afterbegin", html);
      // dateRow.innerHTML
    }
  });
};
// EVENT HANDLERS
// globals
let currentAccount, recipient, timer;

// page set to 0 opacity to hide data in order to log in
mainContainer.style.opacity = 0;
// login - updates welcome / moneys
loginButton.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    accounts.find(
      (acc) =>
        acc.username === inputUsername.value &&
        acc.pin === Number(inputPin.value)
    )
  ) {
    currentAccount = accounts.find(
      (acc) => acc.username === inputUsername.value
    );
    const nameUser = currentAccount.username;
    welcomeUsername.textContent = `Welcome ${
      nameUser.charAt(0).toUpperCase() + nameUser.slice(1)
    } `;
    mainContainer.style.opacity = 100;

    console.log(currentAccount);
    console.log(recipient);
    // clears moneys from previous user
    // clearMoneys();
    // update moneys
    // cacl total funds of account
    calcFunds();

    updateDisplayFunds();

    // update transaction
    transactionFunc();

    // update dates
    dateTransUpdate();

    // start timer
    if (timer) clearInterval(timer);
    timer = startTimerFunc();
  } else {
    console.log("no");
  }
});

transButton.addEventListener("click", function (e) {
  e.preventDefault();
  findRecip();
  giveFunc(recipient, currentAccount);
  borowFunc(recipient, currentAccount);

  dateTransUpdate();

  // update transaction
  transactionFunc();

  // cacl total funds of account
  calcFunds();

  // updates display of funds
  updateDisplayFunds();

  // start timer
  if (timer) clearInterval(timer);
  timer = startTimerFunc();

  console.log(recipient, "r");
  console.log(currentAccount, "ca");
  console.log(inputBorrow.value, "borw");
  console.log(inputGive.value, "giv");
  // if(recipient.funds)
});
