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
}

export default OfficeController;
