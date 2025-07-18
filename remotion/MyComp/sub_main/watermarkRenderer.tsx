import { AbsoluteFill, Img } from "remotion";
interface WatermarkRendererProps {
  url: string;
}

const WatermarkRenderer: React.FC<WatermarkRendererProps> = ({ url }) => {
  return (
    <AbsoluteFill
      style={{
        height: "100%",
        width: "100%",
        position: "relative",
       
      }}
    >
      <div
        style={{
          width: "200px",
          position: "absolute",
          transform: "trancelate(100%,100%)",
          right: "30px",
          bottom: "30px",
          zIndex:100,
        }}
      >
        {url !== "" &&
          <Img
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
            }}
            src={url}
          />
        }

      </div>
    </AbsoluteFill>
  )
}
export default WatermarkRenderer;