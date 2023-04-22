import AppError from "@shared/errors/AppError";
import { ICreateProducts } from "../domain/models/ICreateProducts";
import { IproductsRepository } from "../domain/repositories/IProductsRepository";
import { IProducts } from "../domain/models/IProducts";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateProductService{

    constructor(
        @inject('ProductsRepository')
        private productsRepository: IproductsRepository
        ){}

    public async execute({ name, price, quantity }: ICreateProducts): Promise<IProducts>{

        const productExists = await this.productsRepository.findByName(name);

        if(productExists){
            throw new AppError('There is already one product with this name');
        }


        const product = await this.productsRepository.create({
            name,
            price,
            quantity,
        });

        return product;
    }
}