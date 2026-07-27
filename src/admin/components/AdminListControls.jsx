export function AdminSearchBar({ value, onChange, placeholder = 'Search…', variant = 'inline' }) {
  return (
    <div className={`admin-list-controls__search ${variant === 'header' ? 'admin-list-controls__search--header' : ''}`}>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search"
      />
      {value ? (
        <button type="button" className="admin-list-controls__clear" onClick={() => onChange('')}>
          Clear
        </button>
      ) : null}
    </div>
  )
}

export function AdminFilterChips({ filters, value, onChange }) {
  if (!filters?.length) return null
  return (
    <div className="ba-apps__filters admin-list-controls__filters">
      {filters.map((filter) => (
        <button
          key={filter.key}
          type="button"
          className={`ba-chip ${value === filter.key ? 'is-on' : ''}`}
          onClick={() => onChange(filter.key)}
        >
          {filter.label}
          {filter.count != null ? ` (${filter.count})` : ''}
        </button>
      ))}
    </div>
  )
}

export function AdminPagination({
  page,
  totalPages,
  total,
  start,
  end,
  onChange,
  compact = false,
  label,
}) {
  if (!total) return null

  const pages = []
  const windowSize = compact ? 3 : 5
  let from = Math.max(1, page - Math.floor(windowSize / 2))
  let to = Math.min(totalPages, from + windowSize - 1)
  from = Math.max(1, to - windowSize + 1)
  for (let i = from; i <= to; i += 1) pages.push(i)

  return (
    <div
      className={`admin-list-controls__pagination ${compact ? 'admin-list-controls__pagination--compact' : ''}`}
      aria-label={label || 'Pagination'}
    >
      <p className="admin-list-controls__summary">
        {label ? <span className="admin-list-controls__label">{label}</span> : null}
        Showing <strong>{start}–{end}</strong> of <strong>{total}</strong>
        {totalPages > 1 ? (
          <>
            {' '}
            · page <strong>{page}</strong> of <strong>{totalPages}</strong>
          </>
        ) : null}
      </p>
      <div className="admin-list-controls__pages">
        <button
          type="button"
          className="admin-btn admin-btn--ghost"
          disabled={page <= 1}
          onClick={() => onChange(page - 1)}
        >
          Previous
        </button>
        {from > 1 ? (
          <>
            <button type="button" className="admin-btn admin-btn--ghost" onClick={() => onChange(1)}>
              1
            </button>
            {from > 2 ? <span className="admin-list-controls__ellipsis">…</span> : null}
          </>
        ) : null}
        {pages.map((n) => (
          <button
            key={n}
            type="button"
            className={`admin-btn admin-btn--ghost ${n === page ? 'is-active' : ''}`}
            onClick={() => onChange(n)}
          >
            {n}
          </button>
        ))}
        {to < totalPages ? (
          <>
            {to < totalPages - 1 ? <span className="admin-list-controls__ellipsis">…</span> : null}
            <button type="button" className="admin-btn admin-btn--ghost" onClick={() => onChange(totalPages)}>
              {totalPages}
            </button>
          </>
        ) : null}
        <button
          type="button"
          className="admin-btn admin-btn--ghost"
          disabled={page >= totalPages}
          onClick={() => onChange(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  )
}
