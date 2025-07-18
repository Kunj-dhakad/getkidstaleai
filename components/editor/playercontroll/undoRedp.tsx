import React, { useEffect } from 'react';
import { FaRotateLeft, FaRotateRight } from 'react-icons/fa6';
import { connect } from 'react-redux';
import { ActionCreators as UndoActionCreators } from 'redux-undo';

interface UndoRedoProps {
    canUndo: boolean;
    canRedo: boolean;
    onUndo: () => void;
    onRedo: () => void;
}

const UndoRedo: React.FC<UndoRedoProps> = ({ canUndo, canRedo, onUndo, onRedo }) => {

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            // console.log(`Key pressed: ${event.key}`);
            if (event.ctrlKey && event.key === 'z') { onUndo(); }
            if (event.ctrlKey && event.key === 'y') { onRedo(); }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [onRedo, onUndo]);

    return (


        <div className='flex items-center gap-2'>
            <button
                onClick={onUndo} disabled={!canUndo}
                className={`undo-redo-btn`}
            >
                <FaRotateLeft />
            </button>
            <button
                onClick={onRedo} disabled={!canRedo}
                className={`undo-redo-btn`}
            >
                <FaRotateRight />
            </button>

        </div>

    )
}

const mapStateToProps = (state: any) => {
    // console.log('State:', state.slices);
    return {
        canUndo: state.slices.past && state.slices.past.length > 0,
        canRedo: state.slices.future && state.slices.future.length > 0,
    };
};
const mapDispatchToProps = (dispatch: (arg0: { type: string }) => any) => ({
    onUndo: () => dispatch(UndoActionCreators.undo()),
    onRedo: () => dispatch(UndoActionCreators.redo())
});

export default connect(mapStateToProps, mapDispatchToProps)(UndoRedo);
