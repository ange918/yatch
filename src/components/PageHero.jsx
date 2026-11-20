import { motion } from 'framer-motion'
import Accent from './Accent'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
}

export default function PageHero({ eyebrow, title, subtitle, children, className = '' }) {
  return (
    <section
      className={`relative bg-gradient-to-b from-[#F7F4EC] via-[#F3EDE0] to-[#EBE2D1] pt-24 sm:pt-32 pb-14 sm:pb-20 border-b border-[#121110]/8 text-center ${className}`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        >
          {eyebrow && (
            <motion.p
              variants={fadeUp}
              className="text-xs font-bold uppercase tracking-[0.14em] text-[#D2511A] mb-4"
            >
              {eyebrow}
            </motion.p>
          )}
          <motion.h1
            variants={fadeUp}
            style={{ textWrap: 'balance' }}
            className="text-[clamp(2.25rem,4.6vw,3.75rem)] font-extrabold text-[#121110] leading-[1.06] tracking-tight max-w-4xl mx-auto"
          >
            <Accent editorial>{title}</Accent>
          </motion.h1>
          {subtitle && (
            <motion.p
              variants={fadeUp}
              className="text-base sm:text-lg text-[#4A453E] max-w-2xl mx-auto mt-5 leading-relaxed font-normal"
            >
              {subtitle}
            </motion.p>
          )}
          {children && (
            <motion.div variants={fadeUp} className="mt-8">
              {children}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
