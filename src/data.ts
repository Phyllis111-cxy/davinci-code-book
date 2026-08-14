import raw from './book.json'
import type { BookData } from './types'

/** Story payload — re-exported for HMR when book.json changes */
export const book = raw as BookData
