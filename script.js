function reverseStr(str) {
    var listOfChars = str.split('');
    var reverseListOfChars = listOfChars.reverse()
    var reversedStr = reverseListOfChars.join('');
    return reversedStr;
}

function isPalindrome(str) {
    var reverse = reverseStr(str);
    return str === reverse;
}

function convertDateTOString(date) {
    var dateStr = { day: '', month: '', year: '' };

    if (date.day < 10) {
        dateStr.day = '0' + date.day;
    }
    else {
        dateStr.day = date.day.toString();
    }
    if (date.month < 10) {
        dateStr.month = '0' + date.month;
    }
    else {
        dateStr.month = date.month.toString();
    }
    dateStr.year = date.year.toString();

    return dateStr;
}

function getAllDateFormat(date) {
    var dateStr = convertDateTOString(date);

    var DDMMYYYY = dateStr.day + dateStr.month + dateStr.year;
    var MMDDYYYY = dateStr.month + dateStr.day + dateStr.year;
    var YYYYMMDD = dateStr.year + dateStr.month + dateStr.day;
    var DDMMYY = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var MMDDYY = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var YYMMDD = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [DDMMYYYY, MMDDYYYY, YYYYMMDD, DDMMYY, MMDDYY, YYMMDD];

}

function checkPalindromeForAllDateFormats(date) { //31 8 2023
    var listOfPalindromes = getAllDateFormat(date); //31 8 2023

    var flag = false;

    for (var i = 0; i < listOfPalindromes.length; i++) {
        if (isPalindrome(listOfPalindromes[i])) {
            flag = true;
            break
        }
    }
    return flag;
}

function isLeapYear(year) {
    if (year % 400 === 0) {
        return true
    }
    if (year % 100 === 0) {
        return false;
    }
    if (year % 4 === 0) {
        return true;
    }
    return false;
}

function getNextDate(date) { //{day: 30, month: 8, year: 2023}
    var day = date.day + 1; // 31
    var month = date.month; //8
    var year = date.year;   //2023

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 2) {
        if (isLeapYear(year)) {
            if (day > 29) {
                day = 1;
                month++;
            }
        }
        else {
            if (day > 28) {
                day = 1;
                month++;
            }
        }
    }
    else {
        if (day > daysInMonth[month - 1]) { //31>31
            day = 1;
            month++;
        }
    }
    if (month > 12) { //8>12
        month = 1;
        year++;
    }
    return {
        day: day,//31
        month: month,//8
        year: year//2023
    };
}
function getNextPalindromedate(date) { //{day: 30, month: 8, year: 2023}
    var ctr = 0;
    var nextDate = getNextDate(date); //{day: 30, month: 8, year: 2023}
//31 8 2023
    while (1) {
        ctr++;
        var isPalindrome = checkPalindromeForAllDateFormats(nextDate); //31 8 2023
        if (isPalindrome) {
            break;
        }
        nextDate = getNextDate(nextDate);
    }
    return [ctr, nextDate];
}

var brithDay = document.querySelector('#brithDay');
var btnShow = document.querySelector('#btnShow');
var outputEl = document.querySelector('#output');


function clickHandle() {
    var bdayStr = brithDay.value;
    // console.log(bdayStr); => 2023-08-30
    if (bdayStr !== '') {
        var listOfDate = bdayStr.split('-');
        // console.log(listOfDate) => ['2023', '08', '30']
        var date = {
            day: Number(listOfDate[2]),
            month: Number(listOfDate[1]),
            year: Number(listOfDate[0])
        };
        // console.log(date); => {day: 30, month: 8, year: 2023}

        var isPalindrome = checkPalindromeForAllDateFormats(date);
        // console.log(isPalindrome); => false
        if (isPalindrome) {
            outputEl.innerText = "Your brith day is palindrome."
        }
        else {
            var [ctr, nextDate] = getNextPalindromedate(date);
            outputEl.innerText=`The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year},you missed it by ${ctr} days!`
        }
    }
}

btnShow.addEventListener('click', clickHandle);