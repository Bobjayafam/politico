import Helpers from '../helpers/Helpers';

class Auth {
  static isLoggedIn(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
      res.status(401).json({
        status: 401,
        error: 'You are not authorized for this operation',
      });
      return;
    }
    const isUser = Helpers.verifyToken(token);
    if (isUser && !isUser.isAdmin) {
      return next();
    }
    return res.status(401).json({
      status: 401,
      error: 'You are not authorized for this operation',
    });
  }

  static isLoggedInAsAdmin(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
      res.status(401).json({
        status: 401,
        error: 'You are not authorized for this operation',
      });
      return;
    }
    const isUser = Helpers.verifyToken(token);
    if (isUser && isUser.isAdmin) {
      return next();
    }
    return res.status(401).json({
      status: 401,
      error: 'You are not authorized for this operation',
    });
  }
}

export default Auth;
