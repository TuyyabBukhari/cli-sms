#! /usr/bin/env node
import inquirer from 'inquirer';
export default async function App() {
    const students = [];
    let revision_status = true;
    let studentIdCounter = 1;
    const subjects = [
        'Math',
        'Science',
        'History',
        'English',
        'Urdu',
        'Islamiyat',
        'Physics',
        'Chemistry',
        'Biology',
        'Computer Science',
        'Geography',
        'Economics',
        'Art',
        'Physical Education',
        'Music',
    ];
    const greeting = () => {
        console.log('Welcome to the Student Management System!');
        console.log('Developed by Tuyyab Bukhari\n');
    };
    const addStudent = async () => {
        const studentInfo = await inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Enter student name:',
            },
            {
                type: 'input',
                name: 'rollNumber',
                message: 'Enter roll number:',
            },
            {
                type: 'input',
                name: 'email',
                message: 'Enter email address:',
            },
            {
                type: 'input',
                name: 'phone',
                message: 'Enter phone number:',
            },
            {
                type: 'input',
                name: 'Country',
                message: 'Enter Country:',
            },
            {
                type: 'checkbox',
                name: 'courses',
                message: 'Select courses (Choose 7-8 subjects):',
                choices: subjects,
                validate: (answers) => {
                    if (answers.length >= 7 && answers.length <= 8) {
                        return true;
                    }
                    else {
                        return 'You must choose between 7 and 8 subjects.';
                    }
                },
            },
        ]);
        const student = {
            id: studentIdCounter++,
            name: studentInfo.name,
            rollNumber: studentInfo.rollNumber,
            contactInfo: {
                email: studentInfo.email,
                phone: studentInfo.phone,
                Country: studentInfo.Country,
            },
            academicRecords: {
                courses: studentInfo.courses,
                attendance: {},
                healthRecords: '',
                grades: {},
            },
        };
        students.push(student);
        console.log('Student record added successfully.');
    };
    const listStudents = () => {
        students.forEach((student) => {
            console.log(`Student ID: ${student.id}`);
            console.log('Name:', student.name);
            console.log('Roll Number:', student.rollNumber);
            console.log('Contact Info:');
            console.log('  Email:', student.contactInfo.email);
            console.log('  Phone:', student.contactInfo.phone);
            console.log('  Country:', student.contactInfo.Country);
            console.log('Academic Records:');
            console.log('  Courses:', student.academicRecords.courses.join(', '));
        });
    };
    const mainMenu = async () => {
        greeting();
        const { choice } = await inquirer.prompt([
            {
                type: 'list',
                name: 'choice',
                message: 'Select an action:',
                choices: ['Add Student', 'List Students', 'Exit'],
            },
        ]);
        switch (choice) {
            case 'Add Student':
                await addStudent();
                break;
            case 'List Students':
                listStudents();
                break;
            case 'Exit':
                process.exit();
        }
    };
    const runMainMenu = async () => {
        while (true) {
            await mainMenu();
        }
    };
    runMainMenu();
}
