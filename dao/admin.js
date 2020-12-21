const execute = require('../utils/db.js')
class Admin {
    constructor({ name, password, id } = { name: '', password: '', id: null }) {
        this.id = id
        this.name = name
        this.password = password
    }
    async login(userInfo) {
        if (!userInfo.name || !userInfo.password) {
            throw new Error('参数错误')
            return
        }
        return execute(
            `select * from admin where name='${userInfo.name}' and password='${userInfo.password}'`
        )
    }
}

module.exports = Admin
