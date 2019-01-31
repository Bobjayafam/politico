import bcrypt from 'bcrypt';

class Helpers {
  static isEmpty(data) {
    return data.toLowerCase().trim() === '';
  }

  static hashPassword(password) {
    return bcrypt.hashSync(password, 10);
  }

  static comparePassword(password, hash) {
    return bcrypt.compareSync(password, hash);
  }
}

export default Helpers;
