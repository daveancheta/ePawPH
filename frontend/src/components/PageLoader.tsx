import { Loader } from 'lucide-react'
import React from 'react'

function Pageloader() {
  return (
    <div className='min-h-screen w-full flex items-center justify-center'>
        <Loader className='animate-spin'/>
    </div>
  )
}

export default Pageloader