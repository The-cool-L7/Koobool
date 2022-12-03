import {
	View,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	StatusBar,
} from 'react-native';

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
			marginTop: StatusBar.currentHeight,
			flexDirection: 'column',
			// paddingVertical: 10,
			flexGrow: 1,
		},

		scrollView: { flex: 1, flexGrow: 1 },
	});

	return (
		<>
			<SafeAreaView style={styles.container}>
				{/* <ScrollView style={styles.scrollView}> */}
				{children}
				{/* </ScrollView> */}
			</SafeAreaView>
		</>
	);
};
