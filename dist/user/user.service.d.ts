import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
export declare class UserService {
    private userRepository;
    private jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    findAllUsers(): Promise<User[]>;
    private generateAdminCustomId;
    private generateUniqueCustomId;
    register(username: string, password: string, nickname: string, email: string, isAdmin: boolean, avatar: string): Promise<User>;
    validateUser(username: string, password: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
        user: {
            id: any;
            username: any;
            nickname: any;
            customId: any;
            bannerUrl: any;
            avatar: any;
        };
    }>;
    updateBannerUrl(id: number, bannerUrl: string): Promise<User>;
    findUserById(id: number): Promise<User>;
    updateAvatar(id: number, avatarUrl: string): Promise<void>;
    save(user: User): Promise<void>;
    findByEmail(email: string): Promise<User>;
    findByResetToken(token: string): Promise<User | undefined>;
}
