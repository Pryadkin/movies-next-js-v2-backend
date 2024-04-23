import {Controller, Get} from '@nestjs/common'
import {AppService} from './app.service'
import {DbService} from './db/db.service'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly dbService: DbService,
  ) { }

  @Get()
  async getHello() {
    const users = await this.dbService.user.findMany({})
    console.log('users', users)
    return users
  }
}
