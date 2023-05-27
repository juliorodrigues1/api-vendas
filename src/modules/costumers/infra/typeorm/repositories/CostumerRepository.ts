import { ICostumers } from "@modules/costumers/domain/models/ICostumers";
import { ICostumersRepository } from "@modules/costumers/domain/repositories/ICostumersRepository";
import { getRepository, Repository } from "typeorm";
import { Costumer } from "../entities/Costumer";

export class CostumerRepository implements ICostumersRepository{
    private ormRepository: Repository<Costumer>;

    constructor(){
        this.ormRepository = getRepository(Costumer);
    }

    findByName(name: string): Promise<ICostumers | undefined> {
        const costumer = this.ormRepository.findOne({
            where: { name }
        });

        return costumer;
    }

    findById(id: string): Promise<ICostumers | undefined> {
        const costumer = this.ormRepository.findOne({
            where: { id }
        });

        return costumer;
    }

    findByEmail(email: string): Promise<ICostumers | undefined> {
        const costumer = this.ormRepository.findOne({
            where: { email }
        });

        return costumer;
    }
}