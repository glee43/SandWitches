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
import {
    WebBrowser,
    ImagePicker,
    Permissions,
    Camera,
    ImageManipulator
} from "expo";
import { MonoText } from "../components/StyledText";

const food = [
    "🥗 salad",
    "🍞 toast",
    "🥪 sandwich",
    "🌮 taco",
    "🍱 sushi",
    "🍲 bread bowl",
    "🥟 calzone"
];
const url = "https://cube-rule.herokuapp.com/classify";
export default class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null
    };
    state = {
        image: null,
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
        launchCamera: true,
        showPicker: false,
        imageType: 0
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
            this.setState({
                image: result.uri,
                showPicker: true,
                launchCamera: false
            });
            this.__postImage();
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

            this.setState({
                image: photo.uri,
                showPicker: true,
                launchCamera: false
            });
            this.__postImage();
        }
    };

    __postImage = async () => {
        let contents = await ImageManipulator.manipulateAsync(
            this.state.image,
            [{ resize: { height: 512 } }],
            { base64: true, compress: 0.1, format: "jpeg" }
        );
        console.log(contents);
        let response = await fetch(url, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                image: contents.base64
            })
        })
            .then(response => {
                responseJson = JSON.parse(response._bodyInit);
                this.setState({ imageType: responseJson.type });
                alert("not error");
            })
            .catch(error => {
                this.setState({
                    imageType: Math.floor(Math.random() * 6)
                });
                alert("error");
                throw error;
            });
    };
    render() {
        let { image, launchCamera, showPicker, imageType } = this.state;
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
                            justifyContent: "space-evenly",
                            alignItems: "center"
                        }}
                    >
                        {/* <TouchableOpacity
                            style={{ alignItems: "center" }}
                            onPress={this._pickImage}
                        >
                            <Ionicons
                                name="ios-document"
                                size={70}
                                color="#42adf4"
                            />
                            <Text style={{ color: "#42adf4", fontSize: 20 }}>
                                Pick image from camera roll
                            </Text>
                        </TouchableOpacity> */}
                        <Text
                            style={{
                                fontSize: 40,
                                textAlign: "center",
                                fontFamily: "Apple Color Emoji"
                            }}
                        >
                            {food[imageType]}
                        </Text>
                        {image && (
                            <Image
                                source={{ uri: image }}
                                style={{ width: 200, height: 200 }}
                            />
                        )}

                        <TouchableOpacity
                            style={{ alignItems: "center" }}
                            onPress={this._launchCamera}
                        >
                            <Ionicons
                                name="ios-camera"
                                size={70}
                                color="#42adf4"
                            />
                            {/* <Text style={{ color: "#42adf4", fontSize: 20 }}>
                                Launch Camera
                            </Text> */}
                        </TouchableOpacity>
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
                                    backgroundColor: "transparent",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "space-between",
                                    marginTop: 40
                                }}
                            >
                                <TouchableOpacity
                                    onPress={() => {
                                        this._launchCamera();
                                    }}
                                    style={{
                                        marginLeft: 15
                                    }}
                                >
                                    <Ionicons
                                        name="ios-arrow-dropleft"
                                        size={50}
                                        color="white"
                                    />
                                </TouchableOpacity>
                            </View>
                            <View
                                style={{
                                    flex: 1,

                                    backgroundColor: "transparent",
                                    flexDirection: "row",
                                    justifyContent: "center",
                                    alignItems: "flex-end"
                                }}
                            >
                                <View
                                    style={{
                                        flerx: 1,
                                        backgroundColor: "black",
                                        position: "absolute",
                                        height: 500
                                    }}
                                />
                                <TouchableOpacity onPress={this.snap}>
                                    <Ionicons
                                        name="ios-radio-button-on"
                                        size={70}
                                        color="white"
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{
                                        position: "absolute",
                                        left: "10%",
                                        bottom: "3%"
                                    }}
                                    onPress={this._pickImage}
                                >
                                    <Ionicons
                                        name="ios-document"
                                        size={50}
                                        color="white"
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{
                                        position: "absolute",
                                        right: "10%",
                                        bottom: "3%"
                                    }}
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
                                    <Ionicons
                                        name="ios-reverse-camera"
                                        size={50}
                                        color="white"
                                    />
                                </TouchableOpacity>
                            </View>
                        </Camera>
                    </View>
                )}
            </View>
        );
    }
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
