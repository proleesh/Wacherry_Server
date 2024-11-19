import { User } from 'src/user/entities/user.entity';
export declare class ShortForm {
    id: number;
    content: string;
    mediaUrl: string;
    createdAt: Date;
    user: User;
}
