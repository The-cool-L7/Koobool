import { View, Text, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	bookImageView: {
		maxWidth: '50%',
	},
	bookImage: {
		width: 150,
		height: 200,
	},
	bookText: {
		fontSize: 21,
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
				<Text style={styles.bookText}>{text}</Text>
			</View>
		</>
	);
};

export default BookInfo;
