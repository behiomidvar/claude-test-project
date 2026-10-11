import React from 'react';
import {Composition} from 'remotion';
import {FixtureDots} from './FixtureDots';

export const HarnessRoot: React.FC = () => (
	<>
		<Composition
			id="FixtureDots"
			component={FixtureDots}
			durationInFrames={60}
			fps={30}
			width={540}
			height={540}
			defaultProps={{sync: true}}
		/>
		<Composition
			id="FixtureDots-NoSync"
			component={FixtureDots}
			durationInFrames={60}
			fps={30}
			width={540}
			height={540}
			defaultProps={{sync: false}}
		/>
	</>
);
