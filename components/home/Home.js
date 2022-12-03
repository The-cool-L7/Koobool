import React from 'react';
import { Text, StyleSheet, Button, View } from 'react-native';

const styles = StyleSheet.create({
	text: {
		justifyContent: 'center',
		alignItems: 'center',
		textAlign: 'center',
		fontWeight: 'bold',
		marginTop: 'auto',
		marginBottom: 'auto',
		color: '#000',
	},
	view: {
		flex: 1,
		flexGrow: 1,
		width: '100%',
	},
});

const Home = () => {
	return (
		<>
			<View style={styles.view}>
				<Text style={styles.text}>Home</Text>
			</View>
		</>
	);
};

export default Home;
