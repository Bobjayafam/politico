import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

chai.use(chaiHttp);

const should = chai.should();

describe('API home route', () => {
  describe('GET /api/v1', () => {
    it('should return json', (done) => {
      chai
        .request(server)
        .get('/api/v1')
        .end((error, res) => {
          should.not.exist(error);
          res.status.should.eql(200);
          res.type.should.eql('application/json');
          res.body.status.should.equal(200);
          res.body.data[0].message.should.eql('Welcome to politico API version 1');
          done();
        });
    });

    it('should return not Found when an endpoint that does not exist is requested', (done) => {
      chai
        .request(server)
        .get('/api/v1/ncnccnm')
        .end((error, res) => {
          res.status.should.eql(404);
          res.type.should.eql('application/json');
          res.body.status.should.equal(404);
          done();
        });
    });
  });
});
