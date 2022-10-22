function Button({onClickFunction, children}) {
  return (
      <button
        onClick={()=>onClickFunction()}
      >
        {children}
      </button>
  )
}

export default Button