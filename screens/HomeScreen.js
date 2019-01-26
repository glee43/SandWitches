import React from "react";
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Button
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { WebBrowser, ImagePicker, Permissions, Camera } from "expo";

import { MonoText } from "../components/StyledText";

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null
    };
    state = {
        image: null,
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
        launchCamera: false,
        showPicker: true
    };
    async componentDidMount() {
        const { status } = await Permissions.askAsync(
            Permissions.CAMERA_ROLL,
            Permissions.CAMERA
        );

        this.setState({ hasCameraPermission: status === "granted" });
    }
    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3]
        });

        console.log(result);

        if (!result.cancelled) {
            this.setState({ image: result.uri });
        }
    };
    _launchCamera = async () => {
        this.state.showPicker
            ? this.setState({ showPicker: false, launchCamera: true })
            : this.setState({ showPicker: true, launchCamera: false });
    };
    snap = async () => {
        if (this.camera) {
            let photo = await this.camera.takePictureAsync();
            alert(JSON.stringify(photo.uri));
            this.setState({
                image: photo.uri,
                showPicker: true,
                launchCamera: false
            });
        }
    };
    render() {
        let { image, launchCamera, showPicker } = this.state;
        return (
            <View
                style={{
                    flex: 1
                }}
            >
                {showPicker && (
                    <View
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <Button
                            title="Pick an image from camera roll"
                            onPress={this._pickImage}
                        />
                        {image && (
                            <Image
                                source={{ uri: image }}
                                style={{ width: 200, height: 200 }}
                            />
                        )}
                        <Button
                            style={{ marginTop: 500 }}
                            title="Launch Camera"
                            onPress={this._launchCamera}
                        />
                    </View>
                )}
                {launchCamera && (
                    <View style={{ flex: 1 }}>
                        <Camera
                            style={{ flex: 1 }}
                            type={this.state.type}
                            ref={ref => {
                                this.camera = ref;
                            }}
                        >
                            <View
                                style={{
                                    flex: 10,
                                    backgroundColor: "transparent",
                                    flexDirection: "row",
                                    justifyContent: "center",
                                    alignItems: "flex-end"
                                }}
                            >
                                <TouchableOpacity onPress={this.snap}>
                                    <Ionicons
                                        name="ios-radio-button-on"
                                        size={70}
                                        color="white"
                                    />
                                </TouchableOpacity>
                            </View>
                            <View
                                style={{
                                    flex: 1,
                                    backgroundColor: "transparent",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "space-between"
                                }}
                            >
                                <TouchableOpacity
                                    onPress={() => {
                                        this.setState({
                                            type:
                                                this.state.type ===
                                                Camera.Constants.Type.back
                                                    ? Camera.Constants.Type
                                                          .front
                                                    : Camera.Constants.Type.back
                                        });
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 18,
                                            marginBottom: 10,
                                            color: "white"
                                        }}
                                    >
                                        {" "}
                                        Flip{" "}
                                    </Text>
                                </TouchableOpacity>

                                <Button
                                    title="Close Camera"
                                    onPress={this._launchCamera}
                                />
                            </View>
                        </Camera>
                    </View>
                )}
            </View>
        );
    }

    _maybeRenderDevelopmentModeWarning() {
        if (__DEV__) {
            const learnMoreButton = (
                <Text
                    onPress={this._handleLearnMorePress}
                    style={styles.helpLinkText}
                >
                    Learn more
                </Text>
            );

            return (
                <Text style={styles.developmentModeText}>
                    Development mode is enabled, your app will be slower but you
                    can use useful development tools. {learnMoreButton}
                </Text>
            );
        } else {
            return (
                <Text style={styles.developmentModeText}>
                    You are not in development mode, your app will run at full
                    speed.
                </Text>
            );
        }
    }

    _handleLearnMorePress = () => {
        WebBrowser.openBrowserAsync(
            "https://docs.expo.io/versions/latest/guides/development-mode"
        );
    };

    _handleHelpPress = () => {
        WebBrowser.openBrowserAsync(
            "https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes"
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    developmentModeText: {
        marginBottom: 20,
        color: "rgba(0,0,0,0.4)",
        fontSize: 14,
        lineHeight: 19,
        textAlign: "center"
    },
    contentContainer: {
        paddingTop: 30
    },
    welcomeContainer: {
        alignItems: "center",
        marginTop: 10,
        marginBottom: 20
    },
    welcomeImage: {
        width: 100,
        height: 80,
        resizeMode: "contain",
        marginTop: 3,
        marginLeft: -10
    },
    getStartedContainer: {
        alignItems: "center",
        marginHorizontal: 50
    },
    homeScreenFilename: {
        marginVertical: 7
    },
    codeHighlightText: {
        color: "rgba(96,100,109, 0.8)"
    },
    codeHighlightContainer: {
        backgroundColor: "rgba(0,0,0,0.05)",
        borderRadius: 3,
        paddingHorizontal: 4
    },
    getStartedText: {
        fontSize: 17,
        color: "rgba(96,100,109, 1)",
        lineHeight: 24,
        textAlign: "center"
    },
    tabBarInfoContainer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        ...Platform.select({
            ios: {
                shadowColor: "black",
                shadowOffset: { height: -3 },
                shadowOpacity: 0.1,
                shadowRadius: 3
            },
            android: {
                elevation: 20
            }
        }),
        alignItems: "center",
        backgroundColor: "#fbfbfb",
        paddingVertical: 20
    },
    tabBarInfoText: {
        fontSize: 17,
        color: "rgba(96,100,109, 1)",
        textAlign: "center"
    },
    navigationFilename: {
        marginTop: 5
    },
    helpContainer: {
        marginTop: 15,
        alignItems: "center"
    },
    helpLink: {
        paddingVertical: 15
    },
    helpLinkText: {
        fontSize: 14,
        color: "#2e78b7"
    }
});
