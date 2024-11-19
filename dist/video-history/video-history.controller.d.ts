import { VideoHistoryService } from './video-history.service';
export declare class VideoHistoryController {
    private readonly historyService;
    constructor(historyService: VideoHistoryService);
    addHistory(body: {
        userId: number;
        videoId: number;
    }): Promise<import("./entities/video-play-history.entity").VideoPlayHistory>;
    getHistory(userId: number): Promise<import("./entities/video-play-history.entity").VideoPlayHistory[]>;
}
