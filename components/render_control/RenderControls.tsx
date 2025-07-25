import React from "react";
import { z } from "zod";
import { useRendering } from "../../helpers/use-rendering";
import { CompositionProps, COMP_NAME } from "../../types/constants";
import { AlignEnd } from "./AlignEnd";
import { Button } from "./Button";
import { InputContainer } from "./Container";
import { DownloadButton } from "./DownloadButton";
// import { ErrorComp } from "./Error";
import { ProgressBar } from "./ProgressBar";
import { Spacing } from "./Spacing";

interface RenderControlsProps {

  inputProps: z.infer<typeof CompositionProps>;
}

export const RenderControls: React.FC<RenderControlsProps> = ({

  inputProps,
}) => {

  const { renderMedia, state, undo } = useRendering(COMP_NAME, inputProps);

  return (
    <InputContainer>
      {state.status === "init" ||
        state.status === "invoking" ||
        state.status === "error" ? (
        <>
          <Spacing />
          <AlignEnd>
            <Button
              disabled={state.status === "invoking"}
              loading={state.status === "invoking"}
              onClick={renderMedia}
            >
              Start Rendering
            </Button>
          </AlignEnd>
          {/* {state.status === "error" ? (
            <ErrorComp message={state.error.message} />
          ) : null} */}
        </>
      ) : null}
      {state.status === "rendering" || state.status === "done" ? (
        <>
          <ProgressBar
            progress={state.status === "rendering" ? state.progress : 1}
          />
          <Spacing />
          <AlignEnd>
            <DownloadButton undo={undo} state={state} inputProps={{ inputProps }} />
          </AlignEnd>
        </>
      ) : null}
    </InputContainer>
  );
};
