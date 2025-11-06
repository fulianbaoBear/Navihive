// Lightweight Vite config for local preview without Cloudflare plugin
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

function resolveIconsMaterialAlias() {
  const root = process.cwd()
  const nm = path.resolve(root, 'node_modules')
  const direct = path.resolve(nm, '@mui', 'icons-material')
  if (fs.existsSync(direct)) return direct

  // Check hoisted variant with temporary suffix
  const muiDir = path.resolve(nm, '@mui')
  if (fs.existsSync(muiDir)) {
    const candidates = fs.readdirSync(muiDir, { withFileTypes: true })
      .filter(d => d.isDirectory() && d.name.startsWith('icons-material'))
      .map(d => path.resolve(muiDir, d.name))
    if (candidates.length > 0) return candidates[0]
  }

  // Fallback to .pnpm store layout
  const pnpmDir = path.resolve(nm, '.pnpm')
  if (fs.existsSync(pnpmDir)) {
    const pkgDir = fs.readdirSync(pnpmDir, { withFileTypes: true })
      .filter(d => d.isDirectory() && d.name.startsWith('@mui+icons-material@'))
      .map(d => path.resolve(pnpmDir, d.name, 'node_modules', '@mui', 'icons-material'))
      .find(p => fs.existsSync(p))
    if (pkgDir) return pkgDir
  }
  return undefined
}

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Fix resolution when pnpm doesn't create standard @mui/icons-material symlink
      '@mui/icons-material': resolveIconsMaterialAlias() ?? '@mui/icons-material',
    },
  },
  server: {
    port: 5173,
    strictPort: true,
  },
})
// Does not import extra plugins; minimal config only.
