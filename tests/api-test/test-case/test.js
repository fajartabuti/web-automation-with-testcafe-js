const generalHelper = require('../../_helper/general');
const { expect } = require('chai');
const api = require('../endpoint/list');

require('dotenv').config();

describe('API Test Automation', () => {
  let token = process.env.API_TOKEN;

  it('Should Passed Get Todos Data by Title and Status', async () => {
    const responseDetail = await api.getTodosWithFilter('credo','completed');

    let totalData = responseDetail.body.meta.pagination.total
    let dataLength = responseDetail.body.data.length

    expect(responseDetail.status).to.equal(200);
    expect(totalData).to.equal(dataLength);
  });

  it('Should Passed Post Comment with Post ID', async () => {
    let body = {
      "name": "Fajar" + generalHelper.getRandomAlphabet(5),
      "email": "test" + generalHelper.getRandomAlphabet(5) + "@gmail.com",
      "body": "test fajar body"
    }

    const responseDetail = await api.postComment(token, '1128', body);

    expect(responseDetail.status).to.equal(201);
  });
});