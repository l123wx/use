import path from 'node:path'
import fsp from 'node:fs/promises'
import process from 'node:process'
import fs from 'node:fs'
import c from 'picocolors'
import * as p from '@clack/prompts'

import { parse, stringify } from '../utils/configFile'

export async function updateNPMRC() {
  const cwd = process.cwd()

  const pathNPMRC = path.join(cwd, '.npmrc')
  const isConfigExisted = fs.existsSync(pathNPMRC)

  let npmrc: Record<string, any> = {}
  if (isConfigExisted) {
    p.log.step(c.cyan(`.npmrc is already exists, try to change`))
    const content = await fsp.readFile(pathNPMRC, 'utf-8')
    const parsed = parse(content)

    npmrc = parsed
  }

  npmrc['ignore-workspace-root-check'] ??= true
  npmrc['shell-emulator'] ??= true

  await fsp.writeFile(pathNPMRC, stringify(npmrc))

  if (isConfigExisted)
    p.log.success(c.green(`Updated .npmrc`))
  else
    p.log.success(c.green(`Created .npmrc`))
}
