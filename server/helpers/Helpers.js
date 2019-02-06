import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

const secretKey = process.env.SECRET_KEY;

dotenv.config();

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

  static generateToken(payload) {
    const token = jwt.sign(payload, secretKey);
    return token;
  }

  static isValidPassword(password) {
    return password.length >= 6;
  }

  static isValidEmail(email) {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);
  }

  static isValidImageUrl(imgUrl) {
    return /([^\s]+(\.(jpg|png))$)/.test(imgUrl);
  }

  static isValidPhone(phoneNumber) {
    return /^[+]?(\d{0,3})(\d{11})$/.test(phoneNumber);
  }
}

export default Helpers;
