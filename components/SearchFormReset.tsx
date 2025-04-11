'use client'
import { X } from 'lucide-react'
import React from 'react'
import { Link } from 'next/link'

const SearchFormReset = () => {
    const reset = () => {
        const form = document.querySelector('.search-form') as HTMLFormElement;

        if(form){
            form.reset
        }
    }
  return (
   <button className='icon-button' onClick={reset}>
        <Link>
            <X className='size-5'/>
        </Link>
   </button>
  )
}

export default SearchFormReset