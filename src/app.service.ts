import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `
    <div class='' >
    <a href='/graphql'> Click here to use the playground </a>
    </div>
    `;
  }
}
