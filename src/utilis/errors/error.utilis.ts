export class NotFoundException extends Error {
    public statuscode: number;
    constructor(message: string) {
      super(message);
  
      this.statuscode = 404;
    }
  }
  
  export class UnauthenticatedException extends Error {
    public statuscode: number;
    constructor(message: string) {
      super(message);
  
      this.statuscode = 401;
    }
  }
  
  export class EmailAlreadyExistsExeption extends Error {
    public statuscode: number;
    constructor(message: string) {
      super(message);
      this.statuscode = 409;
    }
  }
  
  export class UnauthorizedException extends Error {
    public statuscode: number;
    constructor(message: string) {
      super(message);
  
      this.statuscode = 403;
    }
  }
  
  export class BadRequestException extends Error {
    public statuscode: number;
    constructor(message: string) {
      super(message);
  
      this.statuscode = 422;
    }
  }
  
  export class ValidationException extends Error {
    public statuscode: number;
  
    constructor(message: string) {
      super(message);
  
      this.statuscode = 422;
    }
  }
  
  export class ApplicationException extends Error {
    public statuscode: number;
    constructor(message: string) {
      super(message);
  
      this.statuscode = 500;
    }
  }
  