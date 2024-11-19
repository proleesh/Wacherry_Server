import { CategoryService } from './category.service';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    create(name: string): Promise<import("./entities/category.entity").Category>;
    findAll(): Promise<import("./entities/category.entity").Category[]>;
    findOne(id: number): Promise<import("./entities/category.entity").Category>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
