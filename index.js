'strict mode'

const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-07-26T17:01:17.194Z",
    "2020-07-28T23:36:17.929Z",
    "2020-08-01T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};
  
  const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
    movementsDates: [
  "2019-11-01T13:15:33.035Z",
  "2019-11-30T09:48:16.867Z",
  "2019-12-25T06:04:23.907Z",
  "2020-01-25T14:18:46.235Z",
  "2020-02-05T16:33:06.386Z",
  "2020-04-10T14:43:26.374Z",
  "2020-06-25T18:49:59.371Z",
  "2020-07-26T12:01:20.894Z",
],
currency: "USD",
locale: "en-US"
  };
  
  const account3 = {
    owner: 'Steven Thomas Williams',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
    movementsDates: [
      "2019-11-18T21:31:17.178Z",
      "2019-12-23T07:42:02.383Z",
      "2020-01-28T09:15:04.904Z",
      "2020-04-01T10:17:24.185Z",
      "2020-05-08T14:11:59.604Z",
      "2020-07-26T17:01:17.194Z",
      "2020-07-28T23:36:17.929Z",
      "2020-08-01T10:51:36.790Z",
    ],
    currency: "EUR",
    locale: "pt-PT"
  };
  
  const account4 = {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
  };
  const accounts=[account1,account2,account3,account4]
  // const sum=accounts.flatMap(function(acc){
  //   return  acc.movements
  // })
  // console.log(sum)
  console.log(account1.movements.slice())
  console.log(accounts)
  // const colleceMovements=[]
  // for(let ele of accounts){
  //   colleceMovements.push(ele.movements)
  // }
  // console.log(colleceMovements.flat())
  // const collecetMovements=accounts.map(v=>v.movements)
  // const allMovements=collecetMovements.flat()
  // const sumMovements=allMovements.reduce((acc,curr)=>acc+=curr,0)
 
  // const sumMovements=accounts.map(v=>v.movements)
  // .flat()
  // .reduce((acc,curr)=>acc+=curr,0)
  // console.log(sumMovements)
  // ////////////flatmap method///////////////
  const sumMovements=accounts
  .flatMap(v=>v.movements)
  .reduce((acc,curr)=>acc+=curr,0)
  console.log(sumMovements)


  // DOM Element //
  const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
// console.log(containerApp)
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');
// FUNCTION
// 1.
  const displayMovements=function(acc,sort=false){
  containerMovements.innerHTML=''
  // .textcontant=0
  const movs=sort ?acc.movements.slice().sort((a,b) =>a-b) : acc.movements;

  movs.forEach(function(mov,i){
    const type=mov>0 ? 'deposit':'withdrawal'
    const date=new Date(acc.movementsDates[i])
    
   const day=date.getDate()
   const month=`${date.getMonth()}`.padStart(2,0)
   const year=date.getFullYear()+1
   const displayDate=`${day}/${month}/${year}`

   const html=` <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i+1}${type}</div>
   <div class="movements__date">${displayDate}</div>

    <div class="movements__value">${mov.toFixed(2)}</div>
  </div>`

  containerMovements.insertAdjacentHTML('afterbegin',html)
  })
}
// 2.
const calcDisplayBalance=function(acc){
  const balance=acc.movements.reduce((acc,curr)=>acc+curr,0)
  acc.balance=balance
  labelBalance.textContent=`${balance.toFixed(2)}`
}

// 3.
const calcDisplaySummry=function(acc){
const income=acc.movements
.filter(mov=>mov>0)
.reduce((acc,curr)=>acc+=curr,0)
labelSumIn.textContent=`${income.toFixed(2)}`
const outcome=acc.movements
.filter(mov=>mov<0)
.reduce((acc,curr)=>acc+=curr,0)
labelSumOut.textContent=`${Math.abs(outcome.toFixed(2))}`
const intrest=acc.movements
.filter(mov=>mov>0)
.map(deposite=>deposite*acc.interestRate/100)
.filter((int,i)=>{
  // console.log(arr)
  return int>=1
})
.reduce((acc,curr)=>acc=+curr,0)
labelSumInterest.textContent=`${intrest.toFixed(2)}`

}
 
