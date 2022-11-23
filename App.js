import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';

import Review from './components/review/Review';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default function App() {
	return (
		<SafeAreaView style={styles.container}>
			<Review />
		</SafeAreaView>
	);
}
