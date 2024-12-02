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
        likes: number;
        dislikes: number;
        reactions: import("./entities/video-reaction.entity").VideoReaction[];
    }[]>;
    findOne(id: string, req: Request): Promise<{
        url: string;
        id: number;
        title: string;
        description: string;
        createAt: Date;
        category: import("../category/entities/category.entity").Category;
        likes: number;
        dislikes: number;
        reactions: import("./entities/video-reaction.entity").VideoReaction[];
    }>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
    reactToVideo(videoId: number, userId: number, reaction: 'like' | 'dislike'): Promise<{
        likes: number;
        dislikes: number;
    }>;
    removeReaction(videoId: number, userId: number): Promise<string>;
    getVideoReactions(videoId: number): Promise<{
        likes: number;
        dislikes: number;
    }>;
}
