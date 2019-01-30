import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

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

describe('GET /api/v1/parties', () => {
  it('should return a single party', (done) => {
    chai.request(server).get('/api/v1/parties/1')
      .end((err, res) => {
        should.not.exist(err);
        res.body.data[0].name.should.eql('Peoples Democratic Party');
        res.status.should.eql(200);
        done();
      });
  });

  it('should not return a party if the id is not valid', (done) => {
    chai.request(server).get('/api/v1/parties/mnbvn')
      .end((err, res) => {
        res.status.should.eql(400);
        res.body.error.should.eql('Invalid id');
        done();
      });
  });

  it('should return an error if there is no party with the id', (done) => {
    chai.request(server).get('/api/v1/parties/9')
      .end((err, res) => {
        res.status.should.eql(404);
        res.body.error.should.eql('No party with such id');
        done();
      });
  });
});
