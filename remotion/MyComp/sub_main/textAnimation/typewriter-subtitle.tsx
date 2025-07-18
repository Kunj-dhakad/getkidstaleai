// import React from 'react';
// import {AbsoluteFill, useCurrentFrame} from 'remotion';
// interface TypewriterSubtitleProps {
//   get_text: string;
// }
//  const TypewriterSubtitle:React.FC<TypewriterSubtitleProps> = ({get_text}) => {
// 	const frame = useCurrentFrame();
// 	const text = get_text;
// 	const charsShown = Math.floor(frame / 3);
// 	const textToShow = text.slice(0, charsShown);
// 	const cursorShown =
// 		textToShow.length === text.length ? Math.floor(frame / 10) % 2 === 1 : true;

// 	return (
// 		<AbsoluteFill style={{position:"relative"}}>
// 			<div>
// 				{textToShow}
// 				<span
// 					style={{
// 						opacity: Number(cursorShown),
// 					}}
// 				/>
// 			</div>
// 		</AbsoluteFill>
// 	);
// };

// export default TypewriterSubtitle;

import React from 'react';
import {  useCurrentFrame } from 'remotion';
interface TypewriterSubtitleProps {
	get_text: string;
}

const cursor: React.CSSProperties = {
	height: 80,
	width: 5,
	display: 'inline-block',
	backgroundColor: 'black',
	marginLeft: 4,
	marginTop: -4,
};


const TypewriterSubtitle: React.FC<TypewriterSubtitleProps> = ({ get_text }) => {
	const frame = useCurrentFrame();
	const text = get_text;
	// A new character every 3 frames
	const charsShown = Math.floor(frame / 3);
	const textToShow = text.slice(0, charsShown);
	// Show the cursor while the text is typing, then start blinking
	const cursorShown =
		textToShow.length === text.length ? Math.floor(frame / 10) % 2 === 1 : true;

	return (

			<div
			>
				{textToShow}
				<span
					style={{
						...cursor,
						verticalAlign: 'middle',
						opacity: Number(cursorShown),
					}}
				/>
			</div>

	);
};

export default TypewriterSubtitle;