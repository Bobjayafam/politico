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

  it('should return all parties', (done) => {
    chai.request(server).get('/api/v1/parties')
      .end((err, res) => {
        should.not.exist(err);
        res.body.data.length.should.eql(4);
        res.status.should.eql(200);
        done();
      });
  });
});

describe('PATCH /api/v1/parties/:id/name', () => {
  it('should update a party name', (done) => {
    chai.request(server).patch('/api/v1/parties/1/name').send({
      name: 'Republican',
    }).end((err, res) => {
      should.not.exist(err);
      res.status.should.equal(200);
      done();
    });
  });

  it('should not update a party name if the id is not a number', (done) => {
    chai.request(server).patch('/api/v1/parties/mmmm/name').send({
      name: 'Republican',
    }).end((err, res) => {
      res.status.should.equal(400);
      done();
    });
  });

  it('should not update a party name if the id is not found', (done) => {
    chai.request(server).patch('/api/v1/parties/20/name').send({
      name: 'Republican',
    }).end((err, res) => {
      res.status.should.equal(404);
      done();
    });
  });
});

describe('DELETE /api/v1/parties', () => {
  it('should delete a single party', (done) => {
    chai.request(server).del('/api/v1/parties/1')
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.eql(200);
        done();
      });
  });

  it('should not delete a party if the id is not valid', (done) => {
    chai.request(server).del('/api/v1/parties/mnbvn')
      .end((err, res) => {
        res.status.should.eql(400);
        res.body.error.should.eql('Invalid id');
        done();
      });
  });

  it('should return an error if there is no party with the id', (done) => {
    chai.request(server).del('/api/v1/parties/98')
      .end((err, res) => {
        res.status.should.eql(404);
        res.body.error.should.eql('No party with such id');
        done();
      });
  });
});
