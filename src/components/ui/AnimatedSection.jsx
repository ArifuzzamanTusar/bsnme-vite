import { motion } from 'motion/react'

/**
 * AnimatedSection — reusable scroll-reveal wrapper.
 * Wraps children with a fade + slide-up animation triggered once on viewport entry.
 *
 * Props:
 *  - delay: number (seconds) — stagger delay
 *  - className: string — additional classes
 *  - as: string — rendered HTML element (default 'div')
 *  - stagger: bool — if true, wraps with a stagger container variant
 */

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

export default function AnimatedSection({
  children,
  delay = 0,
  className = '',
  as: Tag = 'div',
  stagger = false,
}) {
  if (stagger) {
    return (
      <motion.div
        className={className}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <motion.div
      className={className}
      custom={delay}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
    >
      {children}
    </motion.div>
  )
}

// Export item variant for stagger children
export { itemVariants, containerVariants }
