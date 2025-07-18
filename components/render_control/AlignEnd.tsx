import React from "react";

export const AlignEnd: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return <div className="self-center text-center w-full">{children}</div>;
};
