"use client";
import { useButton } from "react-aria";
import { useRef } from "react";

export default function Button(props) {
  let ref = useRef();
  let { buttonProps } = useButton(props, ref);
  let { children } = props;

  return (
    <button
      {...buttonProps}
      ref={ref}
      className={
        !props.isDisabled
          ? `py-1 bg-blue-500 text-white text-sm rounded shadow-md w-[100px] hover:bg-blue-400 active:shadow-none`
          : `py-1 bg-gray-300 text-white text-sm rounded shadow-md w-[100px] cursor-not-allowed`
      }
    >
      {children}
    </button>
  );
}
