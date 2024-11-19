import { CommentService } from './comment.service';
export declare class CommentController {
    private readonly commentService;
    constructor(commentService: CommentService);
    findAll(videoId: number): Promise<import("./entities/comment.entity").Comment[]>;
}
