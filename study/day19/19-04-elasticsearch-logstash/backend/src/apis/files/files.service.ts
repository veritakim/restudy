import { Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';

@Injectable()
export class FilesService {
  async upload({ files }) {
    const waitedFiles = await Promise.all(files);
    // console.log(waitedFiles);
    const myfile = files[0];

    const storage = new Storage({
      projectId: process.env.GCP_PROJECT_ID,
      keyFilename: process.env.GCP_KEYFILE_NAME,
    }).bucket(process.env.GCP_BUCKET);

    const bucket = process.env.GCP_BUCKET;

    const results = await Promise.all(
      waitedFiles.map((el) => {
        return new Promise((resolve, reject) => {
          el.createReadStream()
            .pipe(storage.file(el.filename).createWriteStream())
            .on('finish', () => resolve(`${bucket}/${el.filename}`)) // 성공하면 성공
            .on('error', () => reject('실패'));
        });
      }),
    );

    return results;
  }
}
