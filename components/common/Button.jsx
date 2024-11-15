"use client";

export default function Button({tl,disabled=false,handleClick,tp='primary'}) {
  
  return (
    <button disabled={disabled} className={`button ${tp}`} onClick={handleClick}>{tl}</button>
  )
}