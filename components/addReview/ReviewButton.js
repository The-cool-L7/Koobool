import {
	Pressable,
	StyleSheet,
	TouchableOpacity,
	Text,
	View,
	Image,
} from 'react-native';

const styles = StyleSheet.create({
	button: {
		alignItems: 'center',
		width: 'auto',
	},
	text: {
		fontSize: 15,
		marginTop: 10,
		textAlign: 'center',
		alignItems: 'center',
		justifyContent: 'center',

		// maxWidth: 72,
	},
	iconView: {
		backgroundColor: '#fff',
		borderRadius: 10,
		padding: 10,
		borderColor: '#000',
		borderWidth: 3,
		alignItems: 'center',
	},
	icon: {
		width: 40,
		height: 40,
	},
});

const ReviewButton = (props) => {
	const { buttonText, onPress } = props;

	return (
		<>
			<Pressable style={styles.button}>
				<TouchableOpacity onPress={onPress}>
					<View style={styles.iconView}>
						{buttonText === 'Camera' ? (
							<Image
								style={styles.icon}
								source={require('../../assets/review-page/camera.png')}
							/>
						) : (
							<Image
								style={styles.icon}
								source={require('../../assets/review-page/gallery.png')}
							/>
						)}
					</View>
					<Text style={styles.text}>{buttonText}</Text>
				</TouchableOpacity>
			</Pressable>
		</>
	);
};

export default ReviewButton;
