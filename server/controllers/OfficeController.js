import offices from '../models/offices';

class OfficeController {
  static getAllOffices(req, res, next) {
    res.status(200).json({
      status: 200,
      data: [...offices],
    });
  }
}

export default OfficeController;
