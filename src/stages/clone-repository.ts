import process from 'node:process'
import path from 'node:path'
import fs from 'node:fs'
import fsp from 'node:fs/promises'
import degit from 'degit'
import c from 'picocolors'
import * as p from '@clack/prompts'
import { rimrafSync } from 'rimraf'
import { EXCLUDE_PATH, PACKAGE_NAME, REMOTE_REPOSITORY_PATH, WORKSPACE_PACKAGE_PATH } from '../constants'

export async function cloneRepository() {
  const cwd = process.cwd()

  if (fs.existsSync(path.join(cwd, WORKSPACE_PACKAGE_PATH))) {
    const isContinue = await p.confirm({
      initialValue: false,
      message: `The folder ${c.cyan(WORKSPACE_PACKAGE_PATH)} is already exists, continuing may loss your code, are you sure to continue?`,
    })

    if (p.isCancel(isContinue) || !isContinue) {
      p.cancel('Operation cancelled')
      process.exit(0)
    }
  }

  const s = p.spinner()
  p.log.step(c.cyan(`Start to clone ${REMOTE_REPOSITORY_PATH}`))
  s.start('Cloning repository')

  const emitter = degit(REMOTE_REPOSITORY_PATH, { force: true })
  await emitter.clone(path.join(process.cwd(), WORKSPACE_PACKAGE_PATH))

  s.stop(c.green('Cloned repository'))
  p.log.success(c.green('Repository cloned successfully'))

  await filterRepository()
}

export async function filterRepository() {
  p.log.step(c.cyan(`Filtering ${PACKAGE_NAME}`))
  const cwd = process.cwd()
  const pathPackage = path.join(cwd, WORKSPACE_PACKAGE_PATH)

  const pathPackageJSON = path.join(pathPackage, 'package.json')
  const pkgContent = await fsp.readFile(pathPackageJSON, 'utf-8')
  const pkg: Record<string, any> = JSON.parse(pkgContent)

  pkg.devDependencies = {}
  pkg.scripts = {}

  await fsp.writeFile(pathPackageJSON, JSON.stringify(pkg, null, 2))

  rimrafSync(EXCLUDE_PATH, { glob: { cwd: pathPackage } })

  p.log.success(c.green(`Filtered ${PACKAGE_NAME}`))
}
