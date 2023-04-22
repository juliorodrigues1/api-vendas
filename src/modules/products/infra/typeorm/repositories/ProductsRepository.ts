import { getRepository, Repository } from "typeorm";
import { Product } from "../entities/Product";
import { IproductsRepository } from "@modules/products/domain/repositories/IProductsRepository";
import { ICreateProducts } from "@modules/products/domain/models/ICreateProducts";


export class ProductsRepository implements IproductsRepository{

    private ormRepository: Repository<Product>;

    constructor(){
        this.ormRepository = getRepository(Product);
    }

    public async create({name, price, quantity}: ICreateProducts ): Promise<Product>{
        const product = this.ormRepository.create({name, price, quantity});

        await this.ormRepository.save(product);

        return product;
    }

    public async save(product: Product ): Promise<Product>{
        return this.ormRepository.save(product);

        return product;
    }

    public async findOne(id: string): Promise<Product | undefined>{
        const product = await this.ormRepository.findOne(id);
        
        return product;
    }

    public async remove(product: Product): Promise<void>{
        await this.ormRepository.remove(product);
    }

    public async findByName(name: string): Promise<Product | undefined>{
        const product = this.ormRepository.findOne({
            where: {
                name,
            },
        });

        return product;
    }

    public async find(): Promise<Product[]>{
        const products = await this.ormRepository.find();

        return products;
    }
}