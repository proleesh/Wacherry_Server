import { Repository } from 'typeorm';
import { Video } from './entities/video.entity';
import { Request } from 'express';
import { User } from 'src/user/entities/user.entity';
import { VideoReaction } from './entities/video-reaction.entity';
export declare class VideoService {
    private readonly videoRepository;
    private readonly userRepository;
    private readonly reactionRepository;
    constructor(videoRepository: Repository<Video>, userRepository: Repository<User>, reactionRepository: Repository<VideoReaction>);
    create(videoData: Partial<Video>): Promise<Video>;
    findAll(req: Request): Promise<{
        url: string;
        id: number;
        title: string;
        description: string;
        createAt: Date;
        category: import("../category/entities/category.entity").Category;
        likes: number;
        dislikes: number;
        reactions: VideoReaction[];
    }[]>;
    findOne(id: number, req: Request): Promise<{
        url: string;
        id: number;
        title: string;
        description: string;
        createAt: Date;
        category: import("../category/entities/category.entity").Category;
        likes: number;
        dislikes: number;
        reactions: VideoReaction[];
    }>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
    reactToVideo(videoId: number, userId: number, reactionType: 'like' | 'dislike'): Promise<{
        likes: number;
        dislikes: number;
    }>;
    removeReaction(videoId: number, userId: number): Promise<string>;
    getVideoReactions(videoId: number): Promise<{
        likes: number;
        dislikes: number;
    }>;
}
