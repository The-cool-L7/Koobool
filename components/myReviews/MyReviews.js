import { useState, useCallback, useEffect } from 'react';
import {
	StyleSheet,
	Text,
	Image,
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
});

const MyReviews = () => {
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
			<ScrollView
				style={{ flex: 1 }}
				contentContainerStyle={{ flexGrow: 1 }}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}
			></ScrollView>
		</>
	);
};

export default MyReviews;
