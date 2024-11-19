import { ShortForm } from 'src/shortform/entities/shortform.entity';
export declare class User {
    id: number;
    customId: number;
    username: string;
    password: string;
    nickname: string;
    bannerUrl: string;
    shortForms: ShortForm[];
    validatePassword(password: string): Promise<boolean>;
}
