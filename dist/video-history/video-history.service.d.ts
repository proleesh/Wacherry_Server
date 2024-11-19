import { Repository } from 'typeorm';
import { VideoPlayHistory } from './entities/video-play-history.entity';
export declare class VideoHistoryService {
    private historyRepository;
    constructor(historyRepository: Repository<VideoPlayHistory>);
    create(userId: number, videoId: number): Promise<VideoPlayHistory>;
    findByUser(userId: number): Promise<VideoPlayHistory[]>;
}
