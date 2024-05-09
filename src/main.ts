import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseWrapperInterceptor } from './_interceptors/response-wrapper.interceptor';
import { ExceptionWrapperFilter } from './_filters/exception_wrapper.filter';
import * as bodyParser from 'body-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { transports, format } from 'winston';

async function bootstrap() {
  // If you are running it in docker, the error files will be formed in docker

  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
     // let's log errors into its own file
        new transports.File({
          filename: `logs/error.log`,
          level: 'error',
          format: format.combine(format.timestamp(), format.json()),
          // Added this max size to limit it to 100kb
          maxsize: 100
        }),
        // logging all level
        new transports.File({
          filename: `logs/combined.log`,
          format: format.combine(format.timestamp(), format.json()),
          // Added this max size to limit it to 100kb
          maxsize: 100
        }),
        // we also want to see logs in our console
        new transports.Console({
         format: format.combine(
           format.cli(),
           format.splat(),
           format.timestamp(),
           format.printf((info) => {
             return `${info.timestamp} ${info.level}: ${info.message}`;
           }),
          ),
      }),
      ],
    }),
  });
  
  app.enableShutdownHooks();
  app.useGlobalInterceptors(new ResponseWrapperInterceptor());
  app.useGlobalFilters(new ExceptionWrapperFilter);
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

  app.enableCors({
    origin: "*"
  })

  const config = new DocumentBuilder().setTitle('Test API').setDescription('Test System').setVersion('1.0').addBearerAuth().build();

  const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup('swagger', app, document);
  SwaggerModule.setup('swagger', app, document);
  app.useGlobalPipes(new ValidationPipe({transform: true}));


  await app.listen(3000);
  // console.log("path :  ", join(__dirname, '..', 'public'))
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
