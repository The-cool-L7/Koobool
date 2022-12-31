import 'react-native-gesture-handler';
import React from 'react';
import { Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { Layout } from './components/utilities/utils';
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
					<Drawer.Navigator
						screenOptions={{
							drawerActiveTintColor: '#e91e65',
							drawerItemStyle: { marginVertical: 5 },
						}}
					>
						<Drawer.Screen
							name='Home Tab'
							options={{ drawerLabel: 'Home', headerShown: false }}
							component={HomeTab}
						/>
						<Drawer.Screen
							name='My Reviews'
							options={{ drawerLabel: 'My Reviews', headerShown: false }}
							component={MyReviews}
						/>
					</Drawer.Navigator>
				</NavigationContainer>
			</Layout>
		</>
	);
}
