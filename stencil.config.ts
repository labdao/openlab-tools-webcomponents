import { Config } from '@stencil/core'
import tailwindcss from 'tailwindcss'
import tailwind from 'stencil-tailwind-plugin'

// https://stenciljs.com/docs/config
export const config: Config = {
  globalStyle: 'src/global/app.css',
  globalScript: 'src/global/app.ts',
  taskQueue: 'async',
  outputTargets: [
    {
      type: 'www',
      // comment the following line to disable service workers in production
      serviceWorker: null,
      baseUrl: 'https://talos.local/',
    },
  ],
  plugins: [
    tailwind({
      // enableDebug: true,
      minify: true
    })
  ],
  devServer: {
    reloadStrategy: 'pageReload'
  }
}
