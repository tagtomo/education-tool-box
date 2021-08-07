import { useRef, useEffect, useCallback } from "react";

export const useAnimationFrame = (callback: () => void) => {
  const requestRef = useRef<ReturnType<typeof requestAnimationFrame>>();
  const animate = useCallback(() => {
    callback();
    requestRef.current = requestAnimationFrame(animate);
  }, [callback]);
  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) {
        return cancelAnimationFrame(requestRef.current);
      }
    };
  }, [animate]);
};
