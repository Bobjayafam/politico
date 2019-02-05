// import chai from 'chai';
// import chaiHttp from 'chai-http';
// import server from '../server';

// const newUser = {
//   firstname: 'David',
//   lastname: 'Itoadon',
//   othername: 'Omofoma',
//   email: 'pastor_dave@yahoo.com',
//   password: '123456',
//   phoneNumber: '09034589684',
//   passportUrl: 'http://kkssls.jpg',
// };

// const newUser1 = {
//   firstname: '',
//   lastname: 'Ogun',
//   othername: 'Bayo',
//   email: 'bayo@yahoo.com',
//   password: '123456',
//   phoneNumber: '09034589684',
//   passportUrl: 'http://kkssls.jpg',
// };

// chai.use(chaiHttp);

// const should = chai.should();

// let user2Token;
// let adminToken;

// describe('POST /auth/login', () => {
//   it('should return a token when loggedin with valid Admin credentials', async () => {
//     try {
//       const res = await chai.request(server)
//         .post('/api/v1/auth/login')
//         .send({
//           email: 'afamjudeo@gmail.com',
//           password: '123456',
//         });
//       res.status.should.eql(200);
//       res.body.data[0].should.be.an('object');
//       res.body.data[0].should.have.property('token');
//       adminToken = res.body.data[0].token;
//     } catch (error) {
//       console.log(error);
//     }
//   });

//   it('should return a token when supplied with valid credentials', async () => {
//     try {
//       const res = await chai.request(server)
//         .post('/api/v1/auth/login')
//         .send({
//           email: 'stapolly@yahoo.com',
//           password: '123456',
//         });
//       res.status.should.eql(200);
//       res.body.data[0].should.be.an('object');
//       res.body.data[0].should.have.property('token');
//       user2Token = res.body.data[0].token;
//     } catch (error) {
//       console.log(error);
//     }
//   });

//   it('should return an error when email is not correct', async () => {
//     try {
//       const res = await chai.request(server)
//         .post('/api/v1/auth/login')
//         .send({
//           email: 'stapolly12@yahoo.com',
//           password: '123456',
//         });
//       res.status.should.eql(401);
//     } catch (error) {
//       console.log(error);
//     }
//   });

//   it('should return an error when password is not correct', async () => {
//     try {
//       const res = await chai.request(server)
//         .post('/api/v1/auth/login')
//         .send({
//           email: 'stapolly@yahoo.com',
//           password: '123456789',
//         });
//       res.status.should.eql(401);
//     } catch (error) {
//       console.log(error);
//     }
//   });
// });

// describe('POST /api/v1/auth/signup', () => {
//   it('should signup a user', async () => {
//     try {
//       const res = await chai.request(server)
//         .post('/api/v1/auth/signup')
//         .send(newUser);
//       res.status.should.eql(201);
//     } catch (error) {
//       console.log(error);
//     }
//   });

//   it('should return an error if the same email has been used to sign up before', async () => {
//     try {
//       const res = await chai.request(server)
//         .post('/api/v1/auth/signup')
//         .send(newUser);
//       res.status.should.eql(409);
//     } catch (error) {
//       console.log(error);
//     }
//   });

//   it('should return an error if the firstname or last name is empty', async () => {
//     try {
//       const res = await chai.request(server)
//         .post('/api/v1/auth/signup')
//         .send(newUser1);
//       res.status.should.eql(400);
//     } catch (error) {
//       console.log(error);
//     }
//   });

//   it('should return an error if the password is less than 6 characters', async () => {
//     try {
//       const res = await chai.request(server)
//         .post('/api/v1/auth/signup')
//         .send({
//           firstname: 'Bayo',
//           lastname: 'Ojo',
//           othername: 'John',
//           email: 'bayo123@yahoo.com',
//           password: 'lion',
//           passportUrl: 'http://nsjjksk.jpg',
//           phoneNumber: '08025862169',
//         });
//       res.status.should.eql(400);
//     } catch (error) {
//       console.log(error);
//     }
//   });
// });

// describe('POST /api/v1/parties', () => {
//   it('should create a new party with correct admin token', (done) => {
//     chai.request(server)
//       .post('/api/v1/parties')
//       .set('x-access-token', adminToken)
//       .type('form')
//       .field('name', 'republican')
//       .field('hqAddress', '2 tanka street')
//       .field('acronym', 'bdd')
//       .attach('logoUrl', './UI/assets/images/accord.jpg', 'accord.jpg')
//       .then((res) => {
//         res.status.should.eql(201);
//         done();
//       });
//   });

//   it('should not create a new party with wrong admin token', (done) => {
//     chai.request(server)
//       .post('/api/v1/parties')
//       .set('x-access-token', 'adminToken')
//       .type('form')
//       .field('name', 'republican')
//       .field('hqAddress', '2 tanka street')
//       .field('acronym', 'bdd')
//       .attach('logoUrl', './UI/assets/images/accord.jpg', 'accord.jpg')
//       .then((res) => {
//         res.status.should.eql(201);
//         done();
//       });
//   });

//     it('should not create a new party if party name already exists', (done) => {
//       chai.request(server)
//         .post('/api/v1/parties')
//         .set('x-access-token', adminToken)
//         .type('form')
//         .field('name', 'Peoples Democratic Party')
//         .field('hqAddress', '2 tanka street')
//         .field('acronym', 'bdd')
//         .attach('logoUrl', './UI/assets/images/accord.jpg', 'accord.jpg')
//         .then((res) => {
//           res.status.should.eql(401);
//           done();
//         });
//     });

//     it('should not create a new party without a name field', (done) => {
//       chai.request(server)
//         .post('/api/v1/parties')
//         .set('x-access-token', adminToken)
//         .type('form')
//         .field('name', '')
//         .field('hqAddress', '2 tanka street')
//         .field('acronym', 'bdd')
//         .attach('logoUrl', './UI/assets/images/accord.jpg', 'accord.jpg')
//         .then((res) => {
//           res.status.should.eql(400);
//           done();
//         });
//     });

//     it('should not create a new party without a headquarters address field', (done) => {
//       chai.request(server)
//         .post('/api/v1/parties')
//         .set('x-access-token', adminToken)
//         .type('form')
//         .field('name', 'alliance')
//         .field('hqAddress', '')
//         .field('acronym', 'bdd')
//         .attach('logoUrl', './UI/assets/images/accord.jpg', 'accord.jpg')
//         .then((res) => {
//           res.status.should.eql(400);
//           done();
//         });
//     });

//     it('should not create a new party if the file uploaded is not an image', (done) => {
//       chai.request(server)
//         .post('/api/v1/parties')
//         .set('x-access-token', adminToken)
//         .type('form')
//         .field('name', 'Action Group')
//         .field('hqAddress', '2 tanka street')
//         .field('acronym', 'bdd')
//         .attach('logoUrl', './UI/admin.html', 'admin.html')
//         .then((res) => {
//           res.status.should.eql(400);
//           done();
//         });
//     });
//     it('should not create a new party if the acronym field is empty', (done) => {
//       chai.request(server)
//         .post('/api/v1/parties')
//         .set('x-access-token', adminToken)
//         .type('form')
//         .field('name', 'Action Group')
//         .field('hqAddress', '2 tanka street')
//         .field('acronym', '')
//         .attach('logoUrl', './UI/assets/images/accord.jpg', 'accord.jpg')
//         .then((res) => {
//           res.status.should.eql(400);
//           done();
//         });
//     });
//   });

//   describe('GET /api/v1/parties', () => {
//     it('should return a single party', (done) => {
//       chai.request(server).get('/api/v1/parties/1')
//         .set('x-access-token', user2Token)
//         .end((err, res) => {
//           should.not.exist(err);
//           res.status.should.eql(200);
//           done();
//         });
//     });

//     it('should not return a party if the id is not valid', (done) => {
//       chai.request(server).get('/api/v1/parties/mnbvn')
//         .set('x-access-token', adminToken)
//         .end((err, res) => {
//           res.status.should.eql(400);
//           res.body.error.should.eql('Invalid id');
//           done();
//         });
//     });

//     it('should return an error if there is no party with the id', (done) => {
//       chai.request(server).get('/api/v1/parties/9')
//         .end((err, res) => {
//           res.status.should.eql(404);
//           res.body.error.should.eql('No party with such id');
//           done();
//         });
//     });

//     it('should return all parties', (done) => {
//       chai.request(server).get('/api/v1/parties')
//         .end((err, res) => {
//           should.not.exist(err);
//           res.status.should.eql(200);
//           done();
//         });
//     });
//   });

//   describe('PATCH /api/v1/parties/:id/name', () => {
//     it('should update a party name', (done) => {
//       chai.request(server).patch('/api/v1/parties/1/name').send({
//         name: 'Republican',
//       }).end((err, res) => {
//         should.not.exist(err);
//         res.status.should.equal(200);
//         done();
//       });
//     });

//     it('should not update a party name if the id is not a number', (done) => {
//       chai.request(server).patch('/api/v1/parties/mmmm/name').send({
//         name: 'Republican',
//       }).end((err, res) => {
//         res.status.should.equal(400);
//         done();
//       });
//     });

//     it('should not update a party name if the id is not found', (done) => {
//       chai.request(server).patch('/api/v1/parties/20/name')
//       .set('x-access-token', adminToken)
//       .send({
//         name: 'Republican',
//       }).end((err, res) => {
//         res.status.should.equal(404);
//         done();
//       });
//     });
//   });

//   describe('DELETE /api/v1/parties', () => {
//     it('should delete a single party', (done) => {
//       chai.request(server).del('/api/v1/parties/1')
//         .set('x-access-token', adminToken)
//         .end((err, res) => {
//           should.not.exist(err);
//           res.status.should.eql(200);
//           done();
//         });
//     });

//     it('should not delete a party if the id is not valid', (done) => {
//       chai.request(server).del('/api/v1/parties/mnbvn')
//         .set('x-access-token', adminToken)
//         .end((err, res) => {
//           res.status.should.eql(400);
//           res.body.error.should.eql('Invalid id');
//           done();
//         });
//     });

//   it('should return an error if there is no party with the id', (done) => {
//     chai.request(server).del('/api/v1/parties/98')
//       .set('x-access-token', adminToken)
//       .end((err, res) => {
//         res.status.should.eql(404);
//         res.body.error.should.eql('No party with such id');
//         done();
//       });
//   });
// });
