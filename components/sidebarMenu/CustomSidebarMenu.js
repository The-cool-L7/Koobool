import { SafeAreaView, View, StyleSheet, Text } from 'react-native';

import {
	DrawerContentScrollView,
	DrawerItemList,
	DrawerItem,
} from '@react-navigation/drawer';
import { FontAwesome } from '@expo/vector-icons';

const styles = StyleSheet.create({
	username: {
		fontSize: 20,
		fontWeight: 'bold',
	},
});

const CustomSidebarMenu = (props) => {
	const { username } = props;

	return (
		<>
			<SafeAreaView style={{ flex: 1 }}>
				<FontAwesome name='user-circle-o' size={24} color='black' />
				<Text style={styles.username}>{username}</Text>
				<DrawerContentScrollView {...props}>
					<DrawerItemList {...props} />
				</DrawerContentScrollView>
			</SafeAreaView>
		</>
	);
};

export default CustomSidebarMenu;
