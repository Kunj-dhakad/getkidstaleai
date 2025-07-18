import React, {useCallback, useMemo} from 'react';
import {useCurrentScale} from 'remotion';
// import { Item} from '../../app/store/clipsSlice';
import { Allclips, } from '../../../app/store/clipsSlice';

const HANDLE_SIZE = 8;
 
export const ResizeHandle: React.FC<{
  type: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  setItem: (itemId: string, updater: (item: Allclips) => Allclips) => void;
  item: Allclips;
}> = ({type, setItem, item}) => {
  const scale = useCurrentScale();
  const size = Math.round(HANDLE_SIZE / scale);
  const borderSize = 1 / scale;
 
  const sizeStyle: React.CSSProperties = useMemo(() => {
    return {
      position: 'absolute',
      height: size,
      width: size,
      backgroundColor: 'white',
      border: `${borderSize}px solid var(--kd-theme-primary)`,
    };
  }, [borderSize, size]);
 
  const margin = -size / 2 - borderSize;
 
  const style: React.CSSProperties = useMemo(() => {
    if (type === 'top-left') {
      return {
        ...sizeStyle,
        marginLeft: margin,
        marginTop: margin,
        cursor: 'nwse-resize',
      };
    }
 
    if (type === 'top-right') {
      return {
        ...sizeStyle,
        marginTop: margin,
        marginRight: margin,
        right: 0,
        cursor: 'nesw-resize',
      };
    }
 
    if (type === 'bottom-left') {
      return {
        ...sizeStyle,
        marginBottom: margin,
        marginLeft: margin,
        bottom: 0,
        cursor: 'nesw-resize',
      };
    }
 
    if (type === 'bottom-right') {
      return {
        ...sizeStyle,
        marginBottom: margin,
        marginRight: margin,
        right: 0,
        bottom: 0,
        cursor: 'nwse-resize',
      };
    }
 
    throw new Error('Unknown type: ' + JSON.stringify(type));
  }, [margin, sizeStyle, type]);
 
  const onPointerDown = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (e.button !== 0) {
        return;
      }
 
      const initialX = e.clientX;
      const initialY = e.clientY;
 
      const onPointerMove = (pointerMoveEvent: PointerEvent) => {
        const offsetX = (pointerMoveEvent.clientX - initialX) / scale;
        const offsetY = (pointerMoveEvent.clientY - initialY) / scale;
 
        const isLeft = type === 'top-left' || type === 'bottom-left';
        const isTop = type === 'top-left' || type === 'top-right';
 
        setItem(item.id, (i) => {
          const newWidth = item.properties.width + (isLeft ? -offsetX : offsetX);
          const newHeight = item.properties.height + (isTop ? -offsetY : offsetY);
          const newLeft = item.properties.left + (isLeft ? offsetX : 0);
          const newTop = item.properties.top + (isTop ? offsetY : 0);
 
          return {
            ...i,
            width: Math.max(1, Math.round(newWidth)),
            height: Math.max(1, Math.round(newHeight)),
            left: Math.min(item.properties.left + item.properties.width - 1, Math.round(newLeft)),
            top: Math.min(item.properties.top + item.properties.height - 1, Math.round(newTop)),
            isDragging: true,
          };
        });
      };
 
      const onPointerUp = () => {
        setItem(item.id, (i) => {
          return {
            ...i,
            isDragging: false,
          };
        });
        window.removeEventListener('pointermove', onPointerMove);
      };
 
      window.addEventListener('pointermove', onPointerMove, {passive: true});
      window.addEventListener('pointerup', onPointerUp, {
        once: true,
      });
    },
    [item, scale, setItem, type],
  );
 
  return <div onPointerDown={onPointerDown} style={style} />;
};