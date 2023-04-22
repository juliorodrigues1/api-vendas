import { inject, injectable } from "tsyringe";
import { IproductsRepository } from "../domain/repositories/IProductsRepository";
import { IProducts } from "../domain/models/IProducts";

@injectable()
export class ListProductsService{

    constructor(
        @inject('ProductsRepository')
        private productsRepository: IproductsRepository
    ){}

    public async execute(): Promise<IProducts[]>{
       

        const products =  this.productsRepository.find();

        return products;
    }
}