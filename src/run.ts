import c from 'picocolors'
import * as p from '@clack/prompts'

import { cloneRepository } from './stages/clone-repository'
import { updatePackageJson } from './stages/update-package-json'
import { updatePNPMWorkYaml } from './stages/update-pnpm-workspace-yaml'

export async function run() {
  await cloneRepository()
  await updatePackageJson()
  await updatePNPMWorkYaml()

  p.log.success(c.green(`Setup completed`))
  p.outro(`Now you can install the dependencies ${c.cyan('pnpm i')} and use ${c.cyan('import { } from \'@l123wx/shared\'')}\n`)
}
