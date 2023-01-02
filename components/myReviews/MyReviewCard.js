import { View, StyleSheet, Text, Image } from 'react-native';

const styles = StyleSheet.create({
	container: {
		// padding: 25,
		borderWidth: 4,
		backgroundColor: '#fff',
		width: '100%',
		// maxWidth: '100%',
		// borderRadius: 25,
		marginTop: 20,

		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	left: {
		justifyContent: 'space-between',
		paddingVertical: 10,
		paddingHorizontal: 18,
		paddingRight: 0,
		alignItems: 'flex-start',
	},
	leftTop: {
		maxWidth: 150,
	},
	leftBottom: {
		alignItems: 'flex-start',
	},
	bookName: {
		fontSize: 18,
		fontWeight: 'bold',
	},
	author: {
		fontSize: 18,
		marginTop: 5,
	},
	right: {
		borderLeftColor: '#000',
		borderLeftWidth: '4',
	},
	bookImage: {
		width: 130,
		height: 230,
	},
	drawingImage: {
		marginTop: 10,
		width: 160,
		height: 125,
	},
});

const MyReviewCard = (props) => {
	const { bookCoverSrc, drawingSrc, bookName, authorName } = props;

	//
	return (
		<>
			<View style={styles.container}>
				<View style={styles.left}>
					<View style={styles.leftTop}>
						<Text style={styles.bookName}>{bookName}</Text>
						<Text style={styles.author}>{authorName}</Text>
					</View>
					<View style={styles.leftBottom}>
						<Image
							resizeMode='cover'
							style={styles.drawingImage}
							source={{ uri: drawingSrc }}
						/>
					</View>
				</View>
				<View style={styles.right}>
					<Image style={styles.bookImage} source={{ uri: bookCoverSrc }} />
				</View>
			</View>
		</>
	);
};

export default MyReviewCard;
