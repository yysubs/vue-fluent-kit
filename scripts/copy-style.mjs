import { copyFileSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const target = resolve(root, 'dist/style.css')

mkdirSync(dirname(target), { recursive: true })
copyFileSync(resolve(root, 'src/styles/index.css'), target)
