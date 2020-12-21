module.exports = {
    // 数据库配置
    db: {
        database: 'wyblog',
        host: '106.52.75.174',
        user: 'root',
        password: 'mysql',
    },

    //token配置
    token:{
        expires:'1d',//用于jwt token过期设置
    }
}
