const STORAGE_KEY = 'davinci-book-art'

type ArtMap = Record<string, string>

function readMap(): ArtMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as ArtMap) : {}
  } catch {
    return {}
  }
}

function writeMap(map: ArtMap) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(map))
}

export function getUploadedArt(id: string): string | null {
  return readMap()[id] ?? null
}

export function setUploadedArt(id: string, dataUrl: string) {
  const map = readMap()
  map[id] = dataUrl
  writeMap(map)
}

export function clearUploadedArt(id: string) {
  const map = readMap()
  delete map[id]
  writeMap(map)
}

export function resolveArt(
  id: string,
  fallback: string | null | undefined,
): string | null {
  const uploaded = getUploadedArt(id)
  if (uploaded) return uploaded
  if (!fallback) return null
  if (
    fallback.startsWith('http') ||
    fallback.startsWith('data:') ||
    fallback.startsWith('blob:')
  ) {
    return fallback
  }
  const base = import.meta.env.BASE_URL
  if (fallback.startsWith('/')) {
    return `${base}${fallback.slice(1)}`
  }
  return `${base}${fallback}`
}
