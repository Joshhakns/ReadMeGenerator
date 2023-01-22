// TODO: Include packages needed for this application
const inquirer = require ('inquirer');

const fs = require ('fs');

const generateMarkdown = require ('./utils/generateMarkdown');
const { userInfo } = require('os');

// TODO: Create an array of questions for user input
inquirer
.prompt([
    {
        type: 'input',
        message: 'Link your github username by typing it in!',
        name: 'Username',
    },
    {
        type: 'input',
        message: 'What is the name of the repo you are working in?',
        name: 'Github Repository'
    },
    {
        type: 'input',
        message: 'What would you like your project title to be?',
        name: 'Title',
    },
    {
        type: 'input',
        message: 'List a description of your application.',
        name: 'Description',
    },
    {
        type: 'input',
        message: 'Any installation instructions?',
        name: 'Installation',
    },
    {
        type: 'input',
        message: 'Any usage instructions?',
        name: 'Usage'
    },
    {
        type: 'input',
        message: 'Any other contributors?', 
        name: 'Contributors'
    },
    {
        type: 'input',
        message: 'Tests?',
        name: 'Tests'
    },
])
.then((response) =>
    response.confirm === response.password
    ? console.log('Success!')
    : console.log('Try again.')
);

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    fs.writeToFile(fileName, data, err => {
        if (err) {
            console.log("Error in trying to write the File! Look at your Index.JS file!")
        } 
        else {
            console.log("readMe file has been generated! Congratulations!")
        }
    })
}

// TODO: Create a function to initialize app
function init() 
try
    {
    const responses = inquirer.prompt(questions);
    console.log("Here is what we found. Please make sure the information is correct: " + responses);
    
    const findingInfo = api.getUser(responses);
    console.log("Your Github info: "+ findingInfo);

    console.log("Generating Readme... this may take some time...");
    const markdown = generateMarkdown(responses, findingInfo);
    console.log(markdown);

    writeFileAsync('ExampleREADME.md', markdown);

} catch (error){
    console.log ("error")
}

// Function call to initialize app
init();
