import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import {
	NavigationContainer,
	createNavigationContainerRef,
} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { Layout } from './components/utilities/utils';
import MyReviews from './components/myReviews/MyReviews';
import HomeTab from './components/home/HomeTab';
import CustomSidebarMenu from './components/sidebarMenu/CustomSidebarMenu';

const Drawer = createDrawerNavigator();

export const navigationRef = createNavigationContainerRef();

export default function App() {
	const [routeName, setRouteName] = useState();

	return (
		<>
			{Platform.OS === 'ios' && (
				<StatusBar backgroundColor='fff' style='dark' />
			)}

			<Layout>
				<NavigationContainer
					ref={navigationRef}
					onReady={() => {
						setRouteName(navigationRef.getCurrentRoute().name);
					}}
					onStateChange={async () => {
						const previousRouteName = routeName;
						const currentRouteName = navigationRef.getCurrentRoute().name;
						// console.log('route', currentRouteName);
						setRouteName(currentRouteName);
					}}
				>
					<Drawer.Navigator
						screenOptions={{
							drawerActiveTintColor: '#0093E9',
							drawerItemStyle: { marginVertical: 5 },
						}}
						drawerContent={(props) => (
							<CustomSidebarMenu username='Daniyal' {...props} />
						)}
					>
						<Drawer.Screen
							name='Home Tab'
							options={{ drawerLabel: 'Home', headerShown: false }}
						>
							{(props) => <HomeTab {...props} routeName={routeName} />}
						</Drawer.Screen>
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
