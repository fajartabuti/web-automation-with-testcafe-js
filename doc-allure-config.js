const DOC_ALLURE_CONFIG = {
    CLEAN_REPORT_DIR: false,
    COPY_HISTORY: true,
    RESULT_DIR: '/allure/allure-results',
    REPORT_DIR: '/allure/allure-report',
    META: {
        STORY_ID: 'STORY',
        TEST_ID: 'ID',
        SEVERITY: 'SEVERITY',
        TEST_RUN: 'TEST_RUN'
    },
    STORY_LABEL: 'JIRA Story Link',
    STORY_URL: 'https://jira.example.ca/browse/{{ID}}',
    TEST_LABEL: 'JIRA Test Link',
    TEST_URL: 'https://jira.example.ca/secure/Tests.jspa#/testCase/{{ID}}',
    labels: {
        screenshotLabel: 'Screenshot',
        browserLabel: 'Browser',
        userAgentLabel: 'User Agent',
        allureStartMessage: 'Test running...',
        allureClosedMessage: 'Test Completed, Please run "npm run allure_report" on terminal'
    }
};
 
module.exports = DOC_ALLURE_CONFIG;