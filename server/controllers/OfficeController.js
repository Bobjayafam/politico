import offices from '../models/offices';

class OfficeController {
  static getOneOffice(req, res, next) {
    const id = parseInt(req.params.id, 10);

    const officeFound = offices.filter(office => office.id === id)[0];
    if (officeFound) {
      return res.status(200).json({
        status: 200,
        data: [officeFound],
      });
    }
    const error = new Error('No office with such id');
    error.status = 404;
    return next(error);
  }
}

export default OfficeController;
