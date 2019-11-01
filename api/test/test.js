/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chatHttp from 'chai-http';
import 'chai/register-should';
import app from '../index';

chai.use(chatHttp);
const { expect } = chai;


describe('Testing the user endpoints:', () => {
  it('It should create a user', (done) => {
    const user = {
      email: 'test@gmail.com',
      firstName: 'test ',
      lastName: 'user',
      attendance: 100,
      ip1: 29,
      ip2: 17,
      ip3: 19,
      ip4: 27,
      recom1: true,
      recom2: true,
      reason1: 'IP quality and completion',
      reason2: 'IP quality and completion'

    };
    chai.request(app)
      .post('/api/v1/users')
      .set('Accept', 'application/json')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.data).to.include({
          id: 1,
          email: user.email,
          attendance: user.attendance,
          firstName: user.firstName
        });
        done();
      });
  });

  it('It should not create a user with incomplete parameters', (done) => {
    const user = {
      firstName: 'test ',
      lastName: 'user',
      attendance: 100,
    };
    chai.request(app)
      .post('/api/v1/users')
      .set('Accept', 'application/json')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('It should get all users', (done) => {
    chai.request(app)
      .get('/api/v1/users')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        res.body.data[0].should.have.property('id');
        res.body.data[0].should.have.property('firstName');
        res.body.data[0].should.have.property('email');
        res.body.data[0].should.have.property('attendance');
        done();
      });
  });
});
