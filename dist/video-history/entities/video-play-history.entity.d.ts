import { User } from '../../user/entities/user.entity';
import { Video } from '../../video/entities/video.entity';
export declare class VideoPlayHistory {
    id: number;
    user: User;
    video: Video;
    watched_at: Date;
}
