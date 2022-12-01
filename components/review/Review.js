import { useState } from 'react';

import { Image, StyleSheet, View, Alert, Text, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
// import toast from 'react-hot-toast';

import BookInfo from './BookInfo';
import ReviewButton from './ReviewButton';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 40,
	},
	bookName: {
		fontSize: 28,
		fontWeight: 'bold',
		marginBottom: 5,
	},
	previewImage: {
		width: 'auto',
		height: 250,
		backgroundColor: 'darkgray',
		borderRadius: 10,
		marginTop: 20,
	},
	buttons: {
		flexDirection: 'row',
		justifyContent: 'center',
	},
	submitButton: {},
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
				<Text style={styles.bookName}>Matilda, Roald Dahl</Text>
				<BookInfo text='What did you think of Matilda?' />
				<Image style={styles.previewImage} source={{ uri: image }} />
				<View style={styles.buttons}>
					<ReviewButton
						onPress={onCameraButtonPress}
						buttonText='Camera'
					/>
					<ReviewButton
						onPress={onGalleryButtonPress}
						buttonText='Gallery'
					/>
				</View>
				<Button style={styles.submitButton} title='Submit Review' />
			</View>
		</>
	);
};

export default Review;
