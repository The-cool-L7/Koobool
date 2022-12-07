import { Image, StyleSheet, Text, View } from 'react-native';

import { Gap } from '../utilities/utils';

const styles = StyleSheet.create({
	bookView: {
		alignItems: 'center',
		marginTop: 10,
	},
	bookImage: { width: 100, height: 190 },
	bookName: {
		fontWeight: '600',
		fontSize: 20,
		marginTop: 10,
	},
});

const Book = (props) => {
	const { bookImageUrl, bookName } = props;

	return (
		<>
			<View style={styles.bookView}>
				<Image
					style={styles.bookImage}
					source={{
						uri: bookImageUrl,
					}}
				/>

				{/* <Text style={styles.bookName}>{bookName}</Text> */}
			</View>
			<Gap size={10} />
		</>
	);
};

export default Book;
