import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

chai.use(chaiHttp);

const should = chai.should();

describe('GET /api/v1/offices', () => {
  it('should return all offices', (done) => {
    chai.request(server).get('/api/v1/offices')
      .end((err, res) => {
        res.status.should.eql(200);
        done();
      });
  });

  it('should return a single office', (done) => {
    chai.request(server).get('/api/v1/offices/1')
      .end((err, res) => {
        should.not.exist(err);
        res.body.data[0].name.should.eql('president');
        res.status.should.eql(200);
        done();
      });
  });


  it('should not return an office if the id is not valid', (done) => {
    chai.request(server).get('/api/v1/offices/mnbvn')
      .end((err, res) => {
        res.status.should.eql(400);
        res.body.error.should.eql('Invalid id');
        done();
      });
  });

  it('should return an error if there is no office with the id', (done) => {
    chai.request(server).get('/api/v1/offices/9')
      .end((err, res) => {
        res.status.should.eql(404);
        res.body.error.should.eql('No office with such id');
        done();
      });
  });
});

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
    chai.request(server).post('/api/v1/offices').send({
      name: 'house of assembly',
      type: 'state',
    })
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
