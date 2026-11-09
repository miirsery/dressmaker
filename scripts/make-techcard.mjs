// Собирает public/primer-tehkarty.pdf из scripts/techcard.html. Запуск: yarn techcard
import { execFileSync } from 'node:child_process'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const chrome = process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

execFileSync(chrome, [
  '--headless=new',
  '--disable-gpu',
  '--no-pdf-header-footer',
  `--print-to-pdf=${resolve('public/primer-tehkarty.pdf')}`,
  pathToFileURL(resolve('scripts/techcard.html')).href,
], { stdio: 'ignore' })
