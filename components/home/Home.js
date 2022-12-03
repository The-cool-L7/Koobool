import React from 'react';
import { Text, StyleSheet, Button, View } from 'react-native';

const styles = StyleSheet.create({
	text: {
		justifyContent: 'center',
		alignItems: 'center',
		color: '#000',
		// marginTop: 10
	},
	view: {
		flex: 1,
	},
});

const Home = () => {
	return (
		<>
			<View style={styles.view}>
				<Text style={styles.text}>Hello</Text>
				<Text style={styles.text}>Hello</Text>
				<Text style={styles.text}>Hello</Text>
				<Text style={styles.text}>Hello</Text>
				<Text style={styles.text}>Hello</Text>
				<Text style={styles.text}>Hello</Text>
				<Text style={styles.text}>Hello</Text>
				<Button title='hello' />
			</View>
		</>
	);
};

export default Home;
