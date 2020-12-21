const { sign, decode, verify } = require('jsonwebtoken'),
    STR = 'token',
    { token } = require('../config')

const TOKEN = {
    //编码
    sign: (obj = {}) => {
        return sign(JSON.parse(JSON.stringify(obj)), STR, {
            algorithm: 'HS256',
            expiresIn: token.expires,
        })
    },
    // 验证
    verify: (token) => {
        return async (ctx, next) => {
            try {
                const header = ctx.request.header
                if (
                    //不存在token或不符合验证 status设为401
                    !(
                        header.authorization &&
                        header.authorization.includes('Bearer ') &&
                        typeof verify(
                            header.authorization.split('Bearer ')[1],
                            STR
                        ) === 'object'
                    )
                ) {
                    ctx.throw(401)
                }
                await next()
            } catch (error) {
                ctx.throw(401)
            }
        }
    },
    // 解码
    decode: (token) => {
        try {
            return decode(token)
        } catch (error) {
            return false
        }
    },
}

module.exports = TOKEN
