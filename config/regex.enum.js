module.exports = {
    EMAIL:/^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    MONGO_ID:/^[a-fA-F0-9]{24}$/
}

