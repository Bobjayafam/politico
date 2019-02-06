import Helpers from '../helpers/Helpers';


class Validate {
  static validateParty(req, res, next) {
    const errors = [];
    let error;
    const {
      name, hqAddress, acronym, logoUrl,
    } = req.body;
    console.log('body', req.body);
    if (name === '' || !name) {
      error = 'enter name';
      errors.push(error);
    }
    if (hqAddress === '' || !hqAddress) {
      error = 'enter hq address';
      errors.push(error);
    }
    if (acronym === '' || !acronym) {
      error = 'enter an acronym';
      errors.push(error);
    }

    if (!logoUrl || logoUrl === '') {
      error = 'Enter a valid image';
      errors.push(error);
    }

    if (errors.length > 0) {
      res.status(400).json({
        status: 400,
        error: errors,
      });
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
    const errors = [];

    if (!name || Helpers.isEmpty(name)) {
      const error = 'Enter a valid office name';
      errors.push(error);
    }
    if (!type || Helpers.isEmpty(type)) {
      const error = 'Enter a valid office type';
      errors.push(error);
    }
    if (type !== 'federal' && type !== 'state' && type !== 'legislative' && type !== 'local government') {
      const error = 'Office type can only be either federal, state, legislative or local government';
      errors.push(error);
    }

    if (errors.length > 0) {
      res.status(400).json({
        status: 400,
        error: errors,
      });
      return;
    }

    return next();
  }

  static validateUser(req, res, next) {
    const {
      firstname, lastname, othername, email, password, phoneNumber, passportUrl,
    } = req.body;

    const errors = [];

    if (!firstname || !lastname || Helpers.isEmpty(firstname) || Helpers.isEmpty(lastname)) {
      const error = 'First Name or Last Name cannot be empty';
      errors.push(error);
    }
    if (!passportUrl || !Helpers.isValidImageUrl(passportUrl)) {
      const error = 'Enter a valid image URL';
      errors.push(error);
    }
    if (!email || !Helpers.isValidEmail(email)) {
      const error = 'Enter a valid email';
      errors.push(error);
    }
    if (!phoneNumber || !Helpers.isValidPhone(phoneNumber)) {
      const error = 'Enter a valid phone number';
      errors.push(error);
    }

    if (!password || !Helpers.isValidPassword(password)) {
      const error = 'password must 6 characters or more';
      errors.push(error);
    }

    if (errors.length > 0) {
      res.status(400).json({
        status: 400,
        error: errors,
      });
      return;
    }

    return next();
  }

  static validateUserLogin(req, res, next) {
    const errors = [];
    const { email, password } = req.body;
    if (!email || !Helpers.isValidEmail(email)) {
      const error = 'Invalid email';
      errors.push(error);
    }

    if (!password || !Helpers.isValidPassword(password)) {
      const error = 'Invalid password';
      error.status = 400;
      return next(error);
    }

    if (errors.length > 0) {
      res.status(400).json({
        status: 400,
        error: errors,
      });
      return;
    }
    return next();
  }

  static validateVote(req, res, next) {
    const { office, candidate } = req.body;
    if (isNaN(office) || isNaN(candidate)) {
      const error = 'voter, office and candidate fields must be numbers';
      res.status(400).json({
        status: 400,
        error,
      });
    }
    return next();
  }

  static validatePartyName(req, res, next) {
    const { name } = req.body;

    if (!name || Helpers.isEmpty(name)) {
      const error = 'Enter a valid party name';
      res.status(400).json({
        status: 400,
        error,
      });
      return;
    }
    return next();
  }
}


export default Validate;
