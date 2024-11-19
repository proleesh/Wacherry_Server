import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    register(body: {
        username: string;
        password: string;
        nickname: string;
        isAdmin?: boolean;
    }): Promise<import("./entities/user.entity").User>;
    login(body: {
        userIdentifier: string;
        password: string;
    }): Promise<{
        access_token: string;
        user: {
            id: any;
            username: any;
            nickname: any;
            customId: any;
            bannerUrl: any;
        };
    }>;
    upload(req: any): Promise<string>;
    uploadBanner(id: number, file: Express.Multer.File): Promise<{
        bannerUrl: string;
    }>;
    getUser(id: number): Promise<import("./entities/user.entity").User>;
}
