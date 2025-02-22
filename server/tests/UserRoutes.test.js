// npm install supertest mocha chai chai-http --save-dev
// script --> "test": "mocha --require @babel/register --recursive --exit"
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index.js'; // Update the path to your main server file
import User from '../Models/User.js';
import sinon from 'sinon';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

chai.use(chaiHttp);
const { expect } = chai;

describe('User Routes', () => {
  let sandbox;
  
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('POST /register', () => {
    it('should register a new user', async () => {
      const user = {
        username: 'JohnDoe',
        password: 'Password123!',
        email: 'johndoe@example.com',
        age: 25,
        gender: 'Male',
        country: 'USA',
        isAdmin: false
      };

      sandbox.stub(User, 'findOne').resolves(null);
      sandbox.stub(User.prototype, 'save').resolves(user);
      sandbox.stub(bcrypt, 'genSalt').resolves('salt');
      sandbox.stub(bcrypt, 'hash').resolves('hashedPassword');

      const res = await chai.request(app).post('/register').send(user);
      expect(res).to.have.status(201);
      expect(res.body).to.have.property('message', 'User created successfully');
    });

    it('should return 409 if user exists', async () => {
      const user = {
        username: 'JohnDoe',
        password: 'Password123!',
        email: 'johndoe@example.com'
      };

      sandbox.stub(User, 'findOne').resolves(user);

      const res = await chai.request(app).post('/register').send(user);
      expect(res).to.have.status(409);
      expect(res.body).to.have.property('message', 'User already exists');
    });
  });

  describe('POST /login', () => {
    it('should login a user', async () => {
      const user = {
        _id: '123',
        email: 'johndoe@example.com',
        password: 'hashedPassword',
        verified: true
      };

      const loginData = {
        email: 'johndoe@example.com',
        password: 'Password123!'
      };

      sandbox.stub(User, 'findOne').resolves(user);
      sandbox.stub(bcrypt, 'compare').resolves(true);
      sandbox.stub(jwt, 'sign').yields(null, 'token');

      const res = await chai.request(app).post('/login').send(loginData);
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('token');
    });

    it('should return 401 for invalid credentials', async () => {
      const loginData = {
        email: 'johndoe@example.com',
        password: 'Password123!'
      };

      sandbox.stub(User, 'findOne').resolves(null);

      const res = await chai.request(app).post('/login').send(loginData);
      expect(res).to.have.status(401);
      expect(res.body).to.have.property('message', 'Invalid credentials');
    });
  });

  describe('PATCH /forgot-password', () => {
    it('should send reset password email', async () => {
      const user = {
        _id: '123',
        email: 'johndoe@example.com'
      };

      sandbox.stub(User, 'findOne').resolves(user);
      sandbox.stub(User.prototype, 'save').resolves(user);

      const res = await chai.request(app).patch('/forgot-password').send({ email: 'johndoe@example.com' });
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('message', 'Check your email for the reset link');
    });

    it('should return 204 if email does not exist', async () => {
      sandbox.stub(User, 'findOne').resolves(null);

      const res = await chai.request(app).patch('/forgot-password').send({ email: 'nonexistent@example.com' });
      expect(res).to.have.status(204);
      expect(res.body).to.have.property('message', 'Email does not exist');
    });
  });

  describe('PATCH /reset-password/:id', () => {
    it('should reset the user password', async () => {
      const user = {
        _id: '123',
        email: 'johndoe@example.com',
        verificationToken: 'token'
      };

      sandbox.stub(User, 'findOne').resolves(user);
      sandbox.stub(User.prototype, 'save').resolves(user);
      sandbox.stub(bcrypt, 'genSalt').resolves('salt');
      sandbox.stub(bcrypt, 'hash').resolves('hashedPassword');

      const res = await chai.request(app).patch('/reset-password/token').send({ password: 'NewPassword123!' });
      expect(res).to.have.status(201);
      expect(res.body).to.have.property('message', 'Password reset successfully');
    });

    it('should return 404 for invalid token', async () => {
      sandbox.stub(User, 'findOne').resolves(null);

      const res = await chai.request(app).patch('/reset-password/invalidtoken').send({ password: 'NewPassword123!' });
      expect(res).to.have.status(404);
      expect(res.body).to.have.property('message', 'Invalid verification token');
    });
  });

  describe('PATCH /verify/:id', () => {
    it('should verify the user', async () => {
      const user = {
        _id: '123',
        email: 'johndoe@example.com',
        verificationToken: 'token',
        verified: false
      };

      sandbox.stub(User, 'findOne').resolves(user);
      sandbox.stub(User.prototype, 'save').resolves(user);
      sandbox.stub(jwt, 'sign').yields(null, 'token');

      const res = await chai.request(app).patch('/verify/token').send();
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('token');
      expect(res.body.user).to.have.property('verified', true);
    });

    it('should return 404 for invalid token', async () => {
      sandbox.stub(User, 'findOne').resolves(null);

      const res = await chai.request(app).patch('/verify/invalidtoken').send();
      expect(res).to.have.status(404);
      expect(res.body).to.have.property('message', 'Invalid verification code');
    });
  });

  describe('GET /resend-code/:id', () => {
    it('should resend verification code', async () => {
      const user = {
        _id: '123',
        email: 'johndoe@example.com',
        verificationToken: 'token'
      };

      sandbox.stub(User, 'findById').resolves(user);

      const res = await chai.request(app).get('/resend-code/123').send();
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('message', 'Verification link sent to your email');
    });

    it('should return 404 if user does not exist', async () => {
      sandbox.stub(User, 'findById').resolves(null);

      const res = await chai.request(app).get('/resend-code/invalidid').send();
      expect(res).to.have.status(404);
      expect(res.body).to.have.property('message', 'User does not exist');
    });
  });

  describe('GET /profile/:id', () => {
    it('should get the user profile', async () => {
      const user = {
        _id: '123',
        email: 'johndoe@example.com'
      };

      sandbox.stub(User, 'findById').resolves(user);

      const res = await chai.request(app).get('/profile/123').send();
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('user');
    });

    it('should return 404 if user does not exist', async () => {
      sandbox.stub(User, 'findById').resolves(null);

      const res = await chai.request(app).get('/profile/invalidid').send();
      expect(res).to.have.status(404);
      expect(res.body).to.have.property('message', 'User does not exist');
    });
  });

  describe('PUT /profile/:id', () => {
    it('should update the user profile', async () => {
      const user = {
        _id: '123',
        username: 'JohnDoe',
        age: 25,
        gender: 'Male',
        email: 'johndoe@example.com',
        country: 'USA',
        isAdmin: false,
        verified: true
      };

      const updateData = {
        username: 'JaneDoe',
        age: 26,
        gender: 'Female',
        email: 'janedoe@example.com',
        country: 'Canada'
      };

      sandbox.stub(User, 'findById').resolves(user);
      sandbox.stub(User.prototype, 'save').resolves(user);

      const res = await chai.request(app).put('/profile/123').send(updateData);
      expect(res).to.have.status(201);
      expect(res.body).to.have.property('message', 'Profile updated successfully');
      expect(res.body.user).to.have.property('username', 'JaneDoe');
      expect(res.body.user).to.have.property('age', 26);
      expect(res.body.user).to.have.property('gender', 'Female');
      expect(res.body.user).to.have.property('email', 'janedoe@example.com');
      expect(res.body.user).to.have.property('country', 'Canada');
    });

    it('should return 404 if user does not exist', async () => {
      sandbox.stub(User, 'findById').resolves(null);

      const res = await chai.request(app).put('/profile/invalidid').send({});
      expect(res).to.have.status(404);
      expect(res.body).to.have.property('message', 'Failed to update, Try again!');
    });
  });

  describe('DELETE /profile/:id', () => {
    it('should delete the user profile', async () => {
      const user = {
        _id: '123',
        email: 'johndoe@example.com'
      };

      sandbox.stub(User, 'findById').resolves(user);
      sandbox.stub(User, 'deleteOne').resolves();

      const res = await chai.request(app).delete('/profile/123').send();
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('message', 'User deleted successfully.');
    });

    it('should return 204 if user does not exist', async () => {
      sandbox.stub(User, 'findById').resolves(null);

      const res = await chai.request(app).delete('/profile/invalidid').send();
      expect(res).to.have.status(204);
      expect(res.body).to.have.property('message', 'User not found');
    });
  });

  describe('POST /logout', () => {
    it('should logout the user', async () => {
      const res = await chai.request(app).post('/logout').send();
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('message', 'Logout successful');
    });
  });
});
