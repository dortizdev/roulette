const numberBet = document.querySelector('.numberBet');
const colorBet = document.querySelector('.colorBet');
const numOption = document.querySelectorAll('.numOption')
let blocks = document.querySelectorAll('.block');

var generateRandomNumber = () => {
  let number;
  let random = Math.random();
  random < 0.10 ? number = 1
  : random < 0.20 ? number = 2
  : random < 0.30 ? number = 3
  : random < 0.40 ? number = 4
  : random < 0.50 ? number = 5
  : random < 0.60 ? number = 6
  : random < 0.70 ? number = 7
  : random < 0.80 ? number = 8
  : random < 0.90 ? number = 9
  : number = 10
  return number
}

numberBet.addEventListener('click', () => {
  let numBetValue = parseInt(document.querySelector('.numBetValue').value)
  if (isNaN(numBetValue)) {
    alert('Please enter a bet amount')
    return
  }
  for (let i = 0; i < blocks.length; i++) {
      blocks[i].style.color = 'white'
  }
  let outcome;
  let money = document.querySelector('.money')
  let number = generateRandomNumber() - 1;
  const numSelect = document.querySelector('.numberOptions').value;
  blocks[numSelect - 1].style.color = 'purple'
  blocks[number].style.color = 'blue'
  if (numSelect == blocks[number].innerHTML) {
    blocks[number].style.color = 'gold'
    outcome = 'win'
    money.innerHTML = parseInt(money.innerHTML) + numBetValue
  } else {
    outcome = 'loss'
    money.innerHTML = parseInt(money.innerHTML) - numBetValue
  }

  fetch(`${outcome}`, {
          method: 'put',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            money: 100000 - parseInt(money.innerHTML)
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
        })
})

colorBet.addEventListener('click', () => {
  let colorBetValue = parseInt(document.querySelector('.colorBetValue').value);
  if (colorBetValue == 0) {
    alert('Please enter a bet amount')
    return
  }
  for (let i = 0; i < blocks.length; i++) {
      blocks[i].style.color = 'white'
  }
  let outcome;
  let money = document.querySelector('.money')
  let number = generateRandomNumber() - 1;
  let colorOptions = document.querySelector('.colorOptions').value;
  let randomColor;
  if (number % 2 === 0) {
    randomColor = 'black'
  } else {
    randomColor = 'red'
  }
  console.log(colorOptions);
  console.log(randomColor);
  blocks[number].style.color = 'purple'
  if (colorOptions == randomColor) {
    blocks[number].style.color = 'gold'
    outcome = 'win'
    money.innerHTML = parseInt(money.innerHTML) + colorBetValue
  } else {
    outcome = 'loss'
    money.innerHTML = parseInt(money.innerHTML) - colorBetValue
  }

  fetch(`${outcome}`, {
          method: 'put',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            money: 100000 - parseInt(money.innerHTML)
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
        })
})
