import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import AddReview from './components/addReview/AddReview';
import SearchReview from './components/searchReview/SearchReview';
import { Layout } from './components/utilities/utils';
import AddReviewHome from './components/addReview/AddReviewHome';

const styles = StyleSheet.create({});

const Tab = createBottomTabNavigator();

export default function App() {
	return (
		<>
			{Platform.OS === 'ios' && (
				<StatusBar backgroundColor='fff' style='dark' />
			)}

			<Layout>
				<NavigationContainer>
					<Navbar />
					<Tab.Navigator initialRouteName='Home'>
						<Tab.Screen
							name='Home'
							component={Home}
							options={{
								headerShown: false,
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
								headerShown: false,
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
								headerShown: false,
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
						<Tab.Screen
							name='Add Review'
							component={AddReview}
							options={{
								headerShown: false,
								title: 'Add Review',
								tabBarButton: () => null,
								tabBarVisible: false, //hide tab bar on this screen
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
				</NavigationContainer>
			</Layout>
		</>
	);
}
