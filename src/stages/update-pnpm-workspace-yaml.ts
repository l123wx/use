import path from 'node:path'
import fsp from 'node:fs/promises'
import process from 'node:process'
import fs from 'node:fs'
import c from 'picocolors'
import * as p from '@clack/prompts'
import YAML from 'yaml'

import { WORKSPACE_PACKAGE_PATH } from '../constants'

export async function updatePNPMWorkYaml() {
  const cwd = process.cwd()

  const pathPNPMWorkspaceYAML = path.join(cwd, 'pnpm-workspace.yaml')
  const isYAMLExisted = fs.existsSync(pathPNPMWorkspaceYAML)

  let pnpmWorkspaces: Record<string, any> = {}
  if (isYAMLExisted) {
    p.log.step(c.cyan(`pnpm-workspace.yaml is already exists, try to change`))
    const content = await fsp.readFile(pathPNPMWorkspaceYAML, 'utf-8')

    const parsed = YAML.parse(content)

    pnpmWorkspaces = parsed
  }

  pnpmWorkspaces.packages ??= []
  pnpmWorkspaces.packages = [...new Set([...pnpmWorkspaces.packages, WORKSPACE_PACKAGE_PATH])]

  await fsp.writeFile(pathPNPMWorkspaceYAML, YAML.stringify(pnpmWorkspaces))

  if (isYAMLExisted)
    p.log.success(c.green(`Updated pnpm-workspace.yaml`))
  else
    p.log.success(c.green(`Created pnpm-workspace.yaml`))
}
