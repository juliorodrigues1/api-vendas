import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { getCustomRepository } from "typeorm";
import { IUpdateProducts } from "../domain/models/IUpdateProducts";
import { IProducts } from "../domain/models/IProducts";
import { IproductsRepository } from "../domain/repositories/IProductsRepository";

@injectable()
export class UpdateProductsService{

    constructor(
        @inject('ProductsRepository')
        private productsRepository: IproductsRepository
    ){}

    public async execute({ id, name, price, quantity }: IUpdateProducts): Promise<IProducts>{

        const product = await this.productsRepository.findOne(id);

        if(!product){
            throw new AppError('Product not found');
        }

        const productExists = await this.productsRepository.findByName(name);

        if(productExists && name !== product.name){
            throw new AppError('There is already one product with this name');
        }

        product.name = name;
        product.price = price;
        product.quantity = quantity;

        await this.productsRepository.save(product);

        return product;
    }
}