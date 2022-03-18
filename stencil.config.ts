import { Config } from '@stencil/core'
import tailwind, { tailwindHMR } from 'stencil-tailwind-plugin';

// https://stenciljs.com/docs/config
export const config: Config = {
  globalStyle: 'src/global/app.css',
  globalScript: 'src/global/app.ts',
  taskQueue: 'async',
  outputTargets: [
    { type: 'dist-custom-elements' }
  ],
  plugins: [
    tailwind({
      // enableDebug: true,
      minify: true
    }),
    tailwindHMR()
  ],
  devServer: {
    reloadStrategy: 'pageReload'
  }
}
