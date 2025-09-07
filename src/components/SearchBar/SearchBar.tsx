import clsx from 'clsx';
import iconSearch from '../../assets/icon-search.svg';
import { useTheme } from '../../hooks/useTheme';
import { useState } from 'react';

type Props = {
    handleSearch: (value: string | undefined) => void
}

const SEARCH = "search"

export default function SearchBar({
  handleSearch
}: Props){
  
  const {theme} = useTheme()

  const [value, setValue] = useState("")

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value.trim())
  }

  return(
        <section className={clsx({
          "rounded-lg px-3 py-2 mb-8": true,
          "bg-neutral": theme === 'ligth',
          "bg-neutral-800": theme === 'dark',
        })}>
          <div className='flex items-center'>
            <img
              alt='search'
              src={iconSearch}
              className='w-5 h-5 mr-2'
            />
            <input
              type="text"
              placeholder='Search Github username...' 
              className={clsx({
                ' placeholder:text-neutral-500 w-full': true,
                'text-neutral': theme === 'dark',
                'text-neutral-700': theme === 'ligth',
              })}
              onChange={handleOnChange}
            />
            <button
              className='bg-blue-500 px-5 py-3 rounded-[10px] text-white capitalize tex-[13px]'
              onClick={() => handleSearch(value)}
            >
              {SEARCH}
            </button>
          </div>
        </section>
  )
}