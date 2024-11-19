import { VideoService } from './video.service';
import { Video } from './entities/video.entity';
import { CategoryService } from 'src/category/category.service';
import { Request } from 'express';
export declare class VideoController {
    private readonly videoService;
    private readonly categoryService;
    constructor(videoService: VideoService, categoryService: CategoryService);
    create(videoData: Partial<Video>): Promise<Video>;
    uploadVideo(file: Express.Multer.File, body: {
        title: string;
        description: string;
        categoryId: number;
    }): Promise<Video>;
    findAll(req: Request): Promise<{
        url: string;
        id: number;
        title: string;
        description: string;
        createAt: Date;
        category: import("../category/entities/category.entity").Category;
    }[]>;
    findOne(id: string, req: Request): Promise<{
        url: string;
        id: number;
        title: string;
        description: string;
        createAt: Date;
        category: import("../category/entities/category.entity").Category;
    }>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
