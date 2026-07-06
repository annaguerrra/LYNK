import { IHashService } from "#application/services/Authetication/IHashService.js";

export class HashService implements IHashService{
    hash(plainText: string): Promise<string> {
        throw new Error("Method not implemented.");
    }
    compare(plainText: string, hash: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    
}