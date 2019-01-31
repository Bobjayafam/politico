import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

chai.use(chaiHttp);

const should = chai.should();

describe('GET /api/v1/offices', () => {
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
