import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
<<<<<<< HEAD
import { ProductsModule } from '../products/products.module';
import { AuthModule } from 'src/auth/auth.module';
=======
import { PokemonModule } from 'src/pokemon/pokemon.module';
import { CommonModule } from 'src/common/common.module';
>>>>>>> 5a5d4153d8ac2095ada73c4fc5dc46d0631032b3

@Module({
  controllers: [SeedController],
  providers: [SeedService],
<<<<<<< HEAD
  imports: [ProductsModule, AuthModule]
=======
  imports: [PokemonModule, CommonModule]
>>>>>>> 5a5d4153d8ac2095ada73c4fc5dc46d0631032b3
})
export class SeedModule {}
