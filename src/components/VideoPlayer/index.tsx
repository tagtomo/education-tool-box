import React from "react";
import ReactPlayer from 'react-player'

type Props = {
  url: string;
};

const VideoPlayer: React.FC<Props> = (props) => {
  const { url } = props;

  return (
    <ReactPlayer
      url={url}
      volume={0}
      muted={true}
      // height="100%"
      width="100%"
    // controls={"false"}
    />
  );
};

export default VideoPlayer;
