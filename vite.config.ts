import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const isPreview = env.BASE44_PREVIEW_MODE === '1'
  const sandboxDomain = env.BASE44_SANDBOX_HOST_DOMAIN
  const publicSuffix = env.BASE44_PUBLIC_HOST_SUFFIX

  return {
    plugins: [react()],
    server: {
      host: '0.0.0.0',
      port: 5173,
      allowedHosts: isPreview && sandboxDomain
        ? [`.${sandboxDomain}`]
        : true,
    },
  }
})
