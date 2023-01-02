import { useState, useCallback, useEffect } from 'react';
import {
	StyleSheet,
	Text,
	Image,
	ImageBackground,
	View,
	ScrollView,
	RefreshControl,
} from 'react-native';

import MyReviewCard from './MyReviewCard';
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
		flexDirection: 'column',
	},
	topTexts: {
		paddingVertical: 20,
	},
	username: {
		fontWeight: 'bold',
		fontSize: 30,
	},
	reviewTextOne: {
		fontWeight: 'bold',
		fontSize: 22,
		marginTop: 10,
	},
	reviewTextTwo: {
		fontSize: 15,
	},
	myReviews: {
		marginTop: 10,
	},
	noReviewsText: {
		fontWeight: 'bold',
		fontSize: 20,
		textAlign: 'center',
	},
});

const MyReviews = (props) => {
	const { username } = props;

	const [refreshing, setRefreshing] = useState(false);
	const [allBookReviews, setAllBookReviews] = useState([]);

	const getUserReviewedIdByName = async (name) => {
		try {
			const { data, error } = await supabase
				.from('Children')
				.select('id')
				.eq('name', name);

			if (error) throw error;

			return data[0].id;
		} catch (err) {
			console.log(err);
		}
	};

	const getBookAuthorNameById = async (bookId) => {
		try {
			const { data, error } = await supabase
				.from('Books')
				.select('book_author')
				.eq('id', bookId);

			if (error) throw error;

			return data[0].book_author;
		} catch (err) {
			console.log(err);
		}
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

	const getAllReviews = async (reviewedById) => {
		try {
			const { data, error } = await supabase
				.from('Reviews')
				.select('*')
				.eq('reviewed_by', reviewedById);

			const final = [];

			for (const r of data) {
				final.push({
					bookName: await getBookNameAndImageById(r.book_id, 'BOOK_NAME'),
					bookCoverSrc: await getBookNameAndImageById(
						r.book_id,
						'BOOK_IMAGE',
					),
					drawingSrc: r.review_image,
					authorName: await getBookAuthorNameById(r.book_id),
				});
			}

			if (error) throw error;

			setAllBookReviews(final);
		} catch (err) {
			console.log(err);
		}
	};

	const wait = (timeout) => {
		return new Promise((resolve) => setTimeout(resolve, timeout));
	};

	const onRefresh = useCallback(() => {
		setRefreshing(true);

		console.log('my reviews page refreshing');

		wait(1000).then(() => setRefreshing(false));
	}, []);

	useEffect(() => {
		const getReviews = async () => {
			getAllReviews(await getUserReviewedIdByName(username));
		};

		getReviews();
	});

	return (
		<>
			<ImageBackground
				source={require('../../assets/my-reviews/bkg-image.png')}
				resizeMode='cover'
				style={styles.imageBackground}
			>
				<ScrollView
					style={{ flex: 1 }}
					contentContainerStyle={{ flexGrow: 1 }}
					refreshControl={
						<RefreshControl
							refreshing={refreshing}
							onRefresh={onRefresh}
						/>
					}
				>
					<View style={styles.container}>
						<View style={styles.topTexts}>
							<Text style={styles.username}>{username}</Text>
							<Text style={styles.reviewTextOne}>
								Here are your reviews!
							</Text>
							<Text style={styles.reviewTextTwo}>
								You have reviewed {allBookReviews.length} books!
							</Text>
						</View>
						<View style={styles.myReviews}>
							{allBookReviews.length !== 0 &&
								allBookReviews.map((r, index) => (
									<MyReviewCard
										key={index}
										bookName={r.bookName}
										authorName={r.authorName}
										bookCoverSrc={r.bookCoverSrc}
										drawingSrc={r.drawingSrc}
									/>
								))}
							{allBookReviews.length === 0 && (
								<Text style={styles.noReviewsText}>
									You haven't added any reviews yet!
								</Text>
							)}
						</View>
					</View>
				</ScrollView>
			</ImageBackground>
		</>
	);
};

export default MyReviews;
