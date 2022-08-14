import React from "react";

export function useFullScreen(ref?: React.RefObject<HTMLElement>) {

  const isFullScreen = () => {
    if (process.browser) {
      return document.fullscreenElement !== null;
    }
  }

  // access various exit fullscreen methods
  const closeFullScreen = () => {
    if (document.exitFullscreen !== undefined) {
      return document.exitFullscreen();
    }
  }

  const [fullScreen, setFullScreen] = React.useState(isFullScreen());

  const openFullScreen = React.useCallback(() => {
    const el = (ref && ref.current) || document.documentElement;

    if (el.requestFullscreen !== undefined) {
      return el.requestFullscreen();
    }
  }, [ref]);

  React.useEffect(() => {
    const handleChange = () => {
      setFullScreen(isFullScreen());
    };

    document.addEventListener('webkitfullscreenchange', handleChange, false);
    document.addEventListener('mozfullscreenchange', handleChange, false);
    document.addEventListener('msfullscreenchange', handleChange, false);
    document.addEventListener('MSFullscreenChange', handleChange, false); // IE11
    document.addEventListener('fullscreenchange', handleChange, false);

    return () => {
      document.removeEventListener('webkitfullscreenchange', handleChange);
      document.removeEventListener('mozfullscreenchange', handleChange);
      document.removeEventListener('msfullscreenchange', handleChange);
      document.removeEventListener('MSFullscreenChange', handleChange);
      document.removeEventListener('fullscreenchange', handleChange);
    };
  }, []);

  return {
    fullScreen,
    open: openFullScreen,
    close: closeFullScreen,
    toggle: fullScreen ? closeFullScreen : openFullScreen,
  };
}