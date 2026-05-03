const BtnPrimary = ({ children }) => {
  return (
    <button className='bg-sky-500 hover:bg-sky-400 active:scale-[0.98] text-white font-Nunito-regular px-4 py-2 rounded-lg flex justify-center items-center gap-2 shadow-lg shadow-sky-500/30 hover:shadow-sky-400/40 transition-all duration-200'>{children}</button>
  )
}

export default BtnPrimary
