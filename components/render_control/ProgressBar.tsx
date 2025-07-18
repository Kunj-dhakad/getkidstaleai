import React, { useMemo } from "react";

export const ProgressBar: React.FC<{
  progress: number;
}> = ({ progress }) => {
  const fill: React.CSSProperties = useMemo(() => {
    return {
      width: `${progress * 100}%`,
    };
  }, [progress]);

  return (
    <div>
      <div className="w-full mt-2.5 mb-4 kd-progress-bar-track">
        <div
          className="bg-[--kd-theme-primary] transition-all ease-in-out duration-100 kd-progress-bar"
          style={fill}
        ></div>
      </div>
    </div>
  );
};
