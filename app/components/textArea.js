import React, { useRef } from "react";
import { useTextField } from "react-aria";

export default function MyTextArea(props) {
  let { label } = props;
  let ref = useRef(null);
  let { labelProps, inputProps } = useTextField(
    {
      ...props,
      inputElementType: "textarea",
    },
    ref
  );

  return (
    <div className="flex flex-col w-full">
      <label {...labelProps}>{label}</label>
      <textarea placeholder="Add a comment" className="ring-1 ring-gray-300 focus:outline-none shadow-inner rounded px-2 py-1 text-xs text-gray-600" {...inputProps} ref={ref} />
    </div>
  );
}
