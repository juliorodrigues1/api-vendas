import { IProducts } from "../models/IProducts";
import { ICreateProducts } from "../models/ICreateProducts";

export interface IproductsRepository {
    findByName(name: string): Promise<IProducts | undefined>;
    create(data: ICreateProducts): Promise<IProducts>;
    save(product: IProducts): Promise<IProducts>;
    findOne(id: string): Promise<IProducts | undefined>;
    remove(product: IProducts): Promise<void>;
    find(): Promise<IProducts[]>;
}