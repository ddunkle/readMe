const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

// array of questions for user
const questions = [
    {
        type: "input",
        name: "title",
        message: "Enter your project title."
      },
      {
        type: "input",
        name: "description",
        message: "Please enter a description."
      },
      {
        type: "input",
        name: "installation",
        message: "Are there any installation instructions?"
      },
      {
        type: "input",
        name: "usage",
        message: "Do you have any usage information?"
      },
      {
        type: "input",
        name: "contributing",
        message: "Instructions on how to contribute."
      },
      {
        type: "input",
        name: "test",
        message: "What are the test instructions"
      },
      {
        type: "list",
        name: "license",
        message: "Choose your license",
        choices: ["MIT", "APACHE 2.0", "GPL 3.0", "BSD 3", "None"], 
        default: 4
      },
      {
        type: "input",
        name: "username",
        message: "What is your Github username?"
      },
      {
        type: "input",
        name: "email",
        message: "What is your email address?"
      }
];

// // function to write README file
// function writeToFile(fileName, data) {
// }

function promptUser() {
    return inquirer.prompt(questions)
};

function generateReadMD(answers) {
    return `
  # ${answers.title} \n
  ## Description \n
  ${answers.description} \n
  ## Table of Contents
  * [Installation](#installation)
  * [Usage](#usage)
  * [Contributing](#contributing)
  * [Test](#test)
  * [License](#license)
  * [Questions](#questions)
  ## Installation \n
  ${answers.installation} \n
  ## Usage \n
  ${answers.usage} \n
  ## Contributing \n
  ${answers.contributing} \n
  ## Test \n
  ${answers.test} \n
  ## License \n
  ${answers.license} \n
  ## Questions \n
  GitHub: https://github.com/${answers.username}
  Email: ${answers.email}
  `;
  }

// function to initialize program
async function init() {
    try {
        const answers = await promptUser();
        const readME = generateReadMD(answers);
        await writeFileAsync("READMD.md", readME);
        console.log("Successfully written to README.md");
    } catch (err) {
        console.log(err);
    }
}

// function call to initialize program
init();
