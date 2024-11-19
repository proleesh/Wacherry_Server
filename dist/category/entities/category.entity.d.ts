import { Video } from 'src/video/entities/video.entity';
export declare class Category {
    id: number;
    name: string;
    categoryCount: number;
    videos: Video[];
    updateCategoryCount(): Promise<void>;
}
