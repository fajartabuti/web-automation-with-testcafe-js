require('dotenv').config();
const supertest = require('supertest');
const api = supertest(process.env.API_BASE_URL);

function getTodosWithFilter(title, status) {
  return api.get('todos?title=' + title + '&status=' + status)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json');
}

function postComment(token, postId, body) {
    return api.post('posts/' + postId + '/comments')
      .send(body)
      .set('Authorization', 'Bearer ' + token)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');
  }

module.exports = {
    getTodosWithFilter,
    postComment
}