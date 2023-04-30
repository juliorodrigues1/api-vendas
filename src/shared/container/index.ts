import { container } from "tsyringe";

import { IproductsRepository } from "@modules/products/domain/repositories/IProductsRepository";
import { ProductsRepository } from "@modules/products/infra/typeorm/repositories/ProductsRepository";
import { IUsersRepository } from "@modules/users/domain/repositories/IUsersRepository";
import { UsersRepository } from "@modules/users/infra/typeorm/repositories/UsersRepository";
import { IUserTokensRepository } from "@modules/users/domain/repositories/IUserTokensRepository";
import { UserTokensRopository } from "@modules/users/infra/typeorm/repositories/UserTokensRepository";


container.registerSingleton<IproductsRepository>(
    'ProductsRepository', 
    ProductsRepository
);


container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository
);


container.registerSingleton<IUserTokensRepository>(
    'UserTokensRepository',
    UserTokensRopository
)
