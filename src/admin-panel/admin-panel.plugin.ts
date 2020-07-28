import { INestApplication } from '@nestjs/common';

import AdminBro from 'admin-bro';
import * as AdminBroExpress from 'admin-bro-expressjs';

export async function setupAdminPanel(app: INestApplication): Promise<void> {

  const adminBro = new AdminBro({
    resources: [],
    rootPath: '/admin',
  });

  const router = AdminBroExpress.buildRouter(adminBro);
  app.use(adminBro.options.rootPath, router);

}
