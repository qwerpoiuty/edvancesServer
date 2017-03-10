// Instantiate all models
var expect = require('chai').expect;

var Sequelize = require('sequelize');

var db = require('../../../server/db');

var supertest = require('supertest');

var chalk = require('chalk');

describe('User Route', function() {

    var app, User;

    beforeEach('Sync DB', function() {
        return db.sync({
            force: true
        });
    });

    beforeEach('Create app', function() {
        app = require('../../../server/app')(db);
        User = db.model('user');
    });

    describe('Unauthenticated request', function() {

        var guestAgent;

        beforeEach('Create guest agent', function() {
            guestAgent = supertest.agent(app);
        });

        it('should get a 401 response', function(done) {
            guestAgent.get('/api/users/')
                .expect(401)
                .end(done);
        });

    });

    describe('Authenticated request', function() {

        var loggedInAgent;

        var userInfo = {
            email: 'joe@gmail.com',
            password: 'shoopdawoop'
        };

        beforeEach('Create a user', function() {
            return User.create(userInfo);
        });

        beforeEach('Create loggedIn user agent and authenticate', function(done) {
            loggedInAgent = supertest.agent(app);
            loggedInAgent.post('/login').send(userInfo).end(done);
        });

        it('should get with 200 response and with an array as the body', function(done) {
            loggedInAgent.get('/api/users/').expect(200).end(function(err, response) {
                // console.log(response)
                if (err) return done(err);
                expect(response.body).to.be.an('array');
                done();
            });
        });

    });

    describe('Single User request', () => {
        var loggedInAgent;

        var userInfo = {
            email: 'joe@gmail.com',
            password: 'shoopdawoop'
        };

        beforeEach('Create a user', function() {
            return User.create(userInfo);
        });

        beforeEach('Create loggedIn user agent and authenticate', function(done) {
            loggedInAgent = supertest.agent(app);
            loggedInAgent.post('/login').send(userInfo).end(done);
        });

        it('should get a 200 response with an array as the body, the array length should be 2', done => {
            var query = {
                email: userInfo.email
            }
            loggedInAgent.get('/api/users/email').query(query).expect(200).end((err, response) => {
                if (err) return done(err);
                expect(response.body).to.be.an('object');
                expect(response.body.email).to.equal(userInfo.email);
                done();
            })
        })
    })

    describe('Delete User by Email', () => {
        var loggedInAgent;

        var userInfo = {
            email: 'joe@gmail.com',
            password: 'shoopdawoop'
        };

        beforeEach('Create a user', function() {
            return User.create(userInfo);
        });

        beforeEach('Create loggedIn user agent and authenticate', function(done) {
            loggedInAgent = supertest.agent(app);
            loggedInAgent.post('/login').send(userInfo).end(done);
        });

        it ('should DELETE a user given the email', done =>{
            var query = {email: userInfo.email}
            loggedInAgent
            .post('/api/users/delete')
            .send(query)
            .expect(200)
            .end((err, res) => {
                expect(res.body.header).to.equal(200);
                expect(res.body).to.be.a('object');
                expect(res.body.payload).to.equal('Successfuly Deleted');
              done();
            });
         })
    });

    describe('Update User by Email', () => {
        var loggedInAgent;

        var userInfo = {
            email: 'joe@gmail.com',
            password: 'shoopdawoop'
        };

        beforeEach('Create a user', function() {
            return User.create(userInfo);
        });

        beforeEach('Create loggedIn user agent and authenticate', function(done) {
            loggedInAgent = supertest.agent(app);
            loggedInAgent.post('/login').send(userInfo).end(done);
        });

      it('it should UPDATE a user given the email', done => {
            var body ={email:'joe@gmail.com', updates:{
                email:'hello@hello.com',
                password:'shoopdawoop2'
            }}
            loggedInAgent
            .post('/api/users/update')
            .send(body)
            .expect(200)
            .end((err, res) => {
                expect(res.body).to.be.a('object');
                expect(res.body.updatedUser.password).to.equal(undefined);
                expect(res.body.updatedUser.email).to.equal('hello@hello.com');
                done();
            });
     
      });
  });
});

describe('Classroom Route', function() {

    var app, Classroom, User;

    beforeEach('Sync DB', function() {
        return db.sync({
            force: true
        });
    });

    beforeEach('Create app', function() {
        app = require('../../../server/app')(db);
        Classroom = db.model('classroom');
        User = db.model('user')
    });

    var loggedInAgent;

    var userInfo = {
        email: 'joe@gmail.com',
        password: 'shoopdawoop'
    };
    var classroomInfo = {
        title: 'TestClassroom',
        teacher: 1,
        students: [],
        startDate: Date.now(),
        endDate: Date.now(),
        times: []
    }

    beforeEach('Create a user', function() {
        return User.create(userInfo);
    });

    beforeEach('Create a classroom', () => {
        return Classroom.create(classroomInfo)
    });

    beforeEach('Create loggedIn user agent and authenticate', function(done) {
        loggedInAgent = supertest.agent(app);
        loggedInAgent.post('/login').send(userInfo).end(done);
    });

    describe('Unauthenticated request', function() {

        var guestAgent;

        beforeEach('Create guest agent', function() {
            guestAgent = supertest.agent(app);
        });

        it('should get a 401 response', function(done) {
            guestAgent.get('/api/classrooms/')
                .expect(401)
                .end(done);
        });
    });
    describe('Authenticated request', function() {

        it('should get with 200 response and with an array as the body', function(done) {
            loggedInAgent.get('/api/classrooms/').expect(200).end(function(err, response) {
                // console.log(response)
                if (err) return done(err);
                expect(response.body).to.be.an('array');
                done();
            });
        });
    });

     describe('Delete Classroom by Title', () => {
        it ('should DELETE a Classroom given the Title', done =>{
            var query = {title: classroomInfo.title}
            loggedInAgent
            .post('/api/classrooms/delete')
            .send(query)
            .expect(200)
            .end((err, res) => {
                // console.log(chalk.blue.bgRed.bold(JSON.stringify(res.body)));
                expect(res.body.header).to.equal(200);
                expect(res.body).to.be.a('object');
                expect(res.body.payload).to.equal('Successfuly Deleted');
              done();
            });
         })
    });
})