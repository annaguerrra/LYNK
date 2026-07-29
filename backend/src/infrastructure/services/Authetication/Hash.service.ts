import { promisify } from 'node:util';
import { scrypt, randomBytes, timingSafeEqual } from 'node:crypto';
import { IHashService } from "#application/services/Authetication/IHash.service.js";

// this service uses a lib from node, the lib its called crypto

// provides an async script implementation.
const scryptAsync = promisify(scrypt);
export class HashService implements IHashService{

    // hash's length 
    private readonly KEY_LEN = 64;

    // combines the user's password with a random string of characters and turns it into an unreadable string
    async hash(plainText: string): Promise<string> {
        const salt = randomBytes(16).toString('hex');
        const derivedKey = (await scryptAsync(plainText, salt, this.KEY_LEN)) as Buffer;
        
        return `${salt}.${derivedKey.toString('hex')}` // final format: "salt_in_hex.hash_in_hex"
    }

    // this method compares the inputed password with the storaged hash
    async compare(plainText: string, hash: string): Promise<boolean> {
        const [salt, originalHash] = hash.split(".");

        if(!salt || !originalHash) return false;

        const derivedKey = (await scryptAsync(plainText, salt, this.KEY_LEN)) as Buffer;
        
        const currentHashBuffer = Buffer.from(derivedKey.toString("hex"), "hex");
        const originalHashBuffer = Buffer.from(originalHash, "hex");

        // console.log(currentHashBuffer, originalHashBuffer)
        // this function does not leak timing information that would allow an attacker to guess one of the values
        return timingSafeEqual(currentHashBuffer, originalHashBuffer);
    }    
}