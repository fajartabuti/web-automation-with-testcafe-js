# UI AUTOMATION TEST WITH TESTCAFE JS #

## Requirements ##
1. Make sure you have installed NodeJS and npm
2. Run the `npm i` command to install all dependencies
3. Create an `.env` file in the root of the project folder with the contents according to the file sent

## A. Run UI Test ##
1. Make sure you already have the Chrome browser, if not, change the browser parameters in the `.testcaferc.json` file according to the browser installed on the PC. c/o : firefox, chromium, etc.
2. Open a terminal in the root of the project folder
3. Run the command `npm run test_ui` to run the automation test
4. The UI automation test has been successfully executed, marked with the message 'allure reporter started...' on the terminal
5. Wait until the automation has finished running, marked with the message 'allure reporter closed...' on the terminal

## B. Run Api Test ##
1. Open a terminal in the root of the project folder
2. Run the `npm run test_api` command
3. Wait until the automation has finished running.

## C. Open the Test Report ##
1. Run the `npm run allure_report` command in the terminal to generate and open a report from the test results
2. Automation report opens automatically in the browser.
