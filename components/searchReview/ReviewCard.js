import { Image, StyleSheet, Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import { Gap } from '../utilities/utils';

const styles = StyleSheet.create({
	container: {
		padding: 25,
		borderWidth: 0.5,
		backgroundColor: '#fff',
		width: '100%',
		borderRadius: 25,
		marginTop: 20,
	},
	bookCoverImage: {
		width: 120,
		height: 120,
	},
	drawingImage: {
		width: '100%',
		height: 140,
	},
	top: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	bottom: { flexDirection: 'row', marginTop: 20 },
	topLeft: {
		flexDirection: 'row',
	},
	username: {
		fontWeight: 'bold',
		fontSize: 23,
	},
});

const ReviewCard = (props) => {
	const { username, bookCoverSrc, drawingSrc } = props;

	return (
		<>
			<View style={styles.container}>
				<View style={styles.top}>
					<View style={styles.topLeft}>
						<FontAwesome name='user-circle-o' size={24} color='black' />
						<Gap size={15} />
						<Text style={styles.username}>{username}</Text>
					</View>
					<Image
						source={{
							uri: bookCoverSrc,
						}}
						resizeMode='cover'
						style={styles.bookCoverImage}
					/>
				</View>
				<View style={styles.bottom}>
					<Image
						source={{ uri: drawingSrc }}
						resizeMode='cover'
						style={styles.drawingImage}
					/>
				</View>
			</View>
		</>
	);
};

export default ReviewCard;
