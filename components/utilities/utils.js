import { View, SafeAreaView, StyleSheet, StatusBar } from 'react-native';

export const Gap = ({ size, direction = 'horizontal' }) => {
	return (
		<View
			style={{ [direction === 'horizontal' ? 'width' : 'height']: size }}
		/>
	);
};

export const Layout = ({ children }) => {
	const styles = StyleSheet.create({
		container: {
			flex: 1,
			flexGrow: 1,
			marginTop: StatusBar.currentHeight,
		},
	});

	return (
		<>
			<SafeAreaView style={styles.container}>{children}</SafeAreaView>
		</>
	);
};
