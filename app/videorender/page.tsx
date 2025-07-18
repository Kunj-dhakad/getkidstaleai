"use client";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { z } from "zod";
import { CompositionProps, COMP_NAME } from "../../types/constants";
import { useRendering } from "../../helpers/use-rendering";

const fallbackProps: z.infer<typeof CompositionProps> = {
    durationInFrames: 1,
    videoWidth: 1080,
    videoHeight: 1080,
    videobg: "",
    Watermark: [],
    Allclips: [],
};

const Home: NextPage = () => {
    const [inputProps, setInputProps] = useState<z.infer<typeof CompositionProps> | null>(null);
    const { renderMedia, state } = useRendering(COMP_NAME, inputProps || fallbackProps);


    useEffect(() => {
        const handleMessage = async (event: MessageEvent) => {
            if (event.data?.type === "START_RENDER") {
                const templateUrl = event.data.templateUrl;

                try {
                    const response = await fetch(templateUrl);
                    const json = await response.json();
                    const payload = JSON.parse(json.inputProps.payload);

                    const newProps: z.infer<typeof CompositionProps> = {
                        durationInFrames: payload.durationInFrames,
                        videoWidth: payload.videoWidth,
                        videoHeight: payload.videoHeight,
                        videobg: payload.videobg,
                        Allclips: payload.Allclips,
                        Watermark: payload.Watermark || [],
                    };

                    setInputProps(newProps);
                } catch (err) {
                    console.error("Failed to load template:", err);
                }
            }
        };

        window.addEventListener("message", handleMessage);
        return () => window.removeEventListener("message", handleMessage);
    }, []);


    useEffect(() => {
        if (
            inputProps &&
            inputProps.Allclips?.length > 0 &&
            inputProps.durationInFrames > 0
        ) {
            setTimeout(() => {
                renderMedia();
            }, 10);
        }
    }, [inputProps]);


    useEffect(() => {
        if (state.status === "rendering" && typeof state.progress === "number") {
            window.parent.postMessage(
                {
                    type: "RENDER_PROGRESS",
                    progress: state.progress,
                },
                "*"
            );
        }
    }, [state]);


    useEffect(() => {
        if (state.status === "done" && state.url) {
            window.parent.postMessage(
                {
                    type: "RENDER_DONE",
                    videoUrl: state.url,
                },
                "*"
            );
        }
    }, [state]);

    useEffect(() => {
        if (state.status === "error") {
            window.parent.postMessage(
                {
                    type: "RENDER_ERROR",
                    RenderError: state.error,
                },
                "*"
            );
        }
    }, [state]);



    return null;
};

export default Home;
