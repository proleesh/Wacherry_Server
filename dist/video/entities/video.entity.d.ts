import { Category } from 'src/category/entities/category.entity';
export declare class Video {
    id: number;
    title: string;
    description: string;
    url: string;
    createAt: Date;
    category: Category;
}
