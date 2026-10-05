import React from "react"
import type { HeadingId } from "./logic"

const useActiveId = (items: readonly HeadingId[]) => {
  const [activeId, setActiveId] = React.useState("")
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
            return
          }
        }
      },
      { rootMargin: "-53px 0% -80% 0%" },
    )
    items.forEach(item => {
      const ele = document.getElementById(item.id)
      if (ele != null) observer.observe(ele)
    })
    return () => observer.disconnect()
  }, [items])
  return activeId
}

export default useActiveId
