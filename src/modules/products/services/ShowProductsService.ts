import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { Product } from "../typeorm/entities/Product";
import { ProductsRepository } from "../typeorm/repositories/ProductsRepository";

interface IRequest {
    id: string;
}

export class ShowProductsService{
    public async execute({ id }: IRequest): Promise<Product | undefined>{
        const productsRepository = getCustomRepository(ProductsRepository);

        const product = await productsRepository.findOne(id);

        if(!product){
            throw new AppError('Product not found');
        }

        return product;
    }
}