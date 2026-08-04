import { normalizeBattleCatalog, scheduleFieldsFromCatalogBattle } from '../../cms/battleCatalog'

export function BattleTitleField({ value, onChange, catalog, battleTypes, onApplyBattle }) {
  const battles = normalizeBattleCatalog(catalog)
  const catalogTitles = battles.map((b) => b.title)

  const handleChange = (title) => {
    const battle = battles.find((b) => b.title === title)
    if (battle && onApplyBattle) {
      onApplyBattle(scheduleFieldsFromCatalogBattle(battle, battleTypes))
      return
    }
    onChange(title)
  }

  return (
    <div className="admin-field">
      <label>Battle</label>
      <select value={value || ''} onChange={(e) => handleChange(e.target.value)}>
        <option value="">Select battle…</option>
        {value && !catalogTitles.includes(value) ? (
          <option value={value}>{value} (custom)</option>
        ) : null}
        {battles.map((battle) => (
          <option key={battle.id} value={battle.title}>
            {battle.category === 'Sports' ? `${battle.title} · Sports` : battle.title}
          </option>
        ))}
      </select>
    </div>
  )
}
