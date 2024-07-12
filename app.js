"use strict";

import pg from 'pg';

import config from './config.js';
import { getHeroes } from './getHeroes.js';

const client = new pg.Client(config);
await client.connect();

const heroes = await getHeroes();
const heroesJSON = JSON.stringify(heroes.results);

try {
	const query = `
      INSERT INTO heroes (name, data)
      SELECT elem->>'name', elem
      FROM jsonb_array_elements($1::jsonb) AS elem;
    `;
   	await client.query('CREATE TABLE IF NOT EXISTS heroes (id SERIAL NOT NULL PRIMARY KEY, name VARCHAR, data JSONB);');
   	await client.query(query, [heroesJSON]);
   	console.log('Данные успешно вставлены');
  } catch (err) {
    console.error('Ошибка при вставке данных:', err.stack);
  } finally {
    await client.end();
  }; 







