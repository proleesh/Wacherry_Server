import { CommentService } from './comment.service';
import { Comment } from './entities/comment.entity';
export declare class CommentController {
    private readonly commentService;
    constructor(commentService: CommentService);
    findAll(videoId: number): Promise<Comment[]>;
    create(videoId: number, body: Partial<Comment>): Promise<Comment>;
}
