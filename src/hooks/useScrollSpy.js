import { useState, useEffect, useRef } from 'react'

/**
 * useScrollSpy
 * Returns the id of the section currently visible in the viewport.
 * @param {string[]} sectionIds - Array of section element IDs to spy on
 * @param {number} offset - Pixel offset from top (default 80 to account for navbar)
 */
export function useScrollSpy(sectionIds, offset = 80) {
  const [activeId, setActiveId] = useState('')
  const observerRef = useRef(null)

  useEffect(() => {
    const elements = sectionIds
      .map(id => document.getElementById(id))
      .filter(Boolean)

    if (elements.length === 0) return

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: `-${offset}px 0px -60% 0px`,
        threshold: 0,
      }
    )

    elements.forEach(el => observerRef.current.observe(el))

    return () => {
      if (observerRef.current) observerRef.current.disconnect()
    }
  }, [sectionIds, offset])

  return activeId
}
