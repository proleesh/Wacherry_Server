import { ShortFormService } from './shortform.service';
export declare class ShortFormController {
    private readonly shortFormService;
    constructor(shortFormService: ShortFormService);
    createShortForm(file: Express.Multer.File, content: string, req: any): Promise<import("./entities/shortform.entity").ShortForm>;
    getAllShortForms(): Promise<import("./entities/shortform.entity").ShortForm[]>;
    getShortFormById(id: number): Promise<import("./entities/shortform.entity").ShortForm>;
    deleteShortForm(id: number, req: any): Promise<{
        message: string;
    }>;
}
