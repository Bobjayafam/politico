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
}


export default Validate;
