import { SearchForm } from './search-form';

export function Header() {
  return (
    <header className="h-16 flex items-center border-b">
      <SearchForm />
    </header>
  );
}
