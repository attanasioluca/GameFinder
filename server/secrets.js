module.exports = {
    jwt_secret: process.env.JWT_SECRET || "hi",
    MONGO_DB_URL: process.env.MONGO_DB_URL || "mongodb://127.0.0.1:27017/gamefinder",
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "google_client_id",
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || "google_client_secret"
};