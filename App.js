import React from 'react';
import {
	StyleSheet,
	SafeAreaView,
	ImageBackground,
	ScrollView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

// import { Toasts } from '@backpackapp-io/react-native-toast';

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
	scrollView: {},
});

export default function App() {
	return (
		<>
			<StatusBar backgroundColor='fff' style='dark' />
			<SafeAreaView style={styles.container}>
				{/* <Toasts /> */}
				<ScrollView style={styles.scrollView}>
					<ImageBackground
						source={require('./assets/review-page/review-bkg-image-white.png')}
						resizeMode='cover'
						style={styles.imageBackground}
					>
						<Navbar />
						<Review />
					</ImageBackground>
				</ScrollView>
			</SafeAreaView>
		</>
	);
}
