/** Prefix public art paths with the Vite/GitHub Pages base. */
export function resolveArt(path: string | null | undefined): string | null {
  if (!path) return null
  if (
    path.startsWith('http') ||
    path.startsWith('data:') ||
    path.startsWith('blob:')
  ) {
    return path
  }
  const base = import.meta.env.BASE_URL
  if (path.startsWith('/')) return `${base}${path.slice(1)}`
  return `${base}${path}`
}
