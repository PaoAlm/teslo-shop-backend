<<<<<<< HEAD
import { Injectable, Delete } from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { initialData } from './data/seed-data';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/users.entity';
import { Repository } from 'typeorm';
=======
import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
>>>>>>> 5a5d4153d8ac2095ada73c4fc5dc46d0631032b3

@Injectable()
export class SeedService {

  constructor(
<<<<<<< HEAD
      private readonly ProductsService: ProductsService,
      
      @InjectRepository( User )
      private readonly userRepository: Repository<User>
    ){}

  async runSeed(){
    await this.deleteTables();

    const adminUser = await this.insertNewUsers();

    await this.insertNewProducts( adminUser );
    return 'seed executed';
  }

  private async deleteTables() {
    await this.ProductsService.deleteAllProducts();
    const queryBuilder = this.userRepository.createQueryBuilder();
    await queryBuilder
      .delete()
      .execute()
  }

  private async insertNewUsers() {
    const seedUsers = initialData.users;

    const users: User[] = [];

    seedUsers.forEach( user => {
      users.push( this.userRepository.create(user) );
    });

    const dbUsers = await this.userRepository.save( seedUsers );

    return dbUsers[0];
  }


  private async insertNewProducts( adminUser: User ) {
    
    await this.ProductsService.deleteAllProducts();

      const products = initialData.products;

      const insertPromises = [];

      products.forEach( product => {
        insertPromises.push( this.ProductsService.create( product, adminUser ) );
      });

      await Promise.all( insertPromises );

    return true;
  }

=======
      @InjectModel( Pokemon.name )
      private readonly pokemonModel: Model<Pokemon>,
      private readonly  http: AxiosAdapter,
    ){}

  async executeSeed(){

    await this.pokemonModel.deleteMany({});
    
    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');

    const pokemonToInsert: { name: string, no: number }[] = [];

    data.results.forEach(async ({ name, url }) =>{
      const segments = url.split('/');
      const no = +segments[ segments.length - 2 ]
      
      // const pokemon = await this.pokemonModel.create({ name, no });

      pokemonToInsert.push(({ name, no }));

    });

    await this.pokemonModel.insertMany(pokemonToInsert);

    return 'Seed executed';
  }
>>>>>>> 5a5d4153d8ac2095ada73c4fc5dc46d0631032b3
}
