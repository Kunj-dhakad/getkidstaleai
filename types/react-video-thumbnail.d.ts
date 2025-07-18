// types/react-video-thumbnail.d.ts
declare module 'react-video-thumbnail' {
  import * as React from 'react';

  interface VideoThumbnailProps {
    videoUrl: string;
    snapshotAtTime?: number;
    thumbnailHandler?: (thumbnail: string) => void;
    renderThumbnail?: (props: any) => JSX.Element;
    width?: number;
    height?: number;
    cors?: boolean;
  }

  export default class VideoThumbnail extends React.Component<VideoThumbnailProps, any> {}
}
