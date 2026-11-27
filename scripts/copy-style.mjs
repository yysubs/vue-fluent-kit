import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const target = resolve(root, 'dist/style.css')
const layers = [
  resolve(root, 'src/styles/tokens.css'),
  resolve(root, 'src/styles/brand.css'),
  resolve(root, 'src/styles/surfaces.css'),
]

mkdirSync(dirname(target), { recursive: true })
const combined = layers.map((file) => readFileSync(file, 'utf8').trimEnd()).join('\n\n') + '\n'
writeFileSync(target, combined, 'utf8')
