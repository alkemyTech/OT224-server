require('dotenv').config()

module.exports = {
    "development": {
        "username": process.env.DB_USER,
        "password": process.env.DB_PASSWORD,
        "database": process.env.DB_NAME,
        "host": process.env.DB_HOST,
        "port": process.env.DB_PORT,
        "dialect": "mysql",

        "seederStorage": "sequelize",
        "seederStoragePath": "sequelizeData",
        "useTempFiles": process.env.USE_TEMP_FILES,
        "tempFileDir" : process.env.TEMP_FILE_DIR,
        "debug": process.env.DEBUG

    },
    "test": {
        "username": process.env.DB_USER,
        "password": process.env.DB_PASSWORD,
        "database": process.env.TEST_DB_NAME,
        "host": process.env.DB_HOST,
        "port": process.env.DB_PORT,
        "dialect": "mysql",
        "useTempFiles": process.env.USE_TEMP_FILES,
        "tempFileDir" : process.env.TEMP_FILE_DIR,
        "debug": process.env.DEBUG
    },
    "production": {
        "username": process.env.DB_USER,
        "password": process.env.DB_PASSWORD,
        "database": process.env.DB_NAME,
        "host": process.env.DB_HOST,
        "dialect": "mysql",
        "useTempFiles": process.env.USE_TEMP_FILES,
        "tempFileDir" : process.env.TEMP_FILE_DIR,
        "debug": false
    },
    "aws": {
        "accessKeyId": process.env.ACCESS_KEY_ID,
        "secretAccessKey": process.env.SECRET_ACCESS_KEY,
        "s3BucketName": process.env.S3_BUCKET_NAME
    }
}