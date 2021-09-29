var dateInput = document.querySelector("#date_input");
var checkBtn = document.querySelector("#button");
var output = document.querySelector("#output_display");

function clickHandler(e) {
  var bdayStr = dateInput.value;

  if (bdayStr !== "") {
    var dateWithoutHyphen = bdayStr.split("-");
    var date = {
      day: Number(dateWithoutHyphen[2]),
      month: Number(dateWithoutHyphen[1]),
      year: Number(dateWithoutHyphen[0])
    };

    var isPalindrome = checkPalindromeForAllDateFormats(date);

    output.style.display = "none";

    setTimeout(() => {
      output.style.display = "block";

      if (isPalindrome) {
        output.innerText = `Congrats!! Your Birthday is a Palindrome!`;
      } else {
        var [countNext, nextDate] = getNextPalindromeDate(date);
        var [countPrev, prevDate] = getPrevPalindromeDate(date);
        if (countNext > countPrev) {
          output.innerText = `Your birthday is not a palindrome. The nearest palindrome date is ${prevDate.day}-${prevDate.month}-${prevDate.year}. You missed it by ${countPrev} days.`;
        } else {
          output.innerText = `Your birthday is not a palindrome. The nearest palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}. You missed it by ${countNext} days.`;
        }
      }
    }, 3700);
  }
}

checkBtn.addEventListener("click", clickHandler);

function reverseStr(str) {
  var listOfChars = str.split("");
  var reverseListOfChars = listOfChars.reverse();
  var reversedStr = reverseListOfChars.join("");
  return reversedStr;

  // All this can be written in one line:-> return str.split("").reverse().join("");
}

function isPalindrome(str) {
  var reverse = reverseStr(str);
  return str === reverse;
}

function convertDateToStr(date) {
  var dateStr = { day: "", month: "", year: "" };

  if (date.day < 10) {
    dateStr.day = "0" + date.day;
  } else {
    dateStr.day = date.day.toString();
  }

  if (date.month < 10) {
    dateStr.month = "0" + date.month;
  } else {
    dateStr.month = date.month.toString();
  }

  dateStr.year = date.year.toString();

  return dateStr;
}

function getAllDateFormats(date) {
  var dateStr = convertDateToStr(date);

  var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
  var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
  var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
  var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
  var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
  var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllDateFormats(date) {
  var listOfPalindromes = getAllDateFormats(date);

  var flag = false;

  for (var i = 0; i < listOfPalindromes.length; i++) {
    if (isPalindrome(listOfPalindromes[i])) {
      flag = true;
      break;
    }
  }
  return flag;
}

function isLeapYear(year) {
  if (year % 400 === 0) {
    return true;
  }
  if (year % 100 === 0) {
    return false;
  }
  if (year % 4 === 0) {
    return true;
  }
  return false;
}

function getNextDate(date) {
  var day = date.day + 1;
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 2) {
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month++;
      }
    } else {
      if (day > 28) {
        day = 1;
        month++;
      }
    }
  } else {
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++;
    }
  }

  if (month > 12) {
    month = 1;
    year++;
  }

  return {
    day: day,
    month: month,
    year: year
  };
}

function getNextPalindromeDate(date) {
  var count = 0;
  var nextDate = getNextDate(date);

  while (1) {
    count++;
    var isPalindrome = checkPalindromeForAllDateFormats(nextDate);
    if (isPalindrome) {
      break;
    }
    nextDate = getNextDate(nextDate);
  }

  return [count, nextDate];
}

function getPrevDate(date) {
  var day = date.day - 1;
  var month = date.month;
  var year = date.year;

  if (month === 3) {
    if (isLeapYear(year)) {
      if (day < 1) {
        day = 29;
        month--;
      }
    } else {
      if (day < 1) {
        day = 28;
        month--;
      }
    }
  } else if (
    month === 2 ||
    month === 4 ||
    month === 6 ||
    month === 8 ||
    month === 9 ||
    month === 11
  ) {
    if (day < 1) {
      day = 31;
      month--;
    }
  } else if (month === 1) {
    if (day < 1) {
      day = 31;
      month = 12;
      year--;
    }
  } else {
    if (day < 1) {
      day = 30;
      month--;
    }
  }

  return {
    day: day,
    month: month,
    year: year
  };
}

function getPrevPalindromeDate(date) {
  var count = 0;
  var prevDate = getPrevDate(date);

  while (1) {
    count++;
    var isPalindrome = checkPalindromeForAllDateFormats(prevDate);
    if (isPalindrome) {
      break;
    }
    prevDate = getPrevDate(prevDate);
  }

  return [count, prevDate];
}
