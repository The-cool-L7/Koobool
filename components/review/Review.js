import { useState } from 'react';

import { Image, StyleSheet, View, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';

import BookInfo from './BookInfo';
import ReviewButton from './ReviewButton';
import DrawingCanvas from './DrawingCanvas';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		paddingLeft: 20,
		paddingRight: 20,
	},
	image: {
		width: 350,
		height: 350,
		backgroundColor: 'darkgray',
		borderRadius: 40,
	},
	buttons: { flexDirection: 'row', justifyContent: 'center' },
});

const Review = () => {
	const [image, setImage] = useState(null);

	const onGalleryButtonPress = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			aspect: [3, 3],
			allowsEditing: true,
		});

		if (!result.canceled) setImage(result.assets[0].uri);
	};

	const onCameraButtonPress = async () => {
		const { status } = await Camera.requestCameraPermissionsAsync();

		if (status === 'granted') {
			const result = await ImagePicker.launchCameraAsync({
				allowsEditing: false,
			});

			setImage(result.assets[0].uri);
		} else {
			Alert.alert(
				'Camera permissions were not granted',
				'Please grant permission to use the camera!',
			);
		}
	};

	return (
		<>
			<View style={styles.container}>
				{/* <Image style={styles.image} source={{ uri: image }} /> */}
				<BookInfo text='What did you think of Matilda?' />
				<DrawingCanvas />
				<View style={styles.buttons}>
					<ReviewButton
						onPress={onGalleryButtonPress}
						buttonText='Gallery'
					/>
					<ReviewButton
						onPress={onCameraButtonPress}
						buttonText='Camera'
					/>
				</View>
			</View>
		</>
	);
};

export default Review;
