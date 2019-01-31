import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

chai.use(chaiHttp);

const should = chai.should();

describe('POST /api/v1/offices', () => {
  it('should create a new office', (done) => {
    chai.request(server).post('/api/v1/offices').send({
      name: 'house of assembly',
      type: 'state',
    })
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.eql(201);
        done();
      });
  });

  it('should return an error when office name and type already exist', (done) => {
    chai.request(server).post('/api/v1/offices').send({ type: 'federal', name: 'president' })
      .end((err, res) => {
        res.status.should.eql(409);
        done();
      });
  });

  it('should return an error when type is not the expected input', (done) => {
    chai.request(server).post('/api/v1/offices').send({ type: 'geeneral', name: 'president' })
      .end((err, res) => {
        res.status.should.eql(400);
        done();
      });
  });

  it('should return an error when office name is not supplied', (done) => {
    chai.request(server).post('/api/v1/offices').send({ type: 'federal', name: '' })
      .end((err, res) => {
        res.status.should.eql(400);
        done();
      });
  });

  it('should return an error when office type is not supplied', (done) => {
    chai.request(server).post('/api/v1/offices').send({ type: '', name: 'governor' })
      .end((err, res) => {
        res.status.should.eql(400);
        done();
      });
  });
});
