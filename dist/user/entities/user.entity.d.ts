import { ShortForm } from 'src/shortform/entities/shortform.entity';
import { VideoReaction } from 'src/video/entities/video-reaction.entity';
export declare class User {
    id: number;
    customId: number;
    username: string;
    password: string;
    nickname: string;
    email: string;
    bannerUrl: string;
    avatar: string;
    isAdmin: boolean;
    shortForms: ShortForm[];
    reactions: VideoReaction[];
    validatePassword(password: string): Promise<boolean>;
    resetToken: string;
    resetTokenExpiration: Date;
}
