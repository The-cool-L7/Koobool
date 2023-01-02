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
					component={MyReviews}
					options={{
						headerLeft: () => (
							<NavigationDrawerStructure
								navigationProps={navigation}
								routeName={routeName}
							/>
						),
					}}
				/>
			</Stack.Navigator>
		</>
	);
};

export default MyReviewsStack;
