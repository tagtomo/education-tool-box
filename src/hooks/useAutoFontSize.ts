import { useState, useLayoutEffect, useEffect } from "react";
import stringWidth from "string-width";

export const useAutoFontSize = (targetRef, text) => {
  const [width, setWidth] = useState(0)
  const [fontSize, setFontSize] = useState("auto")
  useEffect(() => {
    const sizePx = (width / stringWidth(text)) * 2
    setFontSize(`${sizePx}px`)
  }, [width, text])

  useLayoutEffect(() => {
    const obs = new ResizeObserver((e) => setWidth(e[0].contentRect.width))
    obs.observe(targetRef.current)
    return () => obs.disconnect()
  }, [])
  return fontSize
}