import { SafeAreaView, View, StyleSheet, Text } from 'react-native';

import {
	DrawerContentScrollView,
	DrawerItemList,
	DrawerItem,
} from '@react-navigation/drawer';
import { FontAwesome } from '@expo/vector-icons';

const styles = StyleSheet.create({
	top: {
		alignItems: 'center',
	},
	username: {
		fontSize: 20,
		fontWeight: 'bold',
		marginTop: 10,
		// color: '#000',
	},
});

const CustomSidebarMenu = (props) => {
	const { username } = props;

	return (
		<>
			<SafeAreaView style={{ flex: 1, paddingVertical: 30 }}>
				<View style={styles.top}>
					<FontAwesome name='user-circle-o' size={50} color='black' />
					<Text style={styles.username}>{username}</Text>
				</View>
				<DrawerContentScrollView {...props} style={{ marginTop: 50 }}>
					<DrawerItemList {...props} />
				</DrawerContentScrollView>
			</SafeAreaView>
		</>
	);
};

export default CustomSidebarMenu;
