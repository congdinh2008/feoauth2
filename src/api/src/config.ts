const config = {
  port: 1990,
  bodyLimit: '2mb',
  corsHeaders: ['http://127.0.0.1', 'http://127.0.0.1:3000'],
  database: 'mongodb://localhost:27017/todos'
};

export { config };
