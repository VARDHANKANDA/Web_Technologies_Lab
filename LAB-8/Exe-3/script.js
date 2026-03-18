class Course {
    constructor(courseName, instructor) {
        this.courseName = courseName;
        this.instructor = instructor;
    }

    displayCourse() {
        console.log(`Course: ${this.courseName}, Instructor: ${this.instructor}`);
    }
}

// Create course object
let course1 = new Course("Web Technologies", "Dr. Kumar");

// Display course details
course1.displayCourse();

// Promise for enrollment
let enrollCourse = new Promise((resolve, reject) => {
    let seatsAvailable = true; // change to false to test

    if (seatsAvailable)
        resolve("Enrollment Successful");
    else
        reject("Course Full");
});

// Handle promise
enrollCourse
    .then(msg => console.log(msg))
    .catch(err => console.log(err));