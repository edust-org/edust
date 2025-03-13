import type { Router } from 'express';
import express from 'express';
import usersRoutes from './users';

class Routes {
  private router: Router;

  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.use('/users', usersRoutes);
  }

  public getRouter(): Router {
    return this.router;
  }
}

export default new Routes().getRouter();
