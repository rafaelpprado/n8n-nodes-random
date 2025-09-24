// scripts/postbuild.mjs
import { existsSync } from 'fs';
import { join } from 'path';

const distPath = join(process.cwd(), 'dist');

if (!existsSync(distPath)) {
  console.error('Postbuild: pasta dist/ não encontrada. O build do TypeScript falhou.');
  process.exit(1);
}

console.log('Postbuild: dist/ encontrado. Build concluído com sucesso.');
process.exit(0);
