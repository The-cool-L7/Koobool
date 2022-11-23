import { Pressable, StyleSheet, TouchableOpacity, Text } from 'react-native';

const styles = StyleSheet.create({
	button: {
		padding: 12,
		margin: 20,
		backgroundColor: 'lightgray',
		borderRadius: 20,
	},
	text: {
		fontSize: 18,
	},
});

const ReviewButton = (props) => {
	const { buttonText, onPress } = props;

	return (
		<>
			<Pressable style={styles.button}>
				<TouchableOpacity onPress={onPress}>
					<Text style={styles.text}>{buttonText}</Text>
				</TouchableOpacity>
			</Pressable>
		</>
	);
};

export default ReviewButton;
