import { motion } from 'framer-motion'

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 md:px-6">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Hi, I'm <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">Tan Phat Nguyen</span></h1>
        <p className="text-lg md:text-xl text-gray-400 mb-8">Back End Developer</p>
<a href="#contact"><button
  className="cursor-pointer relative bg-white/10 py-2 rounded-full min-w-[8.5rem] min-h-[2.92rem] group max-w-full flex items-center justify-start hover:bg-green-400 transition-all duration-[0.8s] ease-[cubic-bezier(0.510,0.026,0.368,1.016)] shadow-[inset_1px_2px_5px_#00000080] mx-auto"
>
  <div className="absolute flex px-1 py-0.5 justify-start items-center inset-0">
    <div
      className="w-[0%] group-hover:w-full transition-all duration-[1s] ease-[cubic-bezier(0.510,0.026,0.368,1.016)]"
    ></div>
    <div
      className="rounded-full shrink-0 flex justify-center items-center shadow-[inset_1px_-1px_3px_0_black] h-full aspect-square bg-green-400 transition-all duration-[1s] ease-[cubic-bezier(0.510,0.026,0.368,1.016)] group-hover:bg-black"
    >
      <div
        className="size-[0.8rem] text-black group-hover:text-white group-hover:-rotate-45 transition-all duration-[1s] ease-[cubic-bezier(0.510,0.026,0.368,1.016)]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 16 16"
          height="100%"
          width="100%"
        >
          <path
            fill="currentColor"
            d="M12.175 9H0V7H12.175L6.575 1.4L8 0L16 8L8 16L6.575 14.6L12.175 9Z"
          ></path>
        </svg>
      </div>
    </div>
  </div>
  <div
    className="pl-[3.4rem] pr-[1.1rem] group-hover:pl-[1.1rem] group-hover:pr-[3.4rem] transition-all duration-[1s] ease-[cubic-bezier(0.510,0.026,0.368,1.016)] group-hover:text-black text-white"
  >
    Contacts
  </div>
</button>
</a>
      </motion.div>
      
    </section>
  )
}

export default Hero
