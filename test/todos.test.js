// Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/index');

const toDoServices = require('../src/services/toDoServices');
const userServices = require('../src/services/userServices');

chai.should();

chai.use(chaiHttp);

// Initially token is null
let token = null;
const creds = {
  name: 'Bishal',
  email: 'sarangbishal@gmail.com',
  password: 'Aha!a3hui#',
};

userServices.emptyUsers();

toDoServices.emptyToDo();
// Use Related Tests
describe('Users', () => {
  //   Register Test
  describe('api/POST users/register', () => {
    it('it should return 201 for successful user creation', (done) => {
      chai
        .request(server)
        .post('/api/users/register')
        .send(creds)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('message');
          res.body.should.have.property('data');
          res.body.should.be.a('object');
          done();
        });
    });
  });

  //   Login Test
  describe('api/POST users/login', () => {
    it('it should return 200 for successfull login', (done) => {
      chai
        .request(server)
        .post('/api/users/login')
        .send(creds)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message');
          res.body.should.have.property('token');
          res.body.should.be.a('object');

          //  Set token for future requests
          token = res.body['token'];

          done();
        });
    });
  });
});

// TODOS request without login
describe('Todos', () => {
  //   Test Unauthorized API requests GET
  describe('api/GET todos', () => {
    it('it should return 401 as user is not authenticated to get all the todos', (done) => {
      chai
        .request(server)
        .get('/api/todos')
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });

  //   Test Unauthorized API requests
  describe('api/POST todos', () => {
    it('it should return 401 as user is not authenticated to add  a todo', (done) => {
      chai
        .request(server)
        .post('/api/todos', {
          title: 'Test Assignment',
          is_complete: false,
          user_email: 'sarangbishal@gmails.com',
        })
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });

  //   Test Unauthorized API requests
  describe('api/PUT todos', () => {
    it('it should return 401 as user is not authenticated to update  a todo', (done) => {
      chai
        .request(server)
        .post('/api/todos/123', {
          title: 'Test Assignment Updated',
          is_complete: false,
          user_email: 'sarangbishal@gmails.com',
        })
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });

  //   TEST 404
  describe('api/ GET ', () => {
    it('it should return 404 as the url is not found', (done) => {
      chai
        .request(server)
        .get('/api/')
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
});

// TODOS request with login
describe('Todos', () => {
  //   Add todo
  describe('api/POST todos', () => {
    it('it should return 201 as user is  authenticated to add a todo', (done) => {
      chai
        .request(server)
        .post('/api/todos')
        .send({
          title: 'Hawa Assignmsents IIII',
          is_complete: false,
        })
        .set({ authorization: token })
        .end((err, res) => {
          res.should.have.status(201);
          done();
        });
    });
  });

  //   Test authenticated API requests GET
  describe('api/GET todos', () => {
    it('it should return 200 as user is  authenticated to get all the todos', (done) => {
      chai
        .request(server)
        .get('/api/todos')
        .set({ authorization: token })
        .end((err, res) => {
          res.should.have.status(200);

          done();
        });
    });
  });
});
