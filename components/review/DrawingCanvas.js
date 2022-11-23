import { View, StyleSheet } from 'react-native';
import Canvas from 'react-native-canvas';

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		flex: 1,
		// width: 200,
		height: 40,
		marginTop: 30,
		marginBottom: 20,
		backgroundColor: '#f2f2f2',
	},
});

const DrawingCanvas = () => {
	const handleCanvas = (canvas) => {
		const ctx = canvas.getContext('2d');
		ctx.fillStyle = 'purple';
		ctx.fillRect(0, 0, 100, 100);
	};

	return (
		<>
			<View style={styles.container}>
				{/* <Canvas ref={handleCanvas} /> */}
			</View>
		</>
	);
};

export default DrawingCanvas;
