// Declaring variables using let
let studentName = "Vardhan";
let mark1 = 99;
let mark2 = 97;
let mark3 = 98;

// Declaring an arrow function using const to calculate total
const calculateTotal = (m1, m2, m3) => {
  return m1 + m2 + m3;
};

// Declaring an arrow function using const to calculate average
const calculateAverage = (total) => {
  return total / 3;
};

// Performing the calculations
let totalMarks = calculateTotal(mark1, mark2, mark3);
let average = calculateAverage(totalMarks);

// Displaying the results using template literals
console.log(`Student Name: ${studentName}`);
console.log(`Total Marks: ${totalMarks}`);
console.log(`Average Marks: ${average.toFixed(2)}`);