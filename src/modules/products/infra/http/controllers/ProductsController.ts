import { Request, Response } from "express";
import { CreateProductService } from "../services/CreateProductsService";
import { DeleteProductsService } from "../services/DeleteProductsSevice";
import { ListProductsService } from "../services/ListProductsService";
import { ShowProductsService } from "../services/ShowProductsService";
import { UpdateProductsService } from "../services/UpdateProductsService";


export class ProductsController{

    public async index(req: Request, res: Response): Promise<Response>{
        const listProducts = new ListProductsService();

        const products = await listProducts.execute();

        return res.json(products);
    }

    public async show(req: Request, res: Response): Promise<Response>{
        const { id } = req.params;

        const showProduct = new ShowProductsService();

        const product = await showProduct.execute({id});

        return res.json(product);
    }

    public async create(req: Request, res: Response): Promise<Response>{
        const { name, price, quantity } = req.body;

        const createProduct = new CreateProductService();

        const product = await createProduct.execute({
            name,
            price,
            quantity
        });

        return res.json(product);
    }

    public async update(req: Request, res: Response): Promise<Response>{
        const { id } = req.params;
        const { name, price, quantity } = req.body;

        const updateProduct = new UpdateProductsService();

        const product = await updateProduct.execute({
            id,
            name,
            price,
            quantity
        });

        return res.json(product);
    }

    public async delete(req: Request, res: Response): Promise<Response>{
        const { id } = req.params;

        const deleteProduct = new DeleteProductsService();

        await deleteProduct.execute({ id });

        return res.json([]);
    }
}