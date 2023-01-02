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
				// source={{
				// 	uri: 'https://raw.githubusercontent.com/The-cool-L7/Koobool/4c989111af5311993ef10f2391074f3a961649fa/assets/my-reviews/bkg-image.png?token=GHSAT0AAAAAABM4YGVLOOEJOYNGZLXYSZUCY5S63GQ',
				// }}
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
								You have reviewed 5 books!
							</Text>
						</View>
						<View style={styles.myReviews}>
							<MyReviewCard
								bookName='The Awesome Egyptian'
								authorName='Terry Deary'
								bookCoverSrc='https://klaqoarttawlrpftzomo.supabase.co/storage/v1/object/sign/bookimages/The%20Chronicles%20of%20Narnia.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJib29raW1hZ2VzL1RoZSBDaHJvbmljbGVzIG9mIE5hcm5pYS5qcGciLCJ0cmFuc2Zvcm1hdGlvbnMiOiIiLCJpYXQiOjE2NzA0MTg0MjUsImV4cCI6MTk4NTc3ODQyNX0.ca1-R8_lzup-7wN0jBjr1wNAQX8vYFbgrtHeMB-NhCs'
								drawingSrc='https://klaqoarttawlrpftzomo.supabase.co/storage/v1/object/public/reviewimages/review-6f573ac1-1149-4fba-85e8-dec73a6bba31.jpg'
							/>
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
						</View>
					</View>
				</ScrollView>
			</ImageBackground>
		</>
	);
};

export default MyReviews;
