import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

import Home from './Home';
import SearchReview from '../searchReview/SearchReview';
import AddReviewHome from '../addReview/AddReviewHome';

const HomeTab = () => {
	const Tab = createBottomTabNavigator();

	return (
		<>
			<Tab.Navigator initialRouteName='Home'>
				<Tab.Screen
					name='Home'
					component={Home}
					options={{
						// headerShown: false,
						tabBarIcon: ({ focused }) => {
							return (
								<Entypo
									name='home'
									size={24}
									color={focused ? '#0093E9' : 'black'}
								/>
							);
						},
					}}
				/>
				<Tab.Screen
					name='Search Reviews'
					component={SearchReview}
					options={{
						// headerShown: false,
						title: 'Search Reviews',
						tabBarIcon: ({ focused }) => {
							return (
								<FontAwesome
									name='search'
									size={24}
									color={focused ? '#0093E9' : 'black'}
								/>
							);
						},
					}}
				/>
				<Tab.Screen
					name='Add Review Home'
					component={AddReviewHome}
					options={{
						// headerShown: false,
						title: 'Add Review',
						tabBarIcon: ({ focused }) => {
							return (
								<MaterialIcons
									name='rate-review'
									size={24}
									color={focused ? '#0093E9' : 'black'}
								/>
							);
						},
					}}
				/>
			</Tab.Navigator>
		</>
	);
};

export default HomeTab;
