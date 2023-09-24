import { Injectable } from '@nestjs/common';

@Injectable()
export class FilesService {
  async upload({ files }) {
    const waitedFiles = await Promise.all(files);
    console.log(waitedFiles);

    return ['~~ url'];
  }
}
