import React from "react";
import { Platform } from "react-native";
import {
    createStackNavigator,
    createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import LinksScreen from "../screens/LinksScreen";
import SettingsScreen from "../screens/SettingsScreen";

const HomeStack = createStackNavigator({
    Home: HomeScreen
});

HomeStack.navigationOptions = {
    tabBarLabel: "Take Photo",
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === "ios" ? "ios-camera" : "md-camera"}
        />
    )
};

const LinksStack = createStackNavigator({
    Links: LinksScreen
});

LinksStack.navigationOptions = {
    tabBarLabel: "Information",
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={
                Platform.OS === "ios"
                    ? `ios-information-circle${focused ? "" : "-outline"}`
                    : "md-information-circle"
            }
        />
    )
};

const SettingsStack = createStackNavigator({
    Settings: SettingsScreen
});

SettingsStack.navigationOptions = {
    tabBarLabel: "Settings",
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === "ios" ? "ios-options" : "md-options"}
        />
    )
};

export default createBottomTabNavigator({
    LinksStack,
    HomeStack
    //SettingsStack
});
