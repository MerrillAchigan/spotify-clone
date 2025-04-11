import React from 'react'
import Form from 'next/form'
import SearchFormReset from './SearchFormReset'
import { Search } from 'lucide-react'

const SearchForm = ({query}: {query?: string} ) => {
  return (
    <Form action ='/' scroll={false} className='search-form'>
        <input type="text" name='query' defaultValue={query} className='search-input' placeholder='Search Musics, Albums, Artists..' />
        <div className='flex gap-2'>
            {query && (
                <SearchFormReset />
            )}
            |
            <button className='button'>
                <Search className='size-5'/>
            </button>
        </div>
    </Form>
  )
}

export default SearchForm