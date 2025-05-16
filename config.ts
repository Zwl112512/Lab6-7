const config = {
  host: 'localhost',
  port: 5432,
  username: 'postgres',     // ✅ 改为 username
  password: '12345',
  database: 'postgres',
  dialect: 'postgres',      // ✅ 加上 dialect
  logging: false ,           // 可选：关闭SQL输出日志

  jwtSecret: 'zwl112512'
};

export default config;
