import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store/store";
import { updateClip } from "../../../app/store/clipsSlice";
import { LuArrowDown, LuArrowLeft, LuArrowRight, LuArrowUp } from "react-icons/lu";
import { FaArrowsRotate, FaKeyboard, FaMagnifyingGlassMinus, FaMagnifyingGlassPlus } from "react-icons/fa6";
import { MdDoNotDisturbAlt } from "react-icons/md";

type AnimationType = "None" | "Fade" | "Zoom" | "Slide" | "Rotate" | "Custom";
interface AnimationState {
    type: AnimationType;
    duration: number;
    slideDistanceX?: number;
    slideDistanceY?: number;
    degrees?: number;
}

const AnimationHelper: React.FC<{ active_type: string }> = ({ active_type }) => {
    const Activeid = useSelector((state: RootState) => state.editorTool.Activeid);
    const Allclips = useSelector((state: RootState) => state.slices.present.Allclips);
    const dispatch = useDispatch();

    const [animationTypeIn, setAnimationTypeIn] = useState<string>("");
    const [animationTypeOut, setAnimationTypeOut] = useState<string>("");
    const [animationIn, setAnimationIn] = useState<AnimationState>({
        type: "None",
        duration: 60,
        slideDistanceX: 0,
        slideDistanceY: 0,
        degrees: 0,
    });

    const [animationOut, setAnimationOut] = useState<AnimationState>({
        type: "None",
        duration: 60,
        slideDistanceX: 0,
        slideDistanceY: 0,
        degrees: 0,
    });

    const [InOutactiveTab, InOutsetActiveTab] = useState<"in" | "out">("in");

    // useEffect(() => {
    //     const activeClip = Allclips.find((clip) => clip.id === Activeid);

    //     if (!activeClip || activeClip.type !== active_type) return;

    //     // Check if it has 'animation' in its properties
    //     if ('animation' in activeClip.properties) {
    //         const { animation } = activeClip.properties;

    //         setAnimationIn({
    //             type: animation?.in?.type ?? "None",
    //             duration: animation?.in?.duration ?? 60,
    //             slideDistanceX: animation?.in?.slideDistanceX ?? 0,
    //             slideDistanceY: animation?.in?.slideDistanceY ?? 0,
    //             degrees: animation?.in?.degrees ?? 0,
    //         });

    //         setAnimationOut({
    //             type: animation?.out?.type ?? "None",
    //             duration: animation?.out?.duration ?? 60,
    //             slideDistanceX: animation?.out?.slideDistanceX ?? 0,
    //             slideDistanceY: animation?.out?.slideDistanceY ?? 0,
    //             degrees: animation?.out?.degrees ?? 0,
    //         });
    //     }
    // }, [Activeid, Allclips, active_type]);
    useEffect(() => {
        const activeClip = Allclips.find((clip) => clip.id === Activeid);

        if (!activeClip || activeClip.type !== active_type) return;

        if ('animation' in activeClip.properties) {
            const { animation } = activeClip.properties;

            const animIn = {
                type: animation?.in?.type ?? "None",
                duration: animation?.in?.duration ?? 60,
                slideDistanceX: animation?.in?.slideDistanceX ?? 0,
                slideDistanceY: animation?.in?.slideDistanceY ?? 0,
                degrees: animation?.in?.degrees ?? 0,
            };

            const animOut = {
                type: animation?.out?.type ?? "None",
                duration: animation?.out?.duration ?? 60,
                slideDistanceX: animation?.out?.slideDistanceX ?? 0,
                slideDistanceY: animation?.out?.slideDistanceY ?? 0,
                degrees: animation?.out?.degrees ?? 0,
            };

            setAnimationIn(animIn);
            setAnimationOut(animOut);

            // Set animationTypeIn and Out for active UI state

            const inferLabel = (anim: AnimationState): string => {
                if (anim.type === "Rotate") return "Rotate";
                if (anim.type === "Fade") return "Fade in";
                if (anim.type === "Zoom") return "Zoom in";
                if (anim.type === "Slide") {
                    if (anim.slideDistanceX && anim.slideDistanceX < 0) return "Slide Left";
                    if (anim.slideDistanceX && anim.slideDistanceX > 0) return "Slide Right";
                    if (anim.slideDistanceY && anim.slideDistanceY < 0) return "Slide Top";
                    if (anim.slideDistanceY && anim.slideDistanceY > 0) return "Slide Bottom";
                    return "Slide"; // fallback if slide distances are zero
                }
                if (activeClip.type === "text" && anim.type === "Custom") return "Typewriter";
                return "None";
            };

            const inferOutLabel = (anim: AnimationState): string => {
                if (anim.type === "Rotate") return "Rotate";
                if (anim.type === "Fade") return "Fade out";
                if (anim.type === "Zoom") return "Zoom out";
                if (anim.type === "Slide") {
                    if (anim.slideDistanceX && anim.slideDistanceX < 0) return "Slide Left";
                    if (anim.slideDistanceX && anim.slideDistanceX > 0) return "Slide Right";
                    if (anim.slideDistanceY && anim.slideDistanceY < 0) return "Slide Top";
                    if (anim.slideDistanceY && anim.slideDistanceY > 0) return "Slide Bottom";
                    return "Slide"; // fallback if slide distances are zero
                }
                return "None";
            };


            setAnimationTypeIn(inferLabel(animIn));
            setAnimationTypeOut(inferOutLabel(animOut));
        }
    }, [Activeid, Allclips, active_type]);

    const update_value = (updateproperties: Partial<any>) => {
        dispatch(
            updateClip({
                id: Activeid,
                properties: {
                    animation: { in: animationIn, out: animationOut },
                    ...updateproperties,
                },
            })
        );
    };

    const slideConfigs = {
        "Slide Left": { key: "slideDistanceX", label: "Slide Distance X (Left)", sign: -1 },
        "Slide Right": { key: "slideDistanceX", label: "Slide Distance X (Right)", sign: 1 },
        "Slide Top": { key: "slideDistanceY", label: "Slide Distance Y (Top)", sign: -1 },
        "Slide Bottom": { key: "slideDistanceY", label: "Slide Distance Y (Bottom)", sign: 1 },
    };

    const renderAnimationButton = (
        label: string,
        newType: string,
        icon?: React.ReactNode,
        target: "in" | "out" = "in"
    ) => {
        const isActive = target === "in" ? animationTypeIn === label : animationTypeOut === label;
        const currentAnim = target === "in" ? animationIn : animationOut;
        const setAnim = target === "in" ? setAnimationIn : setAnimationOut;
        const setType = target === "in" ? setAnimationTypeIn : setAnimationTypeOut;

        const slideData: Partial<AnimationState> = { type: newType as AnimationType };

        if (label.includes("Left")) {
            slideData.slideDistanceX = -100;
            slideData.slideDistanceY = 0;
            slideData.duration = 30;
        }
        if (label.includes("Right")) {
            slideData.slideDistanceX = 100;
            slideData.slideDistanceY = 0;
            slideData.duration = 30;
        }
        if (label.includes("Top")) {
            slideData.slideDistanceY = -100;
            slideData.slideDistanceX = 0;
            slideData.duration = 30;
        }
        if (label.includes("Bottom")) {
            slideData.slideDistanceY = 100;
            slideData.slideDistanceX = 0;
            slideData.duration = 30;
        }
        if (label.includes("Rotate")) {
            slideData.degrees = 180;
            slideData.duration = 30;
        }
        if (label.includes("Fade") || label.includes("Zoom")) {
            slideData.duration = 30;
        }
        return (
            <div
                className={`animation-btn ${isActive ? "animation-btn-active" : ""}`}
                onClick={() => {
                    const newAnim = { ...currentAnim, ...slideData };
                    setAnim(newAnim);
                    setType(label);
                    update_value({
                        animation: {
                            in: target === "in" ? newAnim : animationIn,
                            out: target === "out" ? newAnim : animationOut,
                        },
                        ...(target === "in" ? { animationTypeIn: label } : { animationTypeOut: label }),
                    });
                }}
            >
                <button>
                    {icon && <div className="text-2xl">{icon}</div>}
                    <div className="text-sm mt-1">{label}</div>
                </button>
            </div>
        );
    };

    const renderSlideControl = (type: keyof typeof slideConfigs, target: "in" | "out") => {
        const config = slideConfigs[type];
        const anim = target === "in" ? animationIn : animationOut;
        const setAnim = target === "in" ? setAnimationIn : setAnimationOut;

        const rawVal = anim[config.key as keyof AnimationState];
        const val = typeof rawVal === "number" ? rawVal : 0;

        return (
            <div>
                <label className="theme-small-text mt-2 w-8/12">{config.label}</label>
                <input
                    className="kd-range-input"
                    type="range"
                    min={0}
                    max={2000}
                    step={10}
                    value={Math.abs(val)}
                    onChange={(e) => {
                        const newVal = config.sign * parseInt(e.target.value);
                        const newAnim = {
                            ...anim,
                            [config.key]: newVal,
                            ...(config.key === "slideDistanceX" ? { slideDistanceY: 0 } : { slideDistanceX: 0 }),
                        };
                        setAnim(newAnim);
                        update_value({
                            animation: {
                                in: target === "in" ? newAnim : animationIn,
                                out: target === "out" ? newAnim : animationOut,
                            },
                        });
                    }}
                />
                <div className="theme-small-text">{Math.abs(val)}px</div>
            </div>
        );
    };

    return (
        <>
            <div className="kd-tab-list style-2">
                {[
                    { tab: "in", label: "IN" },
                    { tab: "out", label: "OUT" },
                ].map(({ tab, label }) => (
                    <button
                        key={tab}
                        onClick={() => InOutsetActiveTab(tab as "in" | "out")}
                        className={`kd-tab-btn ${InOutactiveTab === tab ? "active" : ""}`}
                    >
                        {label}
                    </button>
                ))}
            </div>

            {InOutactiveTab === "in" && (
                <>
                    <div className="mb-4 space-y-2">
                        <label className="theme-small-text w-8/12">In Duration (ms)</label>
                        <input
                            className="kd-range-input"
                            type="range"
                            min={15}
                            max={300}
                            step={15}
                            value={Math.max(animationIn.duration, 15)}
                            onChange={(e) => {
                                const val = parseInt(e.target.value);
                                const newAnim = { ...animationIn, duration: val };
                                setAnimationIn(newAnim);
                                update_value({ animation: { in: newAnim, out: animationOut } });
                            }}
                        />

                        <div className="theme-small-text">{(animationIn.duration / 30).toFixed(2)}s</div>

                        {animationTypeIn === "Rotate" && (
                            <div>
                                <label className="theme-small-text w-8/12">degrees</label>
                                <input
                                    className="kd-range-input"
                                    type="range"
                                    min={-360}
                                    max={360}
                                    step={5}
                                    value={animationIn.degrees}
                                    onChange={(e) => {
                                        const val = parseInt(e.target.value);
                                        const newAnim = { ...animationIn, degrees: val };
                                        setAnimationIn(newAnim);
                                        update_value({ animation: { in: newAnim, out: animationOut } });
                                    }}
                                />

                                <div className="theme-small-text">{(animationIn.degrees)}&deg;</div>
                            </div>
                        )}
                        {["Slide Left", "Slide Right", "Slide Top", "Slide Bottom"].includes(animationTypeIn) &&
                            renderSlideControl(animationTypeIn as keyof typeof slideConfigs, "in")}
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-2">
                        {renderAnimationButton("None", "None", <MdDoNotDisturbAlt />, "in")}
                        {renderAnimationButton("Rotate", "Rotate", <FaArrowsRotate />, "in")}
                        {renderAnimationButton("Slide Left", "Slide", <LuArrowLeft />, "in")}
                        {renderAnimationButton("Slide Right", "Slide", <LuArrowRight />, "in")}
                        {renderAnimationButton("Slide Top", "Slide", <LuArrowUp />, "in")}
                        {renderAnimationButton("Slide Bottom", "Slide", <LuArrowDown />, "in")}
                        {renderAnimationButton("Fade in", "Fade", <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.70625 5.875H28.2938C30.3438 5.875 32 7.53125 32 9.58125V23.4188C32 25.4688 30.3438 27.125 28.2938 27.125H3.70625C1.65625 27.125 0 25.4688 0 23.4188V9.58125C0 7.53125 1.65625 5.875 3.70625 5.875Z" fill="url(#paint0_linear_288_5319)" />
                            <defs>
                                <linearGradient id="paint0_linear_288_5319" x1="32" y1="16.5" x2="0" y2="16.5" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="white" stopOpacity="0.3" />
                                    <stop offset="1" stopColor="white" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                        </svg>, "in")}
                        {renderAnimationButton("Zoom in", "Zoom", <FaMagnifyingGlassPlus />, "in")}

                        {active_type === "text" &&
                            renderAnimationButton("Typewriter", "Custom", <FaKeyboard />, "in")
                        }


                    </div>
                </>
            )}

            {InOutactiveTab === "out" && (
                <>
                    <div className="mb-4 space-y-2">
                        <label className="theme-small-text w-8/12">Out Duration (ms)</label>
                        <input
                            className="kd-range-input"
                            type="range"
                            min={15}
                            max={300}
                            step={15}
                            value={animationOut.duration}
                            onChange={(e) => {
                                const val = parseInt(e.target.value);
                                const newAnim = { ...animationOut, duration: val };
                                setAnimationOut(newAnim);
                                update_value({ animation: { in: animationIn, out: newAnim } });
                            }}
                        />
                        <div className="theme-small-text">{(animationOut.duration / 30).toFixed(2)}s</div>


                        {animationTypeOut === "Rotate" && (
                            <div>
                                <label className="theme-small-text w-8/12">Out Degrees</label>
                                <input
                                    className="kd-range-input"
                                    type="range"
                                    min={-360}
                                    max={360}
                                    step={5}
                                    value={animationOut.degrees}
                                    onChange={(e) => {
                                        const val = parseInt(e.target.value);
                                        const newAnim = { ...animationOut, degrees: val };
                                        setAnimationOut(newAnim);
                                        update_value({ animation: { in: animationIn, out: newAnim } });
                                    }}
                                />
                                <div className="theme-small-text">{animationOut.degrees}&deg;</div>
                            </div>
                        )}

                        {["Slide Left", "Slide Right", "Slide Top", "Slide Bottom"].includes(animationTypeOut) &&
                            renderSlideControl(animationTypeOut as keyof typeof slideConfigs, "out")}
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-2">
                        {renderAnimationButton("None", "None", <MdDoNotDisturbAlt />, "out")}
                        {renderAnimationButton("Rotate", "Rotate", <FaArrowsRotate />, "out")}
                        {renderAnimationButton("Slide Left", "Slide", <LuArrowLeft />, "out")}
                        {renderAnimationButton("Slide Right", "Slide", <LuArrowRight />, "out")}
                        {renderAnimationButton("Slide Top", "Slide", <LuArrowUp />, "out")}
                        {renderAnimationButton("Slide Bottom", "Slide", <LuArrowDown />, "out")}
                        {renderAnimationButton("Fade out", "Fade", <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.70625 5.875H28.2938C30.3438 5.875 32 7.53125 32 9.58125V23.4188C32 25.4688 30.3438 27.125 28.2938 27.125H3.70625C1.65625 27.125 0 25.4688 0 23.4188V9.58125C0 7.53125 1.65625 5.875 3.70625 5.875Z" fill="url(#paint0_linear_288_5319)" />
                            <defs>
                                <linearGradient id="paint0_linear_288_5319" x1="32" y1="16.5" x2="0" y2="16.5" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="white" stopOpacity="0.3" />
                                    <stop offset="1" stopColor="white" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                        </svg>, "out")}
                        {renderAnimationButton("Zoom out", "Zoom", <FaMagnifyingGlassMinus />, "out")}

                    </div>
                </>
            )}
        </>
    );
};

export default AnimationHelper;
