exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/blogApp';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/test-blogApp';
exports.PORT = process.env.PORT || 8080;