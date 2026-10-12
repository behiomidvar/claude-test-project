import React from 'react';
import {AbsoluteFill, Sequence, useVideoConfig} from 'remotion';
import {FontGate} from './core/FontGate';
import {FrameSync} from './core/FrameSync';
import {LogoBudget} from './core/InlineLogo';
import {ThemeScope} from './core/ThemeScope';
import {Scene1, SCENE1_TAIL_SECONDS} from './scenes/Scene1';
import {Scene2} from './scenes/Scene2';

/**
 * The one scene tree shared by every format. Layout comes from useLayout(),
 * never from the composition id.
 *
 * Every scene gets its own FrameSync (inside ThemeScope) so DS CSS animations
 * follow the scene's local frame and transitions are off. Scenes may overlap
 * across a cut so the three-dots motif stays one element.
 *
 * No premountFor on sequences holding an <InlineLogo>: premounting mounts the
 * next scene's logo alongside the current one, which LogoBudget rejects.
 */
export const Promo: React.FC = () => {
	const {fps} = useVideoConfig();

	return (
		<FontGate>
			<LogoBudget>
				<AbsoluteFill dir="rtl" lang="fa">
					<ThemeScope theme="light">
						{/* Scene 1 stays mounted 1.5 s into Scene 2: its question folds
						    out and its dots carry across the cut as the same element. */}
						<Sequence
							from={0}
							durationInFrames={(4 + SCENE1_TAIL_SECONDS) * fps}
							name="Scene 1 / question"
						>
							<FrameSync>
								<Scene1 />
							</FrameSync>
						</Sequence>
						<Sequence from={4 * fps} durationInFrames={5 * fps} name="Scene 2 / exchange">
							<FrameSync>
								<Scene2 />
							</FrameSync>
						</Sequence>
					</ThemeScope>
				</AbsoluteFill>
			</LogoBudget>
		</FontGate>
	);
};
