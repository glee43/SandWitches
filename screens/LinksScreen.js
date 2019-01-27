import React from "react";
import { ScrollView, StyleSheet, Image, View, Text } from "react-native";

export default class LinksScreen extends React.Component {
    static navigationOptions = {
        title: "Welcome to Cube Rule!"
    };

    render() {
        return (
            <ScrollView style={styles.container}>
                {/* Go ahead and delete ExpoLinksView and replace it with your
                 * content, we just wanted to provide you with some helpful links */}
                <View
                    style={{ alignItems: "center", justifyContent: "center" }}
                >
                    <Text
                        style={{
                            fontFamily: "Chalkduster",
                            fontSize: 12,
                            textAlign: "center"
                        }}
                    >
                        Have <Text style={{ color: "red" }}>👉YOU</Text> ever
                        woken up{" "}
                        <Text style={{ color: "red" }}>SCREAMING😱</Text> in the
                        middle of the{" "}
                        <Text style={{ color: "gray" }}>NIGHT🌃</Text> plagued
                        with the awful uncertainty of not{" "}
                        <Text style={{ color: "blue" }}>KNOWING🤔</Text> if a
                        <Text style={{ color: "red" }}> HOTDOG🌭</Text> was a{" "}
                        <Text style={{ color: "brown" }}>SANDWICH🥪</Text>?{" "}
                        <Text>{"\n\n"}</Text> Wonder no longer! Welcome to the
                        beautiful...
                    </Text>
                    <Image
                        style={{
                            width: 350,
                            height: 300,
                            resizeMode: "contain"
                        }}
                        source={require("../assets/images/CubeRule.png")}
                    />
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: "#fff"
    }
});
