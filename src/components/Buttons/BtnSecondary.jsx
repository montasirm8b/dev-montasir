const BtnSecondary = ({children}) => {
  return (
    <button className='bg-white/10 hover:bg-white/20 active:scale-[0.98] text-white font-Nunito-regular px-4 py-2 rounded-lg flex justify-center items-center gap-2 ring-1 ring-white/15 hover:ring-white/25 backdrop-blur-md transition-all duration-200'>{children}</button>
  )
}

export default BtnSecondary
