
'use client'

import React from 'react';
import {useTextField} from 'react-aria';

export default function TextField(props) {
  let { label } = props;
  let ref = React.useRef(null);
  let { labelProps, inputProps, descriptionProps, errorMessageProps } =
    useTextField(props, ref);

  return (
    <div className='flex flex-col '>
      <label {...labelProps} className='text-xs text-gray-800 mb-1'>{label}</label>
      <input {...inputProps} ref={ref} className='rounded ring-1 ring-gray-300 p-[7px] text-xs focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-1 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 ' />
      {props.description && (
        <div {...descriptionProps} style={{ fontSize: 12 }}>
          {props.description}
        </div>
      )}
      {props.errorMessage && (
        <div {...errorMessageProps} className='text-xs text-red-500 mt-1'>
          {props.errorMessage}
        </div>
      )}
    </div>
  );
}