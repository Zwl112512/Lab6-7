// models/articles.ts
import * as db from '../helpers/database';

// 获取单篇文章
export const getById = async (id: any) => {
  let query = "SELECT * FROM articles WHERE id = ?";
  let values = [id];
  let data = await db.run_query(query, values);
  return data;
}

// 获取所有文章
export const getAll = async () => {
  let query = "SELECT * FROM articles;";
  let data = await db.run_query(query, null);
  return data;
}

// 新增文章
export const add = async (article: any) => {
  let keys = Object.keys(article);
  let values = Object.values(article);
  let key = keys.join(',');
  let param = '';
  for (let i = 0; i < values.length; i++) { param += '?,'; }
  param = param.slice(0, -1);
  let query = `INSERT INTO articles (${key}) VALUES (${param})`;
  try {
    await db.run_insert(query, values);
    return { status: 201 };
  } catch (err: any) {
    return err;
  }
}

// 更新文章
export const update = async (id: number, article: any) => {
  let keys = Object.keys(article);
  let values = Object.values(article);
  let setStr = keys.map(key => `${key} = ?`).join(',');
  let query = `UPDATE articles SET ${setStr} WHERE id = ?`;
  values.push(id);
  try {
    await db.run_update(query, values);
    return { status: 200 };
  } catch (err: any) {
    return err;
  }
}

// 删除文章
export const remove = async (id: number) => {
  let query = `DELETE FROM articles WHERE id = ?`;
  let values = [id];
  try {
    await db.run_delete(query, values);
    return { status: 200 };
  } catch (err: any) {
    return err;
  }
}
