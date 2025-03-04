import moment from 'moment';

/*determines a price for a game based on its name length */
export function decidePrice(name) {
  //handle both direct string and object with gameName property
  let nameOftheGame = typeof name === 'object' ? name.gameName : name;
  
  if (nameOftheGame.length > 30) {
    return "15";
  } else if (nameOftheGame.length > 20) {
    return "20";
  } else if (nameOftheGame.length > 10) {
    return "40";
  } else {
    return "30";
  }
}

/*calculates the grand total of items in the cart */
export function findGrandTotal(gamesInCart) {
  let grandTotal = 0;
  for (let x = 0; x < gamesInCart.length; x++) {
      grandTotal += parseInt(gamesInCart[x].price);
  }
  return grandTotal;
}

/*checks if a string is numeric */
export function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

/*gets the current year using moment.js */
export function getThisYear() {
  let currentYear = moment().format("YYYY");
  return currentYear;
}

/*checks if a game is already in the cart */
export  function checkIfInCart(gameName, gamesInCart){
  if (gamesInCart.find(element => element.name === gameName)){
    return true 
  }
}


/*debounce function to limit how often a function is called */
export function debounce(func, wait) {
  let timeout;
  return function(...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}