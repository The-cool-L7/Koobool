import { useState } from 'react';
import {
	Text,
	StyleSheet,
	TextInput,
	ScrollView,
	ImageBackground,
	Image,
	Alert,
	View,
} from 'react-native';

import ReviewCard from './ReviewCard';

const styles = StyleSheet.create({
	scrollView: {},
	container: {
		flex: 1,
		flexGrow: 1,
		paddingBottom: 10,
		width: '100%',
		paddingHorizontal: 30,
	},
	imageBackground: {
		flex: 1,
		flexGrow: 1,
		alignItems: 'center',
	},
	searchInput: {
		height: 40,
		borderWidth: 0.5,
		width: '100%',
		paddingHorizontal: 15,
		paddingVertical: 13,
		backgroundColor: '#fff',
		marginVertical: 20,
		alignSelf: 'center',
		borderRadius: 10,
	},
	recentReviewsText: {
		marginVertical: 20,
		marginBottom: 5,
		fontWeight: 'bold',
		fontSize: 22,
	},
	reviewCards: {
		alignItems: 'center',
		width: '100%',
	},
});

const SearchReview = () => {
	const [searchText, onChangeSearchText] = useState();

	return (
		<>
			<ScrollView contentContainerStyle={styles.scrollView}>
				<ImageBackground
					source={require('../../assets/search-page/search-bkg-image-white.png')}
					resizeMode='cover'
					style={styles.imageBackground}
				>
					<View style={styles.container}>
						<TextInput
							style={styles.searchInput}
							onChangeText={onChangeSearchText}
							value={searchText}
							placeholder='Search'
						/>
						<Text style={styles.recentReviewsText}>Recent reviews:</Text>
						<View style={styles.reviewCards}>
							<ReviewCard
								username='Alex'
								bookCoverSrc='../../assets/dummy-images/cover-1.png'
								drawingSrc='../../assets/dummy-images/drawing-1.png'
							/>
							<ReviewCard
								username='John'
								bookCoverSrc='../../assets/dummy-images/cover-1.png'
								drawingSrc='../../assets/dummy-images/drawing-1.png'
							/>
							<ReviewCard
								username='Hamid'
								bookCoverSrc='../../assets/dummy-images/cover-1.png'
								drawingSrc='../../assets/dummy-images/drawing-1.png'
							/>
						</View>
					</View>
				</ImageBackground>
			</ScrollView>
		</>
	);
};

export default SearchReview;
