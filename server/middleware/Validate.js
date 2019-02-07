import Helpers from '../helpers/Helpers';


class Validate {
  static validateParty(req, res, next) {
    const errors = [];
    const {
      name, hqAddress, acronym, logoUrl,
    } = req.body;
    if (!name || Helpers.isEmpty(name)) {
      const error = 'Enter a valid party name';
      errors.push(error);
    }
    if (!hqAddress || Helpers.isEmpty(hqAddress)) {
      const error = 'Enter a valid party address';
      errors.push(error);
    }
    if (!acronym || Helpers.isEmpty(acronym)) {
      const error = 'Enter a valid party acronym';
      errors.push(error);
    }

    // if (!logoUrl || Helpers.isEmpty(logoUrl)) {
    //   const error = 'Enter a valid image';
    //   errors.push(error);
    // }
    if (errors.length > 0) {
      res.status(400).json({
        status: 400,
        error: errors,
      });
      return;
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
      const error = 'Enter a valid party name';
      errors.push(error);
    }
    if (!type || Helpers.isEmpty(type)) {
      const error = 'Enter a valid party type';
      errors.push(error);
    }
    if (type.trim().toLowerCase() !== 'federal' && type.trim().toLowerCase() !== 'state' && type.trim().toLowerCase() !== 'legislative' && type.trim().toLowerCase() !== 'local government') {
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
    let error;

    if (!firstname) {
      error = 'Enter first name';
      errors.push(error);
    }

    if (!lastname) {
      error = 'Enter last name';
      errors.push(error);
    }

    if (!email) {
      error = 'Enter valid email';
      errors.push(error);
    }

    if (!password) {
      error = 'Enter password';
      errors.push(error);
    }

    if (!phoneNumber) {
      error = 'Enter phone number';
      errors.push(error);
    }

    if (!passportUrl) {
      error = 'Enter valid image';
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
