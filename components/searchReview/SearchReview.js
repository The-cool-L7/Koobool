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
		height: 50,
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

const SearchReview = (props) => {
	const { navigation } = props;

	const [allBookReviews, setAllBookReviews] = useState([]);
	const [filteredBookReviews, setFilteredBookReviews] = useState([]);
	const [refreshing, setRefreshing] = useState(false);

	const getBookIdsByName = async (name) => {
		const { data, error } = await supabase
			.from('Books')
			.select('id')
			.ilike('book_name', `%${name}%`);
		// .textSearch('book_name', name);

		if (error) throw error;

		return data;
	};

	const filterBookReviews = async (bookIds) => {
		const ids = [];

		bookIds.forEach((id) => {
			ids.push(id.id);
		});

		const { data, error } = await supabase
			.from('Reviews')
			.select('*')
			.in('book_id', ids);

		if (error) throw error;

		return data;
	};

	const getBookNameAndImageById = async (id, returnData) => {
		const { data, error } = await supabase
			.from('Books')
			.select('book_name, book_image, id')
			.eq('id', id);

		if (error) throw error;

		if (returnData === 'BOOK_NAME') {
			return data[0].book_name;
		} else if (returnData === 'BOOK_IMAGE') {
			return data[0].book_image;
		}
	};

	const getChildNameById = async (id) => {
		const { data, error } = await supabase
			.from('Children')
			.select('name, id')
			.eq('id', id);

		if (error) throw error;

		return data[0].name;
	};

	const onSearchInputChange = async (text) => {
		console.log(text);
		try {
			if (text.length !== 0) {
				console.log('hello');
				const filteredBookIds = await getBookIdsByName(text);

				const filteredReviews = await filterBookReviews(filteredBookIds);

				const final = [];

				for (const r of filteredReviews) {
					final.push({
						username: await getChildNameById(r.reviewed_by),
						bookName: await getBookNameAndImageById(
							r.book_id,
							'BOOK_NAME',
						),
						bookCoverSrc: await getBookNameAndImageById(
							r.book_id,
							'BOOK_IMAGE',
						),
						drawingSrc: r.review_image,
					});
				}

				setFilteredBookReviews(final);
			} else {
				setFilteredBookReviews([]);
			}
		} catch (err) {
			console.log(err);
			Alert.alert('There was an error while searching!');
		}
	};

	const wait = (timeout) => {
		return new Promise((resolve) => setTimeout(resolve, timeout));
	};

	const onRefresh = useCallback(() => {
		setRefreshing(true);

		getAllBookReviews();

		wait(1000).then(() => setRefreshing(false));
	}, []);

	const getAllBookReviews = async () => {
		try {
			let { data, error } = await supabase.from('Reviews').select('*');

			const final = [];

			for (const r of data) {
				final.push({
					username: await getChildNameById(r.reviewed_by),
					bookName: await getBookNameAndImageById(r.book_id, 'BOOK_NAME'),
					bookCoverSrc: await getBookNameAndImageById(
						r.book_id,
						'BOOK_IMAGE',
					),
					drawingSrc: r.review_image,
				});
			}

			if (error) throw error;

			setAllBookReviews(final);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
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
								onChangeText={onSearchInputChange}
								placeholder='Search book...'
							/>
						</View>
						<Text style={styles.recentReviewsText}>Recent reviews</Text>
						<View style={styles.reviewCards}>
							{filteredBookReviews.length === 0 &&
								allBookReviews.length > 0 &&
								allBookReviews.map((r, index) => (
									<ReviewCard
										username={r.username}
										bookName={r.bookName}
										bookCoverSrc={r.bookCoverSrc}
										drawingSrc={r.drawingSrc}
										key={index}
									/>
								))}

							{filteredBookReviews.length !== 0 &&
								filteredBookReviews.map((r, index) => (
									<ReviewCard
										username={r.username}
										bookName={r.bookName}
										bookCoverSrc={r.bookCoverSrc}
										drawingSrc={r.drawingSrc}
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