// ComputeUserName
// const user='Steven Thomas Williams'
// const change=user.toLowerCase().split(' ').map(word=>
//   word[0]).join('')
// console.log(change)
// Uppercase convert into function
const creatUsernames=(accs)=>
accs.forEach(function(acc){
acc.username=acc.owner
.toLowerCase()
.split(' ')
.map(word=>word[0])
.join('')

})
creatUsernames(accounts)
console.log(accounts)
const updateUi=function(acc){
   // Display Movements
   displayMovements(acc)
   // Display Balance
   calcDisplayBalance(acc)
   // Display Summry
   calcDisplaySummry(acc)
}

const startLogOutTimer=function(){
  const tick=function(){
    const min=String(Math.trunc(time/60)).padStart(2,0)
    const sec=String(time%60).padStart(2,0)
    // In each call print the remaining time to UI
  labelTimer.textContent= `${min}:${sec}`
 
    // When time 0 sec stop timer and logout
  if(time===0){
    clearInterval(timer)
    labelWelcome.textContent='Log into get started'
    containerApp.style.opacity=0
  }
   // Decrease time in every 1sec
   time=time-1
  }
  // set time to 5 min
let time=30
  // call the timer every second
  tick()
  const timer=setInterval(tick,1000)

return timer;

  
}
// EVENT HANDLER
let currentAccount,timer

// // FAKE ALWAYS LOGGED IN
// currentAccount=account1
// updateUi(currentAccount)
// containerApp.style.opacity=100

// Create time and date
const now=new Date()
const day=now.getDate()
const month=now.getMonth()
const year=now.getFullYear()
labelDate.textContent=`${day}/${month}/${year}`
// day //month//year



btnLogin.addEventListener('click',function(e){
  e.preventDefault()
  currentAccount=accounts.find(acc=>acc.username===inputLoginUsername.value)
console.log(currentAccount)
if(currentAccount?.pin===+(inputLoginPin.value)){
  // Display msg and UI msg/
  labelWelcome.textContent=`welcome back, 
${currentAccount.owner.split(' ')[0]}`
containerApp.style.opacity=100
// clear input field
inputLoginUsername.value=inputLoginPin.value=''
inputLoginPin.blur()
// timer
if(timer)clearInterval(timer)
timer=startLogOutTimer()
 // UPDATE UI
 updateUi(currentAccount)
 
}
})
btnTransfer.addEventListener('click',function(e){
  e.preventDefault()
  const amount=Number(inputTransferAmount.value)
  const receiveracc=accounts.find(acc=>acc.username===inputTransferTo.value)
  // console.log(amount,receiveracc)
  inputTransferAmount.value=inputTransferTo.value=""
  if(amount>0&&
    currentAccount.balance>=amount&&
    receiveracc?.username!==currentAccount.username){
      // Doing the transfer
      currentAccount.movements.push(-amount)
      receiveracc.movements.push(amount)
// Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString())
    receiveracc.movementsDates.push(new Date().toISOString())


      // UPDATE UI
       updateUi(currentAccount)
      //  reset timer
      clearInterval(timer)
      timer=startLogOutTimer()
    }
})
btnLoan.addEventListener('click',function(e){
  e.preventDefault()
  const amount=Math.floor(inputLoanAmount.value)
  if(amount>0 && currentAccount.movements.some(mov=>mov>=amount/10)){
    // add movement here
    setTimeout(function(){
    currentAccount.movements.push(amount)
    // add loan date
    currentAccount.movementsDates.push(new Date().toISOString())
    // update UI
    updateUi(currentAccount)
    // Reset timer
    clearInterval(timer)
    timer=startLogOutTimer()
  
  },2500)
    inputLoanAmount.value=''
  }
})
// ///////////////////FINDINDEX METHOD///////////////////
btnClose.addEventListener('click',function(e){
  e.preventDefault()
  
  // console.log('delete')
  if(inputCloseUsername.value===currentAccount.username&&
   +(inputClosePin.value)=== currentAccount.pin
   ){
    const index=accounts.findIndex(acc=>acc.username=currentAccount.username)
    console.log(index)
    // delete account
    accounts.splice(index,1)
    // HIDE UI
    containerApp.style.opacity=0
  }
  inputCloseUsername.value=inputClosePin.value=''
})
// SORT MOVEMENTS
let sorted=false
btnSort.addEventListener('click',function(e){
  e.preventDefault()
  displayMovements(currentAccount.movements,!sorted)
  sorted=!sorted
})


