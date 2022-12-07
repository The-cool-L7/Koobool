import { View, Text, Image, StyleSheet } from 'react-native';

import { Gap } from '../utilities/utils';

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
	},
	bookImageView: {
		maxWidth: '50%',
	},
	bookImage: {
		width: 150,
		height: 200,
	},
	bookText: {
		fontSize: 25,
		maxWidth: '50%',
		// fontFamily: 'Robot',
		fontWeight: 'bold',
	},
});

const BookInfo = (props) => {
	const { text } = props;

	return (
		<>
			<View style={styles.container}>
				<View style={styles.bookImageView}>
					<Image
						source={{
							uri: 'https://user-images.githubusercontent.com/52258261/205751224-e47d8809-6f92-4122-bc4a-037389fff5eb.png',
						}}
						style={styles.bookImage}
					/>
				</View>
				<Gap size={20} />
				<Text style={styles.bookText}>{text}</Text>
			</View>
		</>
	);
};

export default BookInfo;
