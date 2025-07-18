import React, { forwardRef } from "react";
// import { Spacing } from "./Spacing";
import { Spinner } from "./Spinner";
import { cn } from "../../lib/utils";

const ButtonForward: React.ForwardRefRenderFunction<
  HTMLButtonElement,
  {
    onClick?: () => void;
    disabled?: boolean;
    children: React.ReactNode;
    loading?: boolean;
    secondary?: boolean;
  }
> = ({ onClick, disabled, children, loading, secondary }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "  kd-primary-btn h-10 font-medium transition-all duration-150 ease-in-out inline-flex items-center appearance-none text-sm    disabled:cursor-not-allowed",
        secondary
          ? "kd-primary-btn "
          : undefined,
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {loading && (
        <>

          <div className="me-2">   <Spinner size={20}></Spinner></div>

        </>
      )}
      {children}
    </button>
  );
};

export const Button = forwardRef(ButtonForward);
