import inquirer from "inquirer";
import fs from "fs";
import { log } from "console";

let licenseBadge = "";
let licenseText = "";

const buildMarkDown = ({ title, description, installInstructions, usage, contribution, testInst, license, github, email, linkedIN,licenseBadge, licenseText }) =>
 `
# ${title}

## Description
${description} ${licenseBadge}


## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Tests](#tests)
- [License](#license)
- [Questions?](#questions)

## Installation
${installInstructions}


## Usage
${usage}


## Contributing
${contribution}

## Tests
${testInst}

## License
${licenseBadge}
${licenseText}

## Questions?
Contact me at my [GitHub ](https://github.com/${github})
, [Email: ](${email}), or [LinkedIn] (https://linkedin.com/in/${linkedIN})

`;

inquirer
  .prompt([
    {
      type: "input",
      name: "title",
      message: "What is Title of your project? ",
    },
    {
      type: "input",
      name: "description",
      message: "Please enter a description for your project: ",
    },
    {
      type: "input",
      name: "installInstructions",
      message: "How do you install your project? ",
    },
    {
      type: "input",
      name: "usage",
      message: "Please enter usage information: ",
    },
    {
      type: "input",
      name: "contribution",
      message: "How can someone contribute? ",
    },
    {
      type: "input",
      name: "testInst",
      message: "How can someone test this project? ",
    },

    
    {
      type: "rawlist",
      name: "license",
      message: "What license is this under? ",
      choices: ["MIT", "GNU GPLv3", "GNU GPLv2"],
    },

    {
      type: "input",
      name: "github",
      message: "Enter your GitHub Username: ",
    },
    {
      type: "input",
      name: "email",
      message: "Enter your email address: ",
    },
    {
      type: "input",

      name: "linkedin",
      message: "Enter your LinkedIn URL: ",
    },
  ])
  .then((answers) => {
    
    
    
    const licenseName=(answers.license);
    switch (licenseName){
      case "MIT":
        licenseBadge = "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
        licenseText = "This software is covered under The MIT License.  learn more about this license at https://opensource.org/licenses/MIT";
        break;
      case "GNU GPLv2":
        licenseBadge = "[![License: GPL v2](https://img.shields.io/badge/License-GPL%20v2-blue.svg)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)";
        licenseText = "This software is covered under GNU GPLv2.  learn more about this license at https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html";
        break;
      case "GNU GPLv3":
        licenseBadge = "[![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)";
        licenseText = "This software is covered under GNU GPLv3.  learn more about this license at https://www.gnu.org/licenses/gpl-3.0";
        break;
      default:
        licenseBadge = "";
        licenseText = "This software is not covered under any licenses.  Please check often for changes to this.";
    }


    const addAnswers = {licenseBadge, licenseText};
    const completeAnswer = Object.assign({},answers, addAnswers);

    const mdPageContent = buildMarkDown(completeAnswer);
    
    fs.writeFile("README.md", mdPageContent, (err) =>
      err ? console.log(err) : console.log("Successfully created README.md!")
    
    );
  });
