import { Controller, Get } from '@nestjs/common';
import { SeedService } from './seed.service';
<<<<<<< HEAD
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Seed')
=======

>>>>>>> 5a5d4153d8ac2095ada73c4fc5dc46d0631032b3
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
<<<<<<< HEAD
  // @Auth(ValidRoles.admin)
  executeSeed() {
    return this.seedService.runSeed();
=======
  executeSeed() {
    return this.seedService.executeSeed();
>>>>>>> 5a5d4153d8ac2095ada73c4fc5dc46d0631032b3
  }

}
