import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AddReviewForm from './AddReviewForm';
import AllBooks from './AllBooks';

const Stack = createNativeStackNavigator();

const AddReviewHome = () => {
	return (
		<>
			<Stack.Navigator>
				<Stack.Screen
					name='All Books'
					component={AllBooks}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name='Add Review'
					component={AddReviewForm}
					// options={{ headerShown: false }}
				/>
			</Stack.Navigator>
		</>
	);
};

export default AddReviewHome;
