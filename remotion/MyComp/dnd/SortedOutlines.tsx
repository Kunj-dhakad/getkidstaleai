import React from 'react';
import {Sequence} from 'remotion';
import {SelectionOutline} from './SelectionOutline';
// import { Item} from '../../app/store/clipsSlice';
import { Allclips, } from '../../../app/store/clipsSlice';

const displaySelectedItemOnTop = (
  items: Allclips[],
  selectedItem: string | null,
): Allclips[] => {
  const selectedItems = items.filter((item) => item.id === selectedItem);
  const unselectedItems = items.filter((item) => item.id !== selectedItem);
  return [...unselectedItems, ...selectedItems];
};
 
export const SortedOutlines: React.FC<{
  items: Allclips[];
  selectedItem: string | null;
  changeItem: (itemId: string, updater: (item: Allclips) => Allclips) => void;
  setSelectedItem: React.Dispatch<React.SetStateAction<string | null>>;
}> = ({items, selectedItem, changeItem, setSelectedItem}) => {
  const itemsToDisplay = React.useMemo(
    () => displaySelectedItemOnTop(items, selectedItem),
    [items, selectedItem],
  );
 
  
  const isDragging = React.useMemo(
    () => items.some((item) => item.properties.isDragging),
    
    [items],
  );

 
  return itemsToDisplay.map((item) => {
    return (
      <Sequence
        key={item.id}
        layout="none"
        from={item.properties.start}
        durationInFrames={item.properties.duration}
      >
       
        <SelectionOutline
          changeItem={changeItem}
          item={item}
          setSelectedItem={setSelectedItem}
          selectedItem={selectedItem}
          isDragging={isDragging}
        />
      </Sequence>
    );
  });
};