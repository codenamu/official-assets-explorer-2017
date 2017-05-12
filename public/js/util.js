
// display unit to won
function numberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// convert unit(thousand to ten thousand) using round
function convertUnit(number) { 
    var n = 10;
    var new_number = 0;
    new_number = number / n;
    new_number = Math.round(new_number);
    new_number = new_number * n;
    return new_number/10;
}
