import React from 'react';
import {AbsoluteFill, Series, useVideoConfig} from 'remotion';
import {FontGate} from '../core/FontGate';
import {FrameSync} from '../core/FrameSync';
import {LogoBudget} from '../core/InlineLogo';
import {ThemeScope} from '../core/ThemeScope';
import {TestScene} from '../scenes/TestScene';

/** Setup check (npm run render:test): TestScene in light, then dark. */
export const TestPromo: React.FC = () => {
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
