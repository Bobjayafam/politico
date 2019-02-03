import Helpers from '../helpers/Helpers';

class Validate {
  static validateParty(req, res, next) {
    const {
      name, hqAddress, acronym,
    } = req.body;
    if (Helpers.isEmpty(name)) {
      const error = new Error('Enter a valid party name');
      error.status = 400;
      return next(error);
    }
    if (Helpers.isEmpty(hqAddress)) {
      const error = new Error('Enter a valid party address');
      error.status = 400;
      return next(error);
    }
    if (Helpers.isEmpty(acronym)) {
      const error = new Error('Enter a valid party acronym');
      error.status = 400;
      return next(error);
    }
    return next();
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

    if (typeof name === 'string' && name.trim().length === 0) {
      const error = new Error('Enter a valid office name');
      error.status = 400;
      return next(error);
    }
    if (typeof type === 'string' && type.trim().length === 0) {
      const error = new Error('Enter a valid office name');
      error.status = 400;
      return next(error);
    }
    if (type !== 'federal' && type.trim().toLowerCase() !== 'state' && type.trim().toLowerCase() !== 'legislative' && type.trim().toLowerCase() !== 'local government') {
      const error = new Error('Office type can only be either federal, state, legislative or local government');
      error.status = 400;
      return next(error);
    }
    return next();
  }

  static validateUser(req, res, next) {
    const {
      firstname, lastname, othername, email, password, phoneNumber, passportUrl,
    } = req.body;

    if (Helpers.isEmpty(firstname) || Helpers.isEmpty(lastname)) {
      const error = new Error('First Name or Last Name cannot be empty');
      error.status = 400;
      return next(error);
    }
    if (!Helpers.isValidImageUrl(passportUrl)) {
      const error = new Error('Enter a valid image URL');
      error.status = 400;
      return next(error);
    }
    if (!Helpers.isValidEmail(email)) {
      const error = new Error('Enter a valid email');
      error.status = 400;
      return next(error);
    }
    if (!Helpers.isValidPhone(phoneNumber)) {
      const error = new Error('Enter a valid phone number');
      error.status = 400;
      return next(error);
    }

    if (!Helpers.isValidPassword(password)) {
      const error = new Error('password must 6 characters or more');
      error.status = 400;
      return next(error);
    }

    return next();
  }

  static validateUserLogin(req, res, next) {
    const { email, password } = req.body;
    if (!Helpers.isValidEmail(email)) {
      const error = new Error('Invalid email');
      error.status = 401;
      return next(error);
    }

    if (!Helpers.isValidPassword(password)) {
      const error = new Error('Invalid password');
      error.status = 401;
      return next(error);
    }
    return next();
  }

  static validateVote(req, res, next) {
    const { voter, office, candidate } = req.body;
    if (isNaN(voter) || isNaN(office) || isNaN(candidate)) {
      const error = new Error('voter, office and candidate fields must be numbers');
      error.status = 400;
      next(error);
    }
    return next();
  }
}


export default Validate;
