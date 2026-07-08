import { promisify } from 'node:util';
import { scrypt, randomBytes, timingSafeEqual } from 'node:crypto';
import { IHashService } from "#application/services/Authetication/IHash.service.js";

const scryptAsync = promisify(scrypt);
export class HashService implements IHashService{

    private readonly KEY_LEN = 64;

    async hash(plainText: string): Promise<string> {
        const salt = randomBytes(16).toString('hex');
        const derivedKey = (await scryptAsync(plainText, salt, this.KEY_LEN)) as Buffer;
        
        return `${salt}.${derivedKey.toString('hex')}` // final format: "salt_in_hex.hash_in_hex"
    }
    async compare(plainText: string, hash: string): Promise<boolean> {
        const [salt, originalHash] = hash.split(".");

        if(!salt || !originalHash) return false;

        const derivedKey = (await scryptAsync(plainText, salt, this.KEY_LEN)) as Buffer;
        
        const currentHashBuffer = Buffer.from(derivedKey.toString("hex"), "hex");
        const originalHashBuffer = Buffer.from(originalHash, "hex");

        return timingSafeEqual(currentHashBuffer, originalHashBuffer);
    }    
}