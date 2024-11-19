import { Repository } from 'typeorm';
import { Video } from './entities/video.entity';
import { Request } from 'express';
export declare class VideoService {
    private videoRepository;
    constructor(videoRepository: Repository<Video>);
    create(videoData: Partial<Video>): Promise<Video>;
    findAll(req: Request): Promise<{
        url: string;
        id: number;
        title: string;
        description: string;
        createAt: Date;
        category: import("../category/entities/category.entity").Category;
    }[]>;
    findOne(id: number, req: Request): Promise<{
        url: string;
        id: number;
        title: string;
        description: string;
        createAt: Date;
        category: import("../category/entities/category.entity").Category;
    }>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
