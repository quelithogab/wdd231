
    // JavaScript to dynamically populate the current year
    document.getElementById('currentyear').textContent = new Date().getFullYear();

    // JavaScript to dynamically populate the last modified date
    document.getElementById('lastModified').textContent = "Last Modification: " + document.lastModified;

    document.addEventListener('DOMContentLoaded', () => {
        const menuToggle = document.querySelector('.menu-toggle');
        const nav = document.querySelector('nav');
    
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('open');
            toggleMenuButton();
        });
    
        function toggleMenuButton() {
            menuToggle.classList.toggle('open');
        }
    });
    

    const courses = [
        {
            subject: 'CSE',
            number: 110,
            title: 'Introduction to Programming',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
            technology: [
                'Python'
            ],
            completed: true
        },
        {
            subject: 'WDD',
            number: 130,
            title: 'Web Fundamentals',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
            technology: [
                'HTML',
                'CSS'
            ],
            completed: true
        },
        {
            subject: 'CSE',
            number: 111,
            title: 'Programming with Functions',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
            technology: [
                'Python'
            ],
            completed: true
        },
        {
            subject: 'CSE',
            number: 210,
            title: 'Programming with Classes',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
            technology: [
                'C#'
            ],
            completed: false
        },
        {
            subject: 'WDD',
            number: 131,
            title: 'Dynamic Web Fundamentals',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
            technology: [
                'HTML',
                'CSS',
                'JavaScript'
            ],
            completed: true
        },
        {
            subject: 'WDD',
            number: 231,
            title: 'Frontend Web Development I',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
            technology: [
                'HTML',
                'CSS',
                'JavaScript'
            ],
            completed: false
        }
    ]
    
    // Function to calculate total credits required
function calculateTotalCredits() {
    const totalCredits = courses.reduce((total, course) => {
        return total + course.credits;
    }, 0); // The 0 is the initial value for the accumulator

    document.getElementById('totalCreditsRequired').textContent = `Total Credits Required: ${totalCredits}`;
}

// Function to display courses in the list
function displayCourses(courseList) {
    const courseListElement = document.getElementById('courseList');
    courseListElement.innerHTML = ''; // Clear previous content

    // Loop through each course and create a course item element
    courseList.forEach(course => {
        const courseItem = document.createElement('div');
        courseItem.classList.add('course-item');
        courseItem.classList.add(course.completed ? 'completed' : 'uncompleted');
        courseItem.textContent = `${course.subject} ${course.number}`;
        courseItem.onclick = () => showCourseDetails(course); // Show course details on click
        courseListElement.appendChild(courseItem);
    });
}

// Function to display course details
function showCourseDetails(course) {
    const courseDetailsElement = document.getElementById('courseDetails');
    courseDetailsElement.innerHTML = `
        <h3>${course.subject} ${course.number}: ${course.title}</h3>
        <p><strong>Credits:</strong> ${course.credits}</p>
        <p><strong>Certificate:</strong> ${course.certificate}</p>
        <p><strong>Description:</strong> ${course.description}</p>
        <p><strong>Technologies:</strong> ${course.technology?.join(', ') || 'None'}</p>
        <p><strong>Completed:</strong> ${course.completed}</p>
    `;
}

// Function to filter courses by subject
function filterCourses(subject) {
    let filteredCourses;

    if (subject === 'All') {
        filteredCourses = courses;
    } else {
        filteredCourses = courses.filter(course => course.subject === subject);
    }

    displayCourses(filteredCourses);
}

// Function to display total completed credits
function displayTotalCredits() {
    const totalCredits = courses.reduce((acc, course) => {
        return course.completed ? acc + course.credits : acc;
    }, 0);

    document.getElementById('totalCredits').textContent = `Total Completed Credits: ${totalCredits}`;
}

// Initial render of all courses and total credits required
displayCourses(courses);
calculateTotalCredits();
displayTotalCredits();