// Script untuk generate password hash yang benar
// Jalankan: node generate-hash.js

const crypto = require('crypto');

const SESSION_SECRET = 'your-secret-key-change-in-production';
const password = '12345678';

function hashPassword(password) {
  return crypto
    .createHash('sha256')
    .update(password + SESSION_SECRET)
    .digest('hex');
}

const hash = hashPassword(password);

console.log('='.repeat(60));
console.log('PASSWORD HASH GENERATOR');
console.log('='.repeat(60));
console.log('Password:', password);
console.log('Secret:', SESSION_SECRET);
console.log('Hash:', hash);
console.log('='.repeat(60));
console.log('\nRun this SQL in Supabase:');
console.log('='.repeat(60));
console.log(`
UPDATE admin_users
SET password_hash = '${hash}'
WHERE username = 'admin';
`);
console.log('='.repeat(60));
