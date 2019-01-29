import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';
import parties from '../models/parties';

chai.use(chaiHttp);

const should = chai.should();

describe('POST /api/v1/parties', () => {
  it('should create a new party', (done) => {
    chai.request(server)
      .post('/api/v1/parties')
      .type('form')
      .field('name', 'republican')
      .field('hqAddress', '2 tanka street')
      .field('acronym', 'bdd')
      .attach('logoUrl', './UI/assets/images/accord.jpg', 'accord.jpg')
      .then((res) => {
        res.status.should.eql(201);
        done();
      });
  });

  it('should not create a new party if party name already exists', (done) => {
    chai.request(server)
      .post('/api/v1/parties')
      .type('form')
      .field('name', 'Peoples Democratic Party')
      .field('hqAddress', '2 tanka street')
      .field('acronym', 'bdd')
      .attach('logoUrl', './UI/assets/images/accord.jpg', 'accord.jpg')
      .then((res) => {
        res.status.should.eql(409);
        done();
      });
  });

  it('should not create a new party without a name field', (done) => {
    chai.request(server)
      .post('/api/v1/parties')
      .type('form')
      .field('name', '')
      .field('hqAddress', '2 tanka street')
      .field('acronym', 'bdd')
      .attach('logoUrl', './UI/assets/images/accord.jpg', 'accord.jpg')
      .then((res) => {
        res.status.should.eql(400);
        done();
      });
  });

  it('should not create a new party without a headquarters address field', (done) => {
    chai.request(server)
      .post('/api/v1/parties')
      .type('form')
      .field('name', 'alliance')
      .field('hqAddress', '')
      .field('acronym', 'bdd')
      .attach('logoUrl', './UI/assets/images/accord.jpg', 'accord.jpg')
      .then((res) => {
        res.status.should.eql(400);
        done();
      });
  });

  it('should not create a new party if the file uploaded is not an image', (done) => {
    chai.request(server)
      .post('/api/v1/parties')
      .type('form')
      .field('name', 'Action Group')
      .field('hqAddress', '2 tanka street')
      .field('acronym', 'bdd')
      .attach('logoUrl', './UI/admin.html', 'admin.html')
      .then((res) => {
        res.status.should.eql(400);
        done();
      });
  });
  it('should not create a new party if the acronym field is empty', (done) => {
    chai.request(server)
      .post('/api/v1/parties')
      .type('form')
      .field('name', 'Action Group')
      .field('hqAddress', '2 tanka street')
      .field('acronym', '')
      .attach('logoUrl', './UI/assets/images/accord.jpg', 'accord.jpg')
      .then((res) => {
        res.status.should.eql(400);
        done();
      });
  });
});
