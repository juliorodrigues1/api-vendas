import AppError from "@shared/errors/AppError";
import { IDeleteProducts } from "../domain/models/IDeleteProducts";
import { inject, injectable } from "tsyringe";
import { IproductsRepository } from "../domain/repositories/IProductsRepository";

@injectable()
export class DeleteProductsService{

    constructor(
        @inject('ProductsRepository')
        private productsRepository: IproductsRepository
    ){}

    public async execute({ id }: IDeleteProducts): Promise<void>{
       

        const product = await this.productsRepository.findOne(id);

        if(!product){
            throw new AppError('Product not found');
        }


        await this.productsRepository.remove(product);
        
    }

}