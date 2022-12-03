import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import Review from './components/review/Review';
import { Layout } from './components/utilities/utils';

const styles = StyleSheet.create({});

// const Stack = createNativeStackNavigator();
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
							}}
						/>
						<Tab.Screen
							name='Review'
							component={Review}
							options={{
								headerShown: false,
							}}
						/>
					</Tab.Navigator>
				</NavigationContainer>
			</Layout>
		</>
	);
}
