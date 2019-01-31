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
});
