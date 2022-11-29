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
						source={require('../../assets/review-page/dummy-book-cover.png')}
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
