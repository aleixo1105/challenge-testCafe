# Node Project with TestCafe

This is a Node.js project that uses TestCafe to run automated front-end and back-end tests. TestCafe is an end-to-end testing tool for web applications that allows you to write tests in JavaScript.

## Requirements

- Node.js (version 12 or higher)
- npm (Node.js package manager)
- TestCafe
- axios

## Installation

1. Clone the repository to your local environment:

```bash
git clone https://github.com/aleixo1105/challenge-testCafe.git

cd repository

npm install

npm test







repository/
│
├── .gitignore                    # Gitignore configuration file
│
├── back-endAndFront-EndTests.js/    # Folder for combined front-end and back-end tests
│
├── tests/
│   ├── front-end/
│   │   ├── page-objects/
│   │   │   └── devices-page.js     # Page Object for the devices page (front-end)
│   │   └────── test.js         # Main test file for front-end
│   │
│   ├── back-end/
│   │   ├── page-objects/
│   │   │   └── api-page.js         # Page Object for the API (back-end)
│   │   └────── test.js             # Main test file for back-end
│
├── package.json                    # npm configuration file
└── README.md                       # Project documentation
