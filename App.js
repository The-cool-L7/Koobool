import React from 'react';
import { StyleSheet, SafeAreaView, ImageBackground, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import Navbar from './components/navbar/Navbar';
import Review from './components/review/Review';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: StatusBar.currentHeight,
		flexDirection: 'column',
	},
	imageBackground: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
	},
});

export default function App() {
	return (
		<SafeAreaView style={styles.container}>
			<StatusBar backgroundColor='fff' style='dark' />
			<ImageBackground
				source={require('./assets/navbar/review-bkg-image-white.png')}
				resizeMode='cover'
				style={styles.imageBackground}
			>
				<Navbar />
				<Review />
			</ImageBackground>
		</SafeAreaView>
	);
}
