const BlurCircle = ({ top, bottom, left, right }) => {
  return (
    <div
      className='absolute w-60 h-60 rounded-full blur-3xl bg-primary/20 -z-10'
      style={{ top, bottom, left, right }}
    />
  )
}

export default BlurCircle
