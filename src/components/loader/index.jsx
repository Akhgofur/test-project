import { CircularProgress } from '@mui/material'
import React from 'react'

const Loader = () => {
  return (
    <div className='w-full h-full flex items-center justify-center' >
        <CircularProgress />
    </div>
  )
}

export default Loader