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
					</View>
				</ScrollView>
			</ImageBackground>
		</>
	);
};

export default MyReviews;
