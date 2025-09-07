import clsx from 'clsx';
import { useState, useCallback } from 'react';
import useFetch from './hooks/useFetch';
import type { User } from './types/User';
import { useTheme } from './hooks/useTheme';
import Error from './components/Error/Error';
import Header from './components/Header/Header';
import Profile from './components/Profile/Profile';
import SearchBar from './components/SearchBar/SearchBar';

export default function App() {
  const { theme } = useTheme()
  const [ url, setUrl ] = useState<string>("");

  const handleSearch = useCallback((value: string | undefined) => {
    if(value)
      setUrl(`https://api.github.com/users/${value}`);
  }, [url])

  const { data, loading, error } = useFetch<User>(url);

  if(loading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  return (
    <section
      className={clsx({
        "h-screen px-4 py-8": true,
        "bg-neutral-100" : theme === "ligth",
        "bg-neutral-900": theme === "dark",
      })}
    >
      <section className='max-w-[730px] mx-auto'>
        <Header />
        <SearchBar handleSearch={handleSearch}/>
        <section className={clsx({
          "bg-neutral": theme === 'ligth',
          "bg-neutral-800": theme === 'dark',
          "rounded-lg mt-6 p-8": true
        })}>
          {error ? <Error/> : data && <Profile data={data}/>}
        </section>
      </section>
    </section>
  )
}