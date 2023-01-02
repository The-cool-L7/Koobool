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
	const [refreshing, setRefreshing] = useState(false);

	const wait = (timeout) => {
		return new Promise((resolve) => setTimeout(resolve, timeout));
	};

	const onRefresh = useCallback(() => {
		setRefreshing(true);

		console.log('my reviews page refreshing');

		wait(1000).then(() => setRefreshing(false));
	}, []);

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
							<Text style={styles.username}>Daniyal</Text>
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
						</View>
					</View>
				</ScrollView>
			</ImageBackground>
		</>
	);
};

export default MyReviews;
