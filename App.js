import 'react-native-gesture-handler';
import React from 'react';
import { Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import SearchReview from './components/searchReview/SearchReview';
import { Layout } from './components/utilities/utils';
import AddReviewHome from './components/addReview/AddReviewHome';
import MyReviews from './components/myReviews/MyReviews';
import HomeTab from './components/home/HomeTab';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
	return (
		<>
			{Platform.OS === 'ios' && (
				<StatusBar backgroundColor='fff' style='dark' />
			)}

			<Layout>
				<NavigationContainer>
					{/* <Navbar /> */}
					{/* <Tab.Navigator initialRouteName='Home'>
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
					</Tab.Navigator> */}
					<Drawer.Navigator
						screenOptions={{
							drawerActiveTintColor: '#e91e65',
							drawerItemStyle: { marginVertical: 5 },
						}}
					>
						<Drawer.Screen
							name='Home Tab'
							options={{ drawerLabel: 'Home' }}
							component={HomeTab}
						/>
						<Drawer.Screen
							name='My Reviews'
							options={{ drawerLabel: 'My Reviews' }}
							component={MyReviews}
						/>
					</Drawer.Navigator>
				</NavigationContainer>
			</Layout>
		</>
	);
}
