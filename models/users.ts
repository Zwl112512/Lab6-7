// models/users.ts
import * as db from '../helpers/database';

// 获取单个用户
export const getById = async (id: any) => {
  let query = "SELECT * FROM users WHERE id = ?";
  let values = [id];
  let data = await db.run_query(query, values);
  return data;
}

// 获取所有用户
export const getAll = async () => {
  let query = "SELECT * FROM users;";
  let data = await db.run_query(query, null);
  return data;
}

// 新增用户
export const add = async (user: any) => {
  let keys = Object.keys(user);
  let values = Object.values(user);
  let key = keys.join(',');
  let param = '';
  for (let i = 0; i < values.length; i++) { param += '?,'; }
  param = param.slice(0, -1);
  let query = `INSERT INTO users (${key}) VALUES (${param})`;
  try {
    await db.run_insert(query, values);
    return { status: 201 };
  } catch (err: any) {
    return err;
  }
}

// 更新用户
export const update = async (id: number, user: any) => {
  let keys = Object.keys(user);
  let values = Object.values(user);
  let setStr = keys.map(key => `${key} = ?`).join(',');
  let query = `UPDATE users SET ${setStr} WHERE id = ?`;
  values.push(id);
  try {
    await db.run_update(query, values);
    return { status: 200 };
  } catch (err: any) {
    return err;
  }
}

// 删除用户
export const remove = async (id: number) => {
  let query = `DELETE FROM users WHERE id = ?`;
  let values = [id];
  try {
    await db.run_delete(query, values);
    return { status: 200 };
  } catch (err: any) {
    return err;
  }
}


export const findByUsername = async (username: string) => {
  const query = 'SELECT * FROM users WHERE username = ?';
  const result = await db.run_query(query, [username]);
  return result;
};

