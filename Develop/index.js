/* eslint-disable no-console */
// TODO: Include packages needed for this application
const inquirer = require('inquirer');

const fs = require('fs');

const generateMarkdown = require('./utils/generateMarkdown');

const getLicenseList = require('./utils/generateMarkdown');
// const { title } = require("process");
const questions = [
  {
    type: 'input',
    message: 'Link your github username by typing it in!',
    name: 'Username',
  },
  {
    type: 'input',
    message: 'What is the name of the repo you are working in?',
    name: 'Github Repository',
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
    name: 'Usage',
  },
  {
    type: 'input',
    message: 'Any other contributors?',
    name: 'Contributors',
  },
  {
    type: 'list',
    name: 'license',
    message: 'choose your License',
    choices: getLicenseList().concat('None'),
  },
  {
    type: 'input',
    message: 'Tests?',
    name: 'Tests',
  },
  {
    type: 'input',
    message: 'Type email here!',
    name: 'Email',
  },
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
  try {
    fs.writeFileSync(fileName, data);
  } catch (err) {
    console.log(err);
  }
}

function getTitleString(answers) {
  return `# ${answers.Title}\n\n`;
}

function getDescription(answers) {
  return `\n\n## Description\n\n${answers.Description}\n\n`;
}

function getInstall(answers) {
  return `## Installation\n\n${answers.Installation}\n\n`;
}

function getUsage(answers) {
  return `## Usage\n\n${answers.Usage}\n\n`;
}

function credits(answers) {
  return `## Contributors\n\n${answers.Contributors}\n\n`;
}

function getTest(answers) {
  return `## Tests\n\n${answers.Tests}\n\n`;
}

function tableOfContents() {
  return `## Table of Contents 
- [Installation](#installation)
- [Usage](#usage)
- [Contributors](#contributors)
- [License](#license)\n\n`;
}

function getLicenseString(answers) {
  if (answers.license === 'none') return '';
  return `\n\n## License\n\n License under the ${answers.license} license\n\n`;
}

function email(answers) {
  return `\n\n## Email\n\n${answers.Email}`;
}

function generateReadMeString(answers) {
  return (
    getTitleString(answers)
    + generateMarkdown(answers.license)
    + getDescription(answers)
    + tableOfContents()
    + getInstall(answers)
    + getUsage(answers)
    + credits(answers)
    + getTest(answers)
    + getLicenseString(answers)
    + email(answers)
  );
}
// TODO: Create a function to initialize app
async function run() {
  try {
    const answers = await inquirer.prompt(questions);
    console.log(answers);
    console.log(generateReadMeString(answers));
    await writeToFile('README.md', generateReadMeString(answers));
  } catch (err) {
    console.log(err);
  }
}

// Function call to initialize app
run();
