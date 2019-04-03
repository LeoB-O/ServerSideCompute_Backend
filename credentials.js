module.exports = {
    mongo: {
        development: {
            connectionString: 'mongodb://localhost:27017/ServerSideCompute_Backend',
        },
        production: {
            connectionString: ''
        }
    },
    jwt: {
        development: {
            secret: '123456',
            options: {
                cookie: 'ServerSideCompute_Backend',
                cookies: false
            }
        }
    }
}
