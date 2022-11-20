import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default class App extends React.Component {
    state = {
        image: null,
    };

    selectCamera = async () => {
        
        const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
            aspect: [3,3],
            allowsEditing: true,
        });
        if (!cancelled) this.setState({ image: uri });
    };

    pickImage = async () => {
     
        const { cancelled, uri } = await ImagePicker.launchCameraAsync({
            allowsEditing: false,
        });
        this.setState({ image: uri });
    };

    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.image} source={{ uri: this.state.image }} />
                <View style={styles.row}>
                    <Button onPress={this.selectCamera}>Gallery</Button>
                    <Button onPress={this.pickImage}>Camera</Button>
                </View>
            </View>
        );
    }
}

const Button = ({ onPress, children }) => (
    <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    text: {
        fontSize: 18,
    },
    row: { flexDirection: 'row' },
    image: {
        width: 350,
        height: 350,
        backgroundColor: 'darkgray',
        borderRadius: 40,
    },
    button: {
        padding: 12,
        margin: 20,
        backgroundColor: 'lightgray',
        borderRadius: 20,
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
