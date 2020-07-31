import { INestApplication } from '@nestjs/common';
import { Database, Resource } from 'admin-bro-typeorm';

import AdminBro from 'admin-bro';

import * as AdminBroExpress from 'admin-bro-expressjs';
import UserResource from './resources/user.resource';

export async function setupAdminPanel(app: INestApplication): Promise<void> {

  AdminBro.registerAdapter({ Database, Resource });

  const adminBro = new AdminBro({
    resources: [
      UserResource,
    ],
    rootPath: '/admin',
  });

  const router = AdminBroExpress.buildRouter(adminBro);
  app.use(adminBro.options.rootPath, router);

}
