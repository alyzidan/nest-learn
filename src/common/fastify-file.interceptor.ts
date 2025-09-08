import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  mixin,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { createWriteStream, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

export function FastifyFileInterceptor(fieldName: string) {
  @Injectable()
  class MixinInterceptor implements NestInterceptor {
    async intercept(
      context: ExecutionContext,
      next: CallHandler,
    ): Promise<Observable<any>> {
      const request = context.switchToHttp().getRequest();

      const file = await request.file();
      if (file && file.fieldname === fieldName) {
        const uploadDir = join(process.cwd(), 'images');
        if (!existsSync(uploadDir)) {
          mkdirSync(uploadDir, { recursive: true });
        }

        // المسار النهائي
        const filePath = join(uploadDir, file.filename);

        // خزّن الملف باستخدام stream
        await new Promise((resolve, reject) => {
          const writeStream = createWriteStream(filePath);
          file.file.pipe(writeStream);
          file.file.on('end', resolve);
          file.file.on('error', reject);
        });

        // ضيف بيانات للـ request.file زي ما multer بيعمل
        request.file = {
          fieldname: file.fieldname,
          originalname: file.filename,
          encoding: file.encoding,
          mimetype: file.mimetype,
          path: filePath,
        };
      }

      return next.handle();
    }
  }

  return mixin(MixinInterceptor);
}
