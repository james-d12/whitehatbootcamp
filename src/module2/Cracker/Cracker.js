const bcrypt = require("bcrypt");

async function hashBcrypt(string){
    try {
        const encryptedString = await bcrypt.hash(string, 10);
        return encryptedString;
    } catch (error) {
        console.log(`Error hashing string with bcrypt with Error: ${error.message}.`);
    }
}

async function compareBcrypt(string, hashedString) {
    try {
        const result = await bcrypt.compare(string, hashedString);
        return result;
    } catch (error) {
        console.log(`Error comparing string with bcrypt with Error: ${error.message}.`);
    }
}

async function main(){
    const string = "hello";

    const hashed = await hashBcrypt(string);
    console.log(`Hashed Password: ${hashed}.`);
}

main();