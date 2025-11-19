const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

// Configura o NODE_ENV para test ANTES de importar qualquer coisa relacionada ao database
process.env.NODE_ENV = 'test';

const TEST_DB_PATH = path.resolve(__dirname, '../db/test.db');

async function setup() {
  // Garante que o diretório db existe
  const dbDir = path.dirname(TEST_DB_PATH);
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }

  // Remove o banco de dados anterior se existir
  if (fs.existsSync(TEST_DB_PATH)) {
    fs.unlinkSync(TEST_DB_PATH);
  }

  // Roda as migrations usando o knex CLI com tsx
  try {
    execSync('node --import tsx ./node_modules/knex/bin/cli.js migrate:latest', {
      cwd: path.resolve(__dirname, '..'),
      stdio: 'inherit',
      env: { ...process.env, NODE_ENV: 'test' },
    });
  } catch (error) {
    console.error('Erro ao executar migrations:', error);
    throw error;
  }
}

module.exports = setup;

