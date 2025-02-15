const bcrypt = require('crypt')

class User {
    static async register(username, password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        return { username, password: hashedPassword }
    }

    static async findByUsername(username) {
        return { username: 'testUser', password: 'string'}
    }
}

module.exports = User;