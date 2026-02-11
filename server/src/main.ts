import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { UserService } from './modules/auth/services/user.service';

async function bootstrap() {
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('XIAOJU SURVEY')
    .setDescription('')
    .setVersion('1.0')
    .addTag('auth')
    .addTag('survey')
    .addTag('surveyResponse')
    .addTag('messagePushingTasks')
    .addTag('ui')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  // 创建默认用户
  await createDefaultUser(app);

  await app.listen(PORT);
  console.log(`server is running at: http://127.0.0.1:${PORT}`);
}

async function createDefaultUser(app) {
  // 只在开发环境创建默认用户
  if (process.env.NODE_ENV !== 'development' && process.env.SERVER_ENV !== 'local') {
    return;
  }

  const userService = app.get(UserService);
  
  try {
    const existingUser = await userService.getUserByUsername('admin');
    if (!existingUser) {
      await userService.createUser({
        username: 'admin',
        password: 'admin123456',
      });
      console.log('默认用户已创建: username=admin, password=admin123456');
    } else {
      console.log('默认用户已存在');
    }
  } catch (error) {
    console.error('创建默认用户失败:', error.message);
  }
}

bootstrap();
