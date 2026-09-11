import { v4 as uuid } from "uuid";
import type { Express } from 'express';

export const fileNamer = ( file: Express.Multer.File ): string => {
    if (!file) throw new Error('File is empty');

    const fileExtension = file.originalname.split('.').pop();
    
    return `${ uuid() }.${ fileExtension }`;
}