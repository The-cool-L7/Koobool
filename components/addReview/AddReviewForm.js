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

import { decode } from 'base64-arraybuffer';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import uuid from 'react-native-uuid';

import BookInfo from './BookInfo';
import ReviewButton from './ReviewButton';
import { Gap } from '../utilities/utils';
import { supabase } from '../../lib/supabase';

const styles = StyleSheet.create({
	imageBackground: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
	},
	container: {
		flex: 1,
		paddingBottom: 10,
		paddingTop: 20,
		paddingHorizontal: 10,
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

const AddReviewForm = (props) => {
	const { navigation, route } = props;

	const [imageBase64, setImageBase64] = useState(null);
	const [image, setImage] = useState(null);

	const { bookName, bookCoverUrl } = route.params;

	const onGalleryButtonPress = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			aspect: [3, 3],
			allowsEditing: true,
			base64: true,
		});

		if (!result.canceled) {
			setImageBase64(result.assets[0].base64);
			setImage(result.assets[0].uri);
		} else {
			Alert.alert('Error', 'Please try again!');

			return;
		}
	};

	const onCameraButtonPress = async () => {
		const { status } = await Camera.requestCameraPermissionsAsync();

		if (status === 'granted') {
			const result = await ImagePicker.launchCameraAsync({
				allowsEditing: true,
				base64: true,
			});

			if (result.canceled || !result.assets[0].base64) {
				Alert.alert('Error', 'Please try again!');

				return;
			}

			setImageBase64(result.assets[0].base64);
			setImage(result.assets[0].uri);
		} else {
			Alert.alert(
				'Camera permissions were not granted',
				'Please grant permission to use the camera!',
			);
		}
	};

	const getBookId = async (bookName) => {
		const { data, error } = await supabase
			.from('Books')
			.select('id')
			.eq('book_name', bookName);

		return data[0]['id'];
	};

	const uploadReviewImage = async () => {
		try {
			const extension = image.split('.').pop();

			const { data, error } = await supabase.storage
				.from('reviewimages')
				.upload(`review-${uuid.v4()}.${extension}`, decode(imageBase64), {
					// cacheControl: '3600',
					upsert: true,
				});

			if (error) throw error;

			return data.path;
		} catch (err) {
			Alert.alert('An error occured!');
		}
	};

	const getReviewImageUrl = async (path) => {
		try {
			const { data } = supabase.storage
				.from('reviewimages')
				.getPublicUrl(path);

			return data;
		} catch (err) {
			Alert.alert('An error occured!');
		}
	};

	const onSubmitButtonPress = async () => {
		try {
			if (!image) {
				Alert.alert(
					'Please take a picture or upload an image to submit a review!',
				);

				return;
			}

			const bookId = await getBookId(bookName);
			const reviewImagePath = await uploadReviewImage();
			const reviewImageUrl = await getReviewImageUrl(reviewImagePath);

			// upload book review
			const { data, error } = await supabase.from('Reviews').insert([
				{
					book_id: bookId,
					reviewed_by: 2, //hardcoded for now
					review_image: reviewImageUrl,
				},
			]);

			setImageBase64('');
			setImage('');

			if (error) throw error;

			Alert.alert('Submitted successfully!');

			navigation.goBack();
		} catch (err) {
			console.log(err);
			Alert.alert('An error occured!');
		}
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
						<BookInfo
							text={`What did you think of the book: ${bookName}`}
							bookCoverUrl={bookCoverUrl}
						/>
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
								buttonText='My photos'
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

export default AddReviewForm;
