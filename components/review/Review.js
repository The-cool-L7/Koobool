import { useState } from 'react';

import {
	Image,
	StyleSheet,
	View,
	Alert,
	Text,
	TouchableOpacity,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';

import BookInfo from './BookInfo';
import ReviewButton from './ReviewButton';
import { Gap } from '../utilities/utils';

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
		marginVertical: 20,
	},
	submitButton: {
		backgroundColor: '#1e1e1e',
		paddingHorizontal: 20,
		paddingVertical: 15,
		alignItems: 'center',
		borderRadius: 10,
	},
	submitButtonText: {
		color: '#fff',
		textAlign: 'center',
	},
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

	const onSubmitButtonPress = () => {
		Alert.alert('Submitted successfully!');
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
					<Gap size={70} />
					<ReviewButton
						onPress={onGalleryButtonPress}
						buttonText='Gallery'
					/>
				</View>

				<TouchableOpacity
					activeOpacity={0.8}
					style={styles.submitButton}
					onPress={onSubmitButtonPress}
				>
					<Text style={styles.submitButtonText}>Submit</Text>
				</TouchableOpacity>
			</View>
		</>
	);
};

export default Review;
