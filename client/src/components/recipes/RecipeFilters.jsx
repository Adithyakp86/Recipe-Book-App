export default function RecipeFilters({ filters, onChange }) {
  const categories = ['', 'breakfast', 'lunch', 'dinner', 'dessert', 'snack', 'beverage'];
  const difficulties = ['', 'easy', 'medium', 'hard'];

  return (
    <div className="flex flex-wrap gap-4">
      <div>
        <label className="form-label">Category</label>
        <select
          value={filters.category}
          onChange={(e) => onChange({ category: e.target.value })}
          className="input"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat || 'All Categories'}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="form-label">Difficulty</label>
        <select
          value={filters.difficulty}
          onChange={(e) => onChange({ difficulty: e.target.value })}
          className="input"
        >
          {difficulties.map((diff) => (
            <option key={diff} value={diff}>
              {diff || 'All Difficulties'}
            </option>
          ))}
        </select>
      </div>
      {(filters.category || filters.difficulty) && (
        <div className="flex items-end">
          <button
            onClick={() => onChange({ category: '', difficulty: '' })}
            className="btn btn-secondary"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}