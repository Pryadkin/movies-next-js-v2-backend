import {NestFactory} from '@nestjs/core'
import {AppModule} from './app.module'
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger'
import helmet from 'helmet'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {abortOnError: false})
  app.enableCors()
  app.use(helmet())

  const config = new DocumentBuilder()
    .setTitle('Movies')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('swagger', app, document)


  await app.listen(4001)
}
bootstrap()
