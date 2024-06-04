import process from 'node:process'
import c from 'picocolors'
import { hideBin } from 'yargs/helpers'
import yargs from 'yargs'
import * as p from '@clack/prompts'
import pkgJson from '../package.json'
import { run } from './run'

function header() {
  // eslint-disable-next-line no-console
  console.log('\n')
  p.intro(`${c.green(`${pkgJson.name} `)}${c.dim(`v${pkgJson.version}`)}`)
}

const instance = yargs(hideBin(process.argv))
  .scriptName(pkgJson.name)
  .usage('')
  .command(
    '*',
    'Run the initialization or migration',
    args => args.help(),
    async () => {
      header()
      try {
        await run()
      }
      catch (error) {
        p.log.error(c.inverse(c.red(' Failed to migrate ')))
        p.log.error(c.red(`✘ ${String(error)}`))
        process.exit(1)
      }
    },
  )
  .showHelpOnFail(false)
  .alias('h', 'help')
  .version('version', pkgJson.version)
  .alias('v', 'version')

// eslint-disable-next-line no-unused-expressions
instance
  .help()
  .argv
