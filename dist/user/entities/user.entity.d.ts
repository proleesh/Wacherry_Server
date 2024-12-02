import { ShortForm } from 'src/shortform/entities/shortform.entity';
import { VideoReaction } from 'src/video/entities/video-reaction.entity';
export declare class User {
    id: number;
    customId: number;
    username: string;
    password: string;
    nickname: string;
    bannerUrl: string;
    shortForms: ShortForm[];
    reactions: VideoReaction[];
    validatePassword(password: string): Promise<boolean>;
}
