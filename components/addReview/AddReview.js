import { useState } from 'react';
import {
	Image,
	StyleSheet,
	View,
	Alert,
	Text,
	TouchableOpacity,
	ImageBackground,
	ScrollView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import { Link } from '@react-navigation/native';

import BookInfo from './BookInfo';
import ReviewButton from './ReviewButton';
import { Gap } from '../utilities/utils';

const styles = StyleSheet.create({
	imageBackground: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
	},
	container: {
		flex: 1,
		paddingBottom: 10,
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
	emptyPreviewImage: {
		width: 'auto',
		height: 250,
		backgroundColor: '#e5e5e5',
		borderRadius: 10,
		marginTop: 20,
		alignItems: 'center',
		justifyContent: 'center',
	},
	emptyPreviewImageText: {
		color: '#7f7f7f',
		fontWeight: 'bold',
		fontSize: 18,
	},
	buttons: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginVertical: 20,
	},
	submitButton: {
		backgroundColor: '#FAC710',
		paddingHorizontal: 20,
		paddingVertical: 15,
		alignItems: 'center',
		borderRadius: 10,
	},
	submitButtonText: {
		color: '#1e1e1e',
		textAlign: 'center',
		fontWeight: 'bold',
	},
});

const AddReview = (props) => {
	const { navigation } = props;

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
		if (!image) {
			Alert.alert(
				'Please take a picture or upload an image to submit a review!',
			);

			return;
		}

		Alert.alert('Submitted successfully!');

		navigation.navigate('Home');
	};

	return (
		<>
			<ScrollView>
				<ImageBackground
					source={require('../../assets/review-page/review-bkg-image-white.png')}
					resizeMode='cover'
					style={styles.imageBackground}
				>
					<View style={styles.container}>
						<Text style={styles.bookName}>Matilda, Roald Dahl</Text>
						<BookInfo text='What did you think of Matilda?' />
						{image ? (
							<Image
								style={styles.previewImage}
								source={{ uri: image }}
							/>
						) : (
							<View style={styles.emptyPreviewImage}>
								<Text style={styles.emptyPreviewImageText}>
									Image preview
								</Text>
							</View>
						)}

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
				</ImageBackground>
			</ScrollView>
		</>
	);
};

export default AddReview;
