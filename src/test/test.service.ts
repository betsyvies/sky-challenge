import { HttpService } from '@nestjs/axios';
import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, firstValueFrom, map } from 'rxjs';
import { UserDto } from 'src/users/dto/users.dto';

@Injectable()
export class TestService {
  baseUrl: string;

  constructor(
    private configService: ConfigService,
    private readonly httpService: HttpService,
    @Inject('USER_SERVICE') private usersClient: ClientProxy,
  ) {
    this.baseUrl = this.configService.get('TYPICODE_BASE_URL');
  }

  async getUsers() {
    let result = [];
    const evenResult = [];
    const users = await firstValueFrom(
      this.httpService.get(`${this.baseUrl}/users`).pipe(
        catchError((e: any) => {
          throw new Error(`Error getting Typicode: ${e}`);
        }),
        map((res) => {
          return res.data;
        }),
      ),
    );

    if (!users || users.length === 0) return result;
    result = users
      .map((user: UserDto) => {
        delete user.address;
        if (!(user.id % 2)) {
          evenResult.push(user);
        }
        return user;
      })
      .sort((a: UserDto, b: UserDto) => (a.id > b.id ? -1 : 1));

    const message = await this.usersClient.send(
      {
        cmd: 'users-message',
      },
      evenResult,
    );
    message.subscribe();
    return result;
  }
}
