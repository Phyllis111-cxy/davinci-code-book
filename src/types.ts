export type BookmarkId = 'chapters' | 'points' | 'lineage'

export type GameType =
  | 'word-label'
  | 'connect'
  | 'fibonacci-sequence'
  | 'symbol-decode'
  | 'cryptex-rings'

export interface MotifLabels {
  primaryViewTitle: string
  nextLabel: string
  prevLabel: string
  bookmarkChapters: string
  bookmarkPoints: string
  bookmarkLineage: string
  closeLabel: string
}

export interface CoverData {
  title: string
  subtitle: string
  image: string | null
  imagePrompt: string
}

export interface Phase {
  id: string
  phase: number
  title: string
  titleLocal: string
  summary: string
  imagePrompt: string
  image: string | null
  quote?: string
}

export interface WordLabelItem {
  id: string
  answer: string
  glyph: string
}

export interface ConnectPair {
  left: string
  right: string
}

export interface FibonacciSequenceGame {
  type: 'fibonacci-sequence'
  prompt?: string
  /** 左页螺旋上打乱放置的数字 */
  scrambled: number[]
  /** 正确斐波那契序 */
  answer: number[]
  /** 归位后解锁的关键词 */
  keyword: string
  unlockText?: string
  hint?: string
}

export interface WordLabelGameDef {
  type: 'word-label'
  prompt?: string
  items: WordLabelItem[]
}

export interface ConnectGameDef {
  type: 'connect'
  pairs: ConnectPair[]
}

export interface SymbolDecodeItem {
  id: string
  name: string
  glyph: string
  clue: string
  x: number
  y: number
  options: string[]
  answer: string
}

export interface SymbolDecodeGame {
  type: 'symbol-decode'
  prompt?: string
  hint?: string
  keyword: string
  unlockText?: string
  symbols: SymbolDecodeItem[]
}

export interface CryptexRing {
  id: string
  /** 环上可转动的字符 */
  glyphs: string[]
  /** 正确朝前的字符 */
  answer: string
  /** 刻痕线索（写在章节/右页） */
  clue: string
}

export interface CryptexRingsGame {
  type: 'cryptex-rings'
  prompt?: string
  hint?: string
  keyword: string
  unlockText?: string
  rings: CryptexRing[]
}

export type PointGame =
  | FibonacciSequenceGame
  | WordLabelGameDef
  | ConnectGameDef
  | SymbolDecodeGame
  | CryptexRingsGame

export interface Point {
  id: string
  phaseId: string
  label: string
  title: string
  summary: string
  imagePrompt: string
  image: string | null
  game?: PointGame
}

export interface CharacterGroup {
  id: string
  label: string
}

export interface Character {
  id: string
  name: string
  groupId: string
  role: string
  bio: string
  image: string | null
  imagePrompt: string
}

export interface Edge {
  from: string
  to: string
  label: string
}

export interface BookData {
  slug: string
  title: string
  titleLocal: string
  author: string
  tagline: string
  worldLabel: string
  motif: MotifLabels
  artStyle: string
  cover: CoverData
  phases: Phase[]
  points: Point[]
  characterGroups: CharacterGroup[]
  characters: Character[]
  edges: Edge[]
}

export type AppMode = 'closed' | 'closing-out' | 'open'
