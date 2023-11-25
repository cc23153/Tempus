const crypto = require('crypto');

// Turn string into hash with a new salt 
function generateHashAndSalt(password){
    const salt = crypto.randomBytes(32).toString('hex');
    const a = crypto.createHash('sha256');
    a.update(password + salt);
    let hash = a.digest('hex')

    return [hash, salt];
}

function verifyPassword(inputPassword, storedHash, storedSalt) {
    const hash = crypto.createHash('sha256');
    hash.update(inputPassword + storedSalt);
    const inputHash = hash.digest('hex');

    return inputHash === storedHash;
}


module.exports = { 
    generateHashAndSalt,
    verifyPassword
}