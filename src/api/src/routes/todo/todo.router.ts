import express, { Router } from 'express';

import jwt from 'express-jwt';
import jwksClient from 'jwks-rsa';

import { TodoController } from '../../controllers/todo.controller';

const todoRouter: Router = express.Router();

// reference to our IdentityServer instance. If we are running in Docker then use service name of IdentityServer.
const issuer = 'https://localhost:5001'; // can potentially use the "iss" claim from the access token instead

// define our authentication middleware
const auth = jwt({
  secret: jwksClient.expressJwtSecret({
    cache: true, // see https://github.com/auth0/node-jwks-rsa#caching
    rateLimit: true, // see https://github.com/auth0/node-jwks-rsa#rate-limiting
    jwksRequestsPerMinute: 2,
    jwksUri: `${issuer}/.well-known/openid-configuration/jwks`
  }),

  // validate the audience & issuer from received token vs JWKS endpoint
  audience: 'fa_tms_api',
  issuer: issuer,
  algorithms: ['RS256']
});

todoRouter.get('/', TodoController.getAll);
todoRouter.get('/:id', TodoController.getById);
todoRouter.post('/', TodoController.create);
todoRouter.delete('/:id', TodoController.delete);
todoRouter.patch('/:id', TodoController.edit);

export { todoRouter };
