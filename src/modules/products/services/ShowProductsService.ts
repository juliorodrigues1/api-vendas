import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { IShowProducts } from "../domain/models/IShowProducts";
import { inject, injectable } from "tsyringe";
import { IproductsRepository } from "../domain/repositories/IProductsRepository";
import { IProducts } from "../domain/models/IProducts";

@injectable()
export class ShowProductsService{

    constructor(
        @inject('ProductsRepository')
        private productsRepository: IproductsRepository
    ){}

    public async execute({ id }: IShowProducts): Promise<IProducts | undefined>{

        const product = await this.productsRepository.findOne(id);

        if(!product){
            throw new AppError('Product not found');
        }

        return product;
    }
}