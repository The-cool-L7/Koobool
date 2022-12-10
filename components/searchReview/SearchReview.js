import { useState, useEffect } from 'react';
import {
	Text,
	StyleSheet,
	TextInput,
	ScrollView,
	ImageBackground,
	View,
} from 'react-native';

import { FontAwesome } from '@expo/vector-icons';

import ReviewCard from './ReviewCard';
import bookReviews from '../../dummy-data/bookReviews.json';
import { Gap } from '../utilities/utils';

const styles = StyleSheet.create({
	scrollView: {
		flex: 1,
	},
	container: {
		flex: 1,
		flexGrow: 1,
		paddingBottom: 10,
		width: '100%',
		paddingHorizontal: 10,
	},
	imageBackground: {
		flex: 1,
		flexGrow: 1,
		alignItems: 'center',
	},
	searchInputView: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	searchInput: {
		height: 40,
		borderWidth: 1.5,
		width: '85%',
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
	const [searchText, onChangeSearchText] = useState('');
	const [filteredBookList, setFilteredBookList] = useState([]);

	const onSearchInputChange = () => {
		if (searchText.length !== 0) {
			const filtered = bookReviews.reviews.filter((b) =>
				b.bookName.includes(searchText),
			);

			setFilteredBookList(() => filtered);
		}
	};

	return (
		<>
			<ScrollView
				style={{ flex: 1 }}
				contentContainerStyle={{ flexGrow: 1 }}
			>
				<ImageBackground
					source={require('../../assets/search-page/search-bkg-image-white.png')}
					resizeMode='cover'
					style={styles.imageBackground}
				>
					<View style={styles.container}>
						<View style={styles.searchInputView}>
							<FontAwesome name='search' size={24} color='black' />
							<Gap size={15} />
							<TextInput
								style={styles.searchInput}
								onChangeText={onChangeSearchText}
								onChange={onSearchInputChange}
								value={searchText}
								placeholder='Search book...'
							/>
						</View>
						<Text style={styles.recentReviewsText}>Recent reviews:</Text>
						<View style={styles.reviewCards}>
							{searchText.length === 0 &&
								bookReviews.reviews.map((book, index) => (
									<ReviewCard
										username={book.username}
										bookName={book.bookName}
										bookCoverSrc={book.bookCoverUrl}
										drawingSrc={book.drawingSrc}
										key={index}
									/>
								))}

							{searchText.length !== 0 &&
								filteredBookList.map((book, index) => (
									<ReviewCard
										username={book.username}
										bookName={book.bookName}
										bookCoverSrc={book.bookCoverUrl}
										drawingSrc={book.drawingSrc}
										key={index}
									/>
								))}
						</View>
					</View>
				</ImageBackground>
			</ScrollView>
		</>
	);
};

export default SearchReview;
