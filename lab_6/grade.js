//  PART 1: ERRORS FOUND AND FIXED
// Error 1  (grade.html, Line 9):  onsubmit="checkMark()" did not return the value, so return false could not stop the form submitting. Fixed: onsubmit="return checkMark()".
// Error 2  (grade.html, Line 17): onclick="showtable()" - wrong function name (JavaScript is case-sensitive). Fixed: showTable().
// Error 3  (grade.html, Line 19): <script src="grades.js"> - wrong file name, so no JavaScript loaded. Fixed: grade.js.
// Error 4  (grade.js, Line 5):    if (name = "") used assignment (=), so the name was erased and the test never worked. Fixed: name === "".
// Error 5  (grade.js, Line 9):    isNan() does not exist (the console shows "isNan is not defined"). Fixed: isNaN().
// Error 6  (grade.js, Line 14):   mark < 0 && mark > 100 can never be true, so 150 was accepted. Fixed: mark < 0 || mark > 100.
// Error 7  (grade.js, Line 28):   getElementByID is not a function. Fixed: getElementById.
// Error 8  (grade.js, Line 30):   style.colour is not a valid property. Fixed: style.color.
// Error 9  (grade.js, Line 31):   return true let the form submit and reload the page, so the result disappeared. Fixed: return false.
// Error 10 (grade.js, Line 34):   function was named showTable but the HTML called showtable (see Error 2).
// Error 11 (grade.js, Line 38):   for loop started at i = 1, so the first row (A) was missing. Fixed: i = 0.
// Error 12 (grade.js, Line 42):   innerHtml is not a property. Fixed: innerHTML.

//  PART 2: EXTENSIONS
// Check the mark entered in the form and show the grade
function checkMark() {
  let name = document.forms["gradeForm"]["name"].value;
  let markText = document.forms["gradeForm"]["mark"].value;

  // Validate the name (Error 4 fixed: instead of)
  if (name === "") {
    alert("Name must be filled out.");
    return false;
  }
  // Extension: validate an empty mark
  if (markText.trim() === "") {
    alert("Mark field cannot be empty.");
    return false;
  }
  // Validate that the mark is a number (Error 5 fixed: isNaN)
  if (isNaN(markText)) {
    alert("Please enter a valid numeric value.");
    return false;
  }
  let mark = parseInt(markText);
  // Validate the range (Error 6 fixed: || instead of &&)
  if (mark < 0 || mark > 100) {
    alert("Mark must be between 0 and 100.");
    return false;
  }

  // Decide the grade
  let grade;
  if (mark >= 80) {
    grade = "A";
  } else if (mark >= 65) {
    grade = "B";
  } else if (mark >= 50) {
    grade = "C";
  } else {
    grade = "F";
  }

  // Show the result (Error 7 fixed: getElementById)
  let resultEl = document.getElementById("result");
  resultEl.innerHTML = name + " got grade " + grade;

  // Extension: colour depends on grade (Error 8 fixed: style.color)
  if (grade === "A" || grade === "B") {
    resultEl.style.color = "green";
  } else if (grade === "C") {
    resultEl.style.color = "orange";
  } else {
    resultEl.style.color = "red";
  }

  // Extension: show the date and time of checking
  document.getElementById("checkedOn").innerHTML = "Checked on: " + Date();

  // Error 9 fixed: return false so the page does not reload and the result stays
  return false;
}

// Extension: put a random whole number from 0 to 100 into the mark field
function randomMark() {
  document.getElementById("mark").value = Math.floor(Math.random() * 101);
}

// Show the grade table (Error 10 fixed: name matches the HTML)
function showTable() {
  let grades = ["A", "B", "C", "F"];
  let ranges = ["80-100", "65-79", "50-64", "0-49"];
  let tableHTML = "<table><tr><th>Grade</th><th>Mark range</th></tr>";
  // Error 11 fixed: start at i = 0 so all four grades appear
  for (let i = 0; i < grades.length; i++) {
    tableHTML += "<tr><td>" + grades[i] + "</td><td>" + ranges[i] + "</td></tr>";
  }
  tableHTML += "</table>";
  // Error 12 fixed: innerHTML
  document.getElementById("tableContainer").innerHTML = tableHTML;
}