import { Repository } from 'typeorm';
import { ShortForm } from './entities/shortform.entity';
import { User } from '../user/entities/user.entity';
export declare class ShortFormService {
    private shortFormRepository;
    constructor(shortFormRepository: Repository<ShortForm>);
    createShortForm(user: User, content: string, mediaUrl?: string): Promise<ShortForm>;
    getAllShortForms(): Promise<ShortForm[]>;
    getShortFormById(id: number): Promise<ShortForm>;
    deleteShortForm(id: number, user: User): Promise<void>;
}
