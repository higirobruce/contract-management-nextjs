'use client'
import { Select } from 'antd'
import React from 'react'

export default function MultipleSelect({options, setSelected}) {
  return (
    <div className='w-full '>
        <div className='text-xs mb-1'>Collaborators</div>
      <Select className='w-full' mode='multiple' options={options} onChange={(v)=>setSelected(v)}/>
    </div>
  )
}
