import {Controller, Get} from '@nestjs/common'
import {AppService} from './app.service'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) { }

  @Get()
  async getHello() {
    // const users = await this.dbService.user.findMany({})
    // console.log('users', users)
    // return users
  }
}
