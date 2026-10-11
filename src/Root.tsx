import React from 'react';
import {Composition, Folder} from 'remotion';
import './ds/styles.css';
import {Promo} from './Promo';
import {TypingDotsProbe} from './dev/TypingDotsProbe';

// Format is undecided: three compositions, one scene tree (<Promo>).
export const RemotionRoot: React.FC = () => (
	<>
		<Folder name="Deltalk">
			<Composition
				id="Deltalk-9x16"
				component={Promo}
				durationInFrames={60}
				fps={30}
				width={1080}
				height={1920}
			/>
			<Composition
				id="Deltalk-16x9"
				component={Promo}
				durationInFrames={60}
				fps={30}
				width={1920}
				height={1080}
			/>
			<Composition
				id="Deltalk-1x1"
				component={Promo}
				durationInFrames={60}
				fps={30}
				width={1080}
				height={1080}
			/>
		</Folder>
		<Folder name="Dev">
			<Composition
				id="TypingDotsProbe"
				component={TypingDotsProbe}
				durationInFrames={60}
				fps={30}
				width={540}
				height={540}
				defaultProps={{sync: true}}
			/>
			<Composition
				id="TypingDotsProbe-NoSync"
				component={TypingDotsProbe}
				durationInFrames={60}
				fps={30}
				width={540}
				height={540}
				defaultProps={{sync: false}}
			/>
		</Folder>
	</>
);
