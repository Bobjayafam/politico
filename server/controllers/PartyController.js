import parties from '../models/parties';
import { logoUrlUploaded } from '../middleware/imageUpload';

class PartyController {
  static createParty(req, res, next) {
    const {
      name, hqAddress, acronym,
    } = req.body;
    const newParty = {
      id: parties.length + 1,
      name,
      hqAddress,
      logoUrl: logoUrlUploaded,
      acronym,
    };
    const partyFound = parties.filter(party => party.name === name)[0];
    if (partyFound) {
      const error = new Error(`Party with name ${name} already exists`);
      error.status = 409;
      return next(error);
    }
    parties.push(newParty);
    return res.status(201).json({
      status: 201,
      data: [
        newParty,
      ],
    });
  }

  static getOneParty(req, res, next) {
    const id = parseInt(req.params.id, 10);

    const partyFound = parties.filter(party => party.id === id)[0];
    if (partyFound) {
      return res.status(200).json({
        status: 200,
        data: [partyFound],
      });
    }
    const error = new Error('No party with such id');
    error.status = 404;
    return next(error);
  }
}

export default PartyController;
