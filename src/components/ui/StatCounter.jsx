import { useEffect, useRef, useState } from 'react'
import { useInView } from 'motion/react'

/**
 * StatCounter — animates a number from 0 to `target` when scrolled into view.
 *
 * Props:
 *  - target: number
 *  - suffix: string (e.g. '+', '%', 'min')
 *  - duration: number (ms, default 1800)
 */
export default function StatCounter({ target, suffix = '', duration = 1800 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  const startedRef = useRef(false)

  useEffect(() => {
    if (!isInView || startedRef.current) return
    startedRef.current = true

    const startTime = performance.now()
    const isDecimal = !Number.isInteger(target)

    const step = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // easeOut cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = isDecimal
        ? parseFloat((eased * target).toFixed(1))
        : Math.round(eased * target)
      setCount(current)
      if (progress < 1) requestAnimationFrame(step)
    }

    requestAnimationFrame(step)
  }, [isInView, target, duration])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}
