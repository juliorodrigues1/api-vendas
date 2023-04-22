import { container } from "tsyringe";

import { IproductsRepository } from "@modules/products/domain/repositories/IProductsRepository";
import { ProductsRepository } from "@modules/products/infra/typeorm/repositories/ProductsRepository";


container.registerSingleton<IproductsRepository>(
    'ProductsRepository', 
    ProductsRepository
);

