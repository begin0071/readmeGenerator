const inquirer = require('inquirer');
const fs = require('fs');
let vooDoo = '';
const questions = [
  {
    type: 'input',
    name: 'projectTitle',
    message: 'What is the name of your project?'
  },
  {
    type: 'input',
    name: 'description',
    message: 'What is this project about?'
  },
  {
    type: 'input',
    name: 'installation',
    message: 'Provide instructions on how to install your project'
  },
  {
    type: 'input',
    name: 'usage',
    message: 'Provide instructions and examples for usage of your project:'
  },
  {
    type: 'input',
    name: 'credits',
    message: 'List any collaborators or third-party resources used in your project:'
  },
  {
    type: 'list',
    name: 'license',
    message: 'Please select the license for your project:',
    choices: ['MIT', 'Apache 2.0', 'GPL 3.0', 'None'],
  },
  {
    type: 'input',
    name: 'github',
    message: 'Please provide a link for your Github account'
  },
  {
    type: 'input',
    name: 'userName',
    message: 'What is your github user name?'
  },
  {
    type: 'email',
    name: 'email',
    message: 'What is your email adress?'
  },
 
];

start();

function start(){
inquirer
  .prompt(questions)
  .then((data) => {
    const filename = `${data.projectTitle.toLowerCase().split(' ').join('')}.json`;
    compileData(data)
    fs.writeFile(`${filename}.md`, vooDoo, (err) =>
      err ? console.log(err) : console.log('Success!')
    );
  });
}

function compileData(data){
  vooDoo += `# ${data.projectTitle}\n\n`
  vooDoo += `## Description\n\n ${data.description}\n\n`
  vooDoo +=`## Table of Contents\n\n- [Installation](#installation)\n- [Usage](#usage)\n- [Credits](#credits)\n- [License](#license)\n- [Questions](#questions)\n`
  vooDoo += `## Installation\n\n${data.installation}\n\n`
  vooDoo += `## Usage\n\n${data.usage}\n\n`
  vooDoo += `## Credits\n\n${data.credits}\n\n`
  vooDoo += licenseEval(data.license)
  vooDoo += `## Questions\n\nGithub Account: [${data.userName}](${data.github})\n\nEmail Address: ${data.email}` 
  console.log(vooDoo)
}

function licenseEval(license) {
  if (license !== 'None') {
    let lYes =  `## License\n\nThis project is licensed under the ${license} license.\n\n [![License](https://img.shields.io/badge/License-${license}-blue.svg)](https://opensource.org/licenses/${license.toLowerCase().split(' ').join('-')})\n\n License information[here](https://opensource.org/licenses/${license.toLowerCase().split(' ').join('-')}).\n\n`;
    return lYes
      } else {
    let lNone = `## License\n\nThis project does not have any license.\n\n`;
        return lNone;
}}