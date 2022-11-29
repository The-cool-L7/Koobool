import { View } from 'react-native';

export const Gap = ({ size, direction = 'horizontal' }) => {
	return (
		<View
			style={{ [direction === 'horizontal' ? 'width' : 'height']: size }}
		/>
	);
};
