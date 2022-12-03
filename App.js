import React from 'react';
import {
	StyleSheet,
	SafeAreaView,
	ImageBackground,
	ScrollView,
	Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
// import Toast from 'react-native-toast-message';
// import { ToastProvider } from 'react-native-toast-notifications';

import Navbar from './components/navbar/Navbar';
import Review from './components/review/Review';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: StatusBar.currentHeight,
		flexDirection: 'column',
		paddingVertical: 10,
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
			{Platform.OS === 'ios' && (
				<StatusBar backgroundColor='fff' style='dark' />
			)}
			<SafeAreaView style={styles.container}>
				{/* <Toast /> */}
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
