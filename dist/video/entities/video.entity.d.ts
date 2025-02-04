import { Category } from 'src/category/entities/category.entity';
import { VideoReaction } from './video-reaction.entity';
import { VideoPlayHistory } from 'src/video-history/entities/video-play-history.entity';
export declare class Video {
    id: number;
    title: string;
    description: string;
    url: string;
    createAt: Date;
    category: Category;
    likes: number;
    dislikes: number;
    reactions: VideoReaction[];
    views: number;
    playHistory: VideoPlayHistory[];
}
