import { Controller, Post, UploadedFile, UseInterceptors, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, Get, Param, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';

import type { Response } from 'express';
import type { Express } from 'express';
import { FilesService } from './files.service';

import { fileNamer } from '../helpers/fileNamer.helper';

import * as path from 'path';
import * as fs from 'fs';


@ApiTags('Files - Get and Upload')
@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly configService: ConfigService
  ) {}

  @Get('product/:imageName')
  findProductImage(
    @Res() res: Response,
    @Param('imageName') imageName: string
  ) {
    const filePath = this.filesService.getStaticProductImage( imageName );
    res.sendFile( filePath );
  }

  @Post('product')
  @UseInterceptors(FileInterceptor('file'))
  uploadProductImage(@UploadedFile(
    new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({ maxSize: 500000 }),
        new FileTypeValidator({ fileType:/image\/(jpeg|png|jpg)$/ })
      ]
    })
  ) file: Express.Multer.File) {
    
    const fileName = fileNamer(file);
    file.filename = fileName;

    const folderPath = path.join(process.cwd(), 'static/products');
    const filePath = path.join(folderPath, fileName);

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    fs.writeFileSync(filePath, file.buffer);

    const secureUrl = `${ this.configService.get('HOST_API') }/files/product/${ file.filename }`
    return { secureUrl };
  }
}