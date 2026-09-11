import { ApiProperty } from "@nestjs/swagger";
import { Product } from "src/products/entities";
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {

    @ApiProperty ({
        example: 'b1c2d3e4-f5g6-h7i8-j9k0-l1m2n3o4p5q6',
        description: 'User ID',
        uniqueItems: true
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @ApiProperty({
        example: 'name@example.com',
        description: 'User email',
        uniqueItems: true
    })
    @Column('text', {
        unique: true
    })
    email: string;

    @ApiProperty({
        example: '********',
        description: 'User password'
    })
    @Column('text', {
        select: false
    })
    password: string;

    @ApiProperty({
        example: 'Jane Doe',
        description: 'User full name'
    })
    @Column('text')
    fullName: string;

    @ApiProperty({
        example: true,
        description: 'User status'
    })
    @Column('bool', {
        default: true
    })
    isActive: string;

    @ApiProperty({
        example: ['admin', 'user'],
        description: 'User roles'
    })
    @Column('text', {
        array: true,
        default: ['user']
    })
    roles: string[];

    @OneToMany(
        () => Product,
        ( product => product.user )
    )
    product: Product;



    @BeforeInsert()
    checkFieldsBeforeInsert() {
        this.email = this.email.toLowerCase().trim();
    }

    @BeforeUpdate()
    checkFieldsBeforeUpdate() {
        this.checkFieldsBeforeInsert();
    }
}   