// ARRAY METHODS
// const movements= [200, 450, -400, 3000, -650, -130, 70, 1300]

// const eurotoUsd=1.1
// const totalDepositeinUsd=movements.filter(mov=>mov>0).map(mov=>mov*eurotoUsd).reduce((acc,curr)=>acc+=curr,0)
// console.log(totalDepositeinUsd)
// // USE FIND METHOD///
// const account=accounts.find(acc=>acc.owner==='Jessica Davis')
// console.log(account)
// // with the help of for of loop
// // for(let single of accounts){
// //   if(single.owner==='Jessica Davis'){
// //     console.log(single)
// //   }
// // }
// let n=[78,89,90]
// const l=n.findIndex(i=>i<90)
// console.log(l)
// /////////////////////////EVERYMETHOD///////////////
// console.log(movements.every(mov=>mov>0))

// Real Example Of creating Array
 labelBalance.addEventListener('click',function(){
  const movementUI=Array.from(document.querySelectorAll('.movements__value'),ele=>Number(ele.textContent))
  console.log(movementUI)
  console.log([...document.querySelectorAll('.movements__value')])
 })
// Some More Practice On Array/////////////////////
// 1.
const totalSumDeposite=accounts
.flatMap(acc=>acc.movements)
.filter(mov=>mov>0)
.reduce((acc,curr)=>acc+=curr,0)
console.log(totalSumDeposite)
// 2. count how many deposite greater than 1000
// const numDeposite1000=accounts
// .flatMap(acc=>acc.movements)
// .filter(mov=>mov>1000).length
// console.log(numDeposite1000)
// another way to do same above ques
const numDeposite1000=accounts
.flatMap(acc=>acc.movements)

.reduce((acc,curr)=>curr>0?acc+1:acc,0)
console.log(numDeposite1000)
// .reduce((acc,curr)=>curr>1000? acc+1:acc,0)
// console.log(numDeposite1000)
// 3.take out one object with reduce method
// acc={deposit:0,withdrawal:0};
// acc=200
const sums=accounts
.flatMap(acc=>acc.movements)
.reduce((sums,curr)=> {
//  curr>0?(sums.deposit=sums.deposit+curr):(sums.withdrawal+=curr)
// return sums },{deposit:0,withdrawal:0})
sums[curr>0? 'deposit':'withdrawal']+=curr
return sums},{deposit:0,withdrawal:0})
console.log(sums)
// how to destructured object
const {deposit,withdrawal}=sums
console.log(deposit,withdrawal)

// create an array with the help of reduce

// create simple fn to convert any string to a title case(means al word capitalized except some exception)
// title case:This is a Nice Title.............EXAMPLE
const titleCase=function(title){
const exception=['a','an','the','is','are']
const titleconvert=title.toLowerCase().split(' ')
.map(word=>exception.includes(word)? word:word[0]
.toUpperCase()+word.slice(1)).join(' ')
return titleconvert


}
console.log(titleCase('this is a nice title'))
console.log(titleCase('you falaqare my girl'))
console.log(titleCase('the book is mine'))
// example convert only all first letter in all word
// let n='you are my baby hareem'
// const a=n.split(' ')
// const map=a.map(i=>i[0].toUpperCase()+i.slice(1))
// console.log(map)
// console.log(map.join(' '))
let student={fname:'falaq',lname:'fatma'}

let newstudent={age:23}
newstudent=student
console.log(student)
console.log(newstudent)
