# Test Automation Framework
This code uses Cypress as Test Automation Framework. Since the goal behind this code is to perform basic tests for UI testing and API testing, Cypress covers all the necessities.

## Execution
Clone this repository and then run:

`$ npm install`

To execute the tests, run:

`$ $(npm bin)/cypress run`

The result of all tests should be reported in the command line.

To execute the Cypress UI, run:

`$ $(npm bin)/cypress open`

All tests are located in [integration](/cypress/integration) folder.

# Enjoy testing!
In terms of UI Testing, there is a possibility to create a new test suite to test the "Login Successfully" page.

In terms of API Testing, if the example API allows creating new users, there is a possibility to create new test suites to test "User Creation" workflow.