import {
    ApplicationException,
    BadRequestException,
    EmailAlreadyExistsExeption,
    NotFoundException,
    UnauthenticatedException,
    UnauthorizedException,
    ValidationException,
  } from '../../utilis/errors/error.utilis';
  
  import { Request, Response, NextFunction } from 'express';
  
  const errorMiddleware = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (err instanceof ValidationException) {
      return res.status(err.statuscode).json({
        success: false,
        message: err.message,
      });
    } else if (
      err instanceof UnauthenticatedException ||
      err instanceof UnauthorizedException ||
      err instanceof NotFoundException ||
      err instanceof BadRequestException ||
      err instanceof ApplicationException ||
      err instanceof EmailAlreadyExistsExeption
    ) {
      return res.status(err.statuscode).json({
        success: false,
        message: err.message,
        statuscode: err.statuscode,
        // stack: server.environment === "development" && err.stack,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: err.message,
        //stack: (server.environment === 'development') && err.stack
      });
    }
  };
  
  export default errorMiddleware;
  