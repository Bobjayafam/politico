import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

class Auth {
  static isLoggedIn(req, res, next) {
    const token = req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
          return res.status(401).json({
            status: 401,
            error: 'You are not authorized for this operation',
          });
        }
        req.decoded = decoded;
        next();
      });
    } else {
      return res.status(401).json({
        status: 401,
        error: 'You are not authorizednfor this operation',
      });
    }
  }


  static checkAdmin(req, res, next) {
    const token = req.headers['x-access-token'];
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      req.decoded = decoded;
      if (!decoded.isAdmin) {
        return res.status(403).json({
          status: 403,
          error: 'You are unauthorized for this operation',
        });
      }
      next();
    });
  }
}

export default Auth;
