import React from 'react';
import {AbsoluteFill, Series, useVideoConfig} from 'remotion';
import {FontGate} from './core/FontGate';
import {FrameSync} from './core/FrameSync';
import {LogoBudget} from './core/InlineLogo';
import {ThemeScope} from './core/ThemeScope';
import {TestScene} from './scenes/TestScene';

/**
 * The one scene tree shared by every format. Layout comes from useLayout(),
 * never from the composition id.
 *
 * Every scene goes inside ThemeScope > FrameSync so DS CSS animations follow
 * the frame and transitions are off.
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
					<Series>
						<Series.Sequence durationInFrames={1 * fps} name="Test / light">
							<ThemeScope theme="light">
								<FrameSync>
									<TestScene />
								</FrameSync>
							</ThemeScope>
						</Series.Sequence>
						<Series.Sequence durationInFrames={1 * fps} name="Test / dark">
							<ThemeScope theme="dark">
								<FrameSync>
									<TestScene />
								</FrameSync>
							</ThemeScope>
						</Series.Sequence>
					</Series>
				</AbsoluteFill>
			</LogoBudget>
		</FontGate>
	);
};
