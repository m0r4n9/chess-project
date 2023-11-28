import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IoAdapter } from "@nestjs/platform-socket.io";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useWebSocketAdapter(new IoAdapter(app));
  app.enableCors({
    origin: 'http://localhost:5173',
    methods: ["GET", "POST"],
    credentials: true
  })
  // app.useGlobalGuards(new )
  await app.listen(8080);
}
bootstrap();
