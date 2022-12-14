import { useState, useEffect, useCallback } from 'react';
import {
	Text,
	StyleSheet,
	TextInput,
	ScrollView,
	ImageBackground,
	View,
	RefreshControl,
	Alert,
} from 'react-native';

import { FontAwesome } from '@expo/vector-icons';

import ReviewCard from './ReviewCard';
import bookReviews from '../../dummy-data/bookReviews.json';
import { Gap } from '../utilities/utils';
import { supabase } from '../../lib/supabase';

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
		textAlign: 'center',
	},
	reviewCards: {
		alignItems: 'center',
		width: '100%',
	},
});

const SearchReview = () => {
	const [searchText, onChangeSearchText] = useState('');
	const [allBooks, setAllBooks] = useState([]);
	const [allBookReviews, setAllBookReviews] = useState([]);
	const [filteredBookReviews, setFilteredBookReviews] = useState([]);
	const [refreshing, setRefreshing] = useState(false);

	const getAllBookReviews = async () => {
		let { data, error } = await supabase.from('Reviews').select('*');

		setAllBookReviews(data);
	};

	const getAllBooks = async () => {
		let { data, error } = await supabase.from('Books').select('*');

		setAllBooks(data);
	};

	const getBookIdsByName = async (name) => {
		// const filtered = allBooks.filter((book) => {
		// 	const bookName = book.book_name.toLowerCase();

		// 	return bookName.includes(name.toLowerCase());
		// });

		// return filtered;

		const { data, error } = await supabase
			.from('Books')
			.select('id')
			.ilike('book_name', `%${name}%`);

		if (error) throw error;

		console.log(data);
		return data;
	};

	const filterBookReviews = async (bookIds) => {
		const ids = [];

		bookIds.forEach((id) => {
			ids.push(id.id);
		});

		console.log(ids);

		const { data, error } = await supabase
			.from('Reviews')
			.select('*')
			.in('book_id', ids);

		if (error) throw error;

		return data;
	};

	const onSearchInputChange = async () => {
		try {
			if (searchText.length !== 0) {
				const filteredBookIds = await getBookIdsByName(searchText);

				const filteredReviews = await filterBookReviews(filteredBookIds);
				setFilteredBookReviews(filteredReviews);
			}
		} catch (err) {
			Alert.alert('There was an error while searching!');
		}
	};

	const wait = (timeout) => {
		return new Promise((resolve) => setTimeout(resolve, timeout));
	};

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		wait(1000).then(() => setRefreshing(false));
	}, []);

	useEffect(() => {
		getAllBooks();
		getAllBookReviews();
	}, []);

	return (
		<>
			<ScrollView
				style={{ flex: 1 }}
				contentContainerStyle={{ flexGrow: 1 }}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}
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
						<Text style={styles.recentReviewsText}>Recent reviews</Text>
						<View style={styles.reviewCards}>
							{searchText.length === 0 &&
								bookReviews.reviews.map((book, index) => (
									<ReviewCard
										username={book.username}
										bookName={book.bookName}
										bookCoverSrc={book.book_image}
										drawingSrc={book.review_image}
										key={index}
									/>
								))}

							{searchText.length !== 0 &&
								filteredBookReviews.length > 0 &&
								filteredBookReviews.map((book, index) => (
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
