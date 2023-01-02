import { createNativeStackNavigator } from '@react-navigation/native-stack';

import NavigationDrawerStructure from '../NavigationDrawerStructure/NavigationDrawerStructure';
import MyReviews from './MyReviews';

const Stack = createNativeStackNavigator();

const MyReviewsStack = (props) => {
	const { navigation, routeName } = props;

	return (
		<>
			<Stack.Navigator>
				<Stack.Screen
					name='My Reviews'
					options={{
						headerLeft: () => (
							<NavigationDrawerStructure
								navigationProps={navigation}
								routeName={routeName}
							/>
						),
					}}
				>
					{(props) => <MyReviews {...props} username={'Daniyal'} />}
				</Stack.Screen>
			</Stack.Navigator>
		</>
	);
};

export default MyReviewsStack;
