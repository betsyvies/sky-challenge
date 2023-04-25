import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHeartbeatMessage(): any {
    return { status: 'OK' };
  }
}
