import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

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
	const { bookImageUrl, bookName, onPress } = props;

	return (
		<>
			<TouchableOpacity style={styles.bookView} onPress={onPress}>
				<Image
					style={styles.bookImage}
					source={{
						uri: bookImageUrl,
					}}
				/>

				{/* <Text style={styles.bookName}>{bookName}</Text> */}
			</TouchableOpacity>
			<Gap size={10} />
		</>
	);
};

export default Book;
