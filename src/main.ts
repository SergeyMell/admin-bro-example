import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupAdminPanel } from './admin-panel/admin-panel.plugin';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /** Setup Admin panel */
  await setupAdminPanel(app);

  await app.listen(3000);
}
bootstrap();
