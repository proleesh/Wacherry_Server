import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
export declare class CommentService {
    private commentRepository;
    constructor(commentRepository: Repository<Comment>);
    create(videoId: number, username: string, content: string): Promise<Comment>;
    findByVideoId(videoId: number): Promise<Comment[]>;
}
