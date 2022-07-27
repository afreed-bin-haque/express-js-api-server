import mysql from 'mysql';
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database:'express_js_database'
});


export { connection } 