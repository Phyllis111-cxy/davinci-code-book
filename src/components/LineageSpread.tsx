import { useMemo, useState } from 'react'
import { book } from '../data'

export function LineageSpread() {
  const [groupId, setGroupId] = useState<string | 'all'>('all')
  const [selectedId, setSelectedId] = useState(book.characters[0]?.id ?? '')

  const filtered = useMemo(() => {
    if (groupId === 'all') return book.characters
    return book.characters.filter((c) => c.groupId === groupId)
  }, [groupId])

  const selected = book.characters.find((c) => c.id === selectedId) ?? filtered[0]
  const nameOf = (id: string) => book.characters.find((c) => c.id === id)?.name ?? id

  const edges = useMemo(() => {
    if (!selected) return []
    return book.edges.filter((e) => e.from === selected.id || e.to === selected.id)
  }, [selected])

  return (
    <>
      <section className="page page--left">
        <div className="lineage">
          <p className="page-kicker">LINEAGE · 图谱</p>
          <h2 className="page-title">人物与组织</h2>
          <div className="lineage-groups">
            <button
              type="button"
              className={`chip${groupId === 'all' ? ' is-on' : ''}`}
              onClick={() => setGroupId('all')}
            >
              全部
            </button>
            {book.characterGroups.map((g) => (
              <button
                key={g.id}
                type="button"
                className={`chip${groupId === g.id ? ' is-on' : ''}`}
                onClick={() => setGroupId(g.id)}
              >
                {g.label}
              </button>
            ))}
          </div>
          <div className="char-list">
            {filtered.map((c) => (
              <button
                key={c.id}
                type="button"
                className={`char-card${selected?.id === c.id ? ' is-selected' : ''}`}
                onClick={() => setSelectedId(c.id)}
              >
                <div className="char-card__name">{c.name}</div>
                <div className="char-card__role">{c.role}</div>
              </button>
            ))}
          </div>
        </div>
      </section>
      <section className="page page--right">
        {selected ? (
          <div className="lineage-detail">
            <p className="page-kicker">
              {book.characterGroups.find((g) => g.id === selected.groupId)?.label}
            </p>
            <h3>{selected.name}</h3>
            <p className="char-card__role">{selected.role}</p>
            <p>{selected.bio}</p>
            <ul className="edge-list">
              {edges.map((e) => (
                <li key={`${e.from}-${e.to}-${e.label}`}>
                  {e.from === selected.id
                    ? `${selected.name} → ${nameOf(e.to)}（${e.label}）`
                    : `${nameOf(e.from)} → ${selected.name}（${e.label}）`}
                </li>
              ))}
              {edges.length === 0 ? <li>暂无直接关系边</li> : null}
            </ul>
          </div>
        ) : null}
      </section>
    </>
  )
}
