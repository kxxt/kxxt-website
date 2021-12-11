import React from "react"

const useActiveId = items => {
  const [activeId, setActiveId] = React.useState("")
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
            return
          }
        }
      },
      { rootMargin: "-53px 0% -80% 0%" }
    )
    // console.log("START")
    items.forEach((item) => {
      observer.observe(document.getElementById(item.id))
    })
    // console.log("END")
    return () => {
      try {
        items.forEach((item) => {
          observer.unobserve(document.getElementById(item.id))
        })
      } catch (e) {
        console.log(e)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return activeId
}

export default useActiveId