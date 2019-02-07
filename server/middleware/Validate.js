import Joi from 'joi';
import Helpers from '../helpers/Helpers';


class Validate {
  static validateParty(req, res, next) {
    const errors = [];
    let error;
    const {
      name, hqAddress, acronym, logoUrl,
    } = req.body;

    if (!name) {
      error = 'Party name cannot be empty';
      errors.push(error);
    }

    if (!hqAddress) {
      error = 'Party headquarters address cannot be empty';
      errors.push(error);
    }

    if (!acronym) {
      error = 'Party acronym cannot be empty';
      errors.push(error);
    }

    if (name && Helpers.isEmpty(name)) {
      error = 'Enter a valid party name';
      errors.push(error);
    }
    if (hqAddress && Helpers.isEmpty(hqAddress)) {
      error = 'Enter a valid party address';
      errors.push(error);
    }
    if (acronym && Helpers.isEmpty(acronym)) {
      error = 'Enter a valid party acronym';
      errors.push(error);
    }

    if (logoUrl && Helpers.isEmpty(logoUrl)) {
      error = 'Enter a valid image';
      errors.push(error);
    }
    if (errors.length > 0) {
      res.status(400).json({
        status: 400,
        error: errors,
      });
      return;
    }
    next();
  }

  static validateId(req, res, next) {
    const { id } = req.params;
    if (isNaN(id)) {
      const error = new Error('Invalid id');
      error.status = 400;
      return next(error);
    }
    return next();
  }

  static validateOffice(req, res, next) {
    const { type, name } = req.body;
    const errors = [];
    let error;

    if (!name) {
      error = 'Party name cannot be empty';
      errors.push(error);
    }

    if (!type) {
      error = 'Party type cannot be empty';
      errors.push(error);
    }

    if (type && Helpers.isEmpty(type)) {
      error = 'Enter a valid party type';
      errors.push(error);
    }

    if (errors.length > 0) {
      res.status(400).json({
        status: 400,
        error: errors,
      });
      return;
    }

    next();
  }

  static validateUser(req, res, next) {
    const {
      firstname, lastname, email, password, phoneNumber, passportUrl,
    } = req.body;

    const errors = [];
    let error;

    if (!firstname) {
      error = 'Enter first name';
      errors.push(error);
    }

    if (firstname && firstname.trim().length < 2) {
      error = 'First Name should be at least two characters long';
      errors.push(error);
    }

    if (typeof firstname !== 'string') {
      error = 'First name should be a string';
      errors.push(error);
    }

    if (!lastname) {
      error = 'Enter last name';
      errors.push(error);
    }

    if (lastname && lastname.trim().length < 2) {
      error = 'Last Name should be at least two characters long';
      errors.push(error);
    }

    if (typeof lastname !== 'string') {
      error = 'Last name should be a string';
      errors.push(error);
    }

    if (!email) {
      error = 'Enter valid email';
      errors.push(error);
    }

    if (email && !Helpers.isValidEmail(email)) {
      error = 'Enter valid email';
      errors.push(error);
    }

    if (!password) {
      error = 'Enter password';
      errors.push(error);
    }

    if (password && !Helpers.isValidPassword(password)) {
      error = 'Password should be at least six characters';
      errors.push(error);
    }
    if (!phoneNumber) {
      error = 'Enter phone number';
      errors.push(error);
    }

    if (phoneNumber && !Helpers.isValidPhone(phoneNumber)) {
      error = 'Enter a valid phone number';
      errors.push(error);
    }

    if (!passportUrl) {
      error = 'Enter valid image';
      errors.push(error);
    }

    if (passportUrl && !Helpers.isValidImageUrl(passportUrl)) {
      error = 'Enter a valid jpg or png image';
      errors.push(error);
    }

    if (errors.length > 0) {
      return res.status(400).json({
        status: 400,
        error: errors,
      });
    }
    return next();
  }

  static validateUserLogin(req, res, next) {
    const errors = [];
    let error;
    const { email, password } = req.body;

    if (!email) {
      error = 'Email cannot be empty';
      errors.push(error);
    }

    if (!password) {
      error = 'Password cannot be empty';
      errors.push(error);
    }

    if (email && !Helpers.isValidEmail(email)) {
      error = 'Invalid email';
      errors.push(error);
    }

    if (email && !Helpers.isValidEmail(email)) {
      error = 'Invalid email';
      errors.push(error);
    }

    if (password && !Helpers.isValidPassword(password)) {
      error = 'Invalid password';
      error.status = 400;
      next(error);
    }

    if (errors.length > 0) {
      res.status(400).json({
        status: 400,
        error: errors,
      });
    }
    next();
  }

  static validateVote(req, res, next) {
    const { office, candidate } = req.body;
    if (isNaN(office) || isNaN(candidate)) {
      const error = 'voter, office and candidate fields must be Ids';
      res.status(400).json({
        status: 400,
        error,
      });
    }
    return next();
  }

  static validatePartyName(req, res, next) {
    const { name } = req.body;
    const errors = [];
    let error;
    if (!name) {
      error = 'party name cannot be empty';
      errors.push(error);
    }

    if (name && Helpers.isEmpty(name)) {
      error = 'Enter a valid party name';
      errors.push(error);
    }
    if (errors.length > 0) {
      return res.status(400).json({
        status: 400,
        error: errors,
      });
    }
    next();
  }
}


export default Validate;
