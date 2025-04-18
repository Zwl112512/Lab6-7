// helpers/database.ts

import { Sequelize, QueryTypes } from 'sequelize';

// 初始化 Sequelize 实例，连接 PostgreSQL 数据库
const sequelize = new Sequelize('postgres', 'postgres', '12345', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false, // 如需调试 SQL，可改为 true
});

// 测试数据库连接
sequelize.authenticate()
  .then(() => console.log('✅ Database connected successfully.'))
  .catch(err => console.error('❌ Unable to connect to the database:', err));

// 通用查询（SELECT）
export const run_query = async (query: string, values: any[] | null) => {
  try {
    const data = await sequelize.query(query, {
      replacements: values || [],
      type: QueryTypes.SELECT,
    });
    return data;
  } catch (err) {
    console.error('❌ Database SELECT query error:', err);
    throw 'Database query error';
  }
};

// 插入（INSERT）
export const run_insert = async (query: string, values: any[]) => {
  try {
    await sequelize.query(query, {
      replacements: values,
      type: QueryTypes.INSERT,
    });
  } catch (err) {
    console.error('❌ Database INSERT error:', err);
    throw 'Database insert error';
  }
};

// 更新（UPDATE）
export const run_update = async (query: string, values: any[]) => {
  try {
    await sequelize.query(query, {
      replacements: values,
      type: QueryTypes.UPDATE,
    });
  } catch (err) {
    console.error('❌ Database UPDATE error:', err);
    throw 'Database update error';
  }
};

// 删除（DELETE）
export const run_delete = async (query: string, values: any[]) => {
  try {
    await sequelize.query(query, {
      replacements: values,
      type: QueryTypes.DELETE,
    });
  } catch (err) {
    console.error('❌ Database DELETE error:', err);
    throw 'Database delete error';
  }
};
