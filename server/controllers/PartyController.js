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
}

export default PartyController;
