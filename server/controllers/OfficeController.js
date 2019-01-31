import offices from '../models/offices';

class OfficeController {
  static createoffice(req, res, next) {
    const {
      type, name,
    } = req.body;
    const newOffice = {
      id: offices.length + 1,
      type,
      name,
    };
    const officeFound = offices.filter(office => office.name === name && office.type === type)[0];
    if (officeFound) {
      const error = new Error(`Office with name ${name} and type ${type} already exists`);
      error.status = 409;
      return next(error);
    }
    offices.push(newOffice);
    return res.status(201).json({
      status: 201,
      data: [
        newOffice,
      ],
    });
  }

  static getAllOffices(req, res, next) {
    res.status(200).json({
      status: 200,
      data: [...offices],
    });
  }

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

