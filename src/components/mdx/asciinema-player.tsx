// Thanks to https://github.com/asciinema/asciinema-player/issues/72#issuecomment-1051545675

import React, { useEffect, useRef, useState } from "react"
import type { PlayerOptions } from "asciinema-player"
import "asciinema-player/dist/bundle/asciinema-player.css"

type AsciinemaPlayerProps = PlayerOptions & {
  src: string
}

function AsciinemaPlayer({ src, ...asciinemaOptions }: AsciinemaPlayerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [player, setPlayer] = useState<typeof import("asciinema-player")>()
  useEffect(() => {
    let cancelled = false
    import("asciinema-player").then(module => {
      if (!cancelled) setPlayer(module)
    })
    return () => {
      cancelled = true
    }
  }, [])
  useEffect(() => {
    const currentRef = ref.current
    if (!player || !currentRef) return
    const instance = player.create(src, currentRef, asciinemaOptions)
    return () => {
      instance?.dispose()
    }
  }, [src, player, asciinemaOptions])

  return <div ref={ref} />
}

export default AsciinemaPlayer
