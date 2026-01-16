import { Search } from 'lucide-react';

export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative">
      <Search className="w-5 h-5 text-gray-500" style={{ 
        position: 'absolute', 
        left: '0.75rem', 
        top: '50%', 
        transform: 'translateY(-50%)' 
      }} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search recipes by name, ingredient, or cuisine..."
        className="input"
        style={{ paddingLeft: '2.5rem' }}
      />
    </div>
  );
}