import * as React from 'react';
import {createDrawerNavigator} from "@react-navigation/drawer";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import {navigationPages} from "../components/navigationPages";
import {HomeScreen} from "../../screens/HomeScreen";
import {CustomDrawer} from "../../components/CustomDrawer";
import {ProfileScreen} from "../../screens/ProfileScreen";
import {COLORS} from "../../resources/colors";

const Drawer = createDrawerNavigator();

export const DrawerStackComponent = () => {
    return (
        <Drawer.Navigator
            initialRouteName={navigationPages.HOME}
            screenOptions={{
                headerShown: false,
                swipeEdgeWidth: 250,
                swipeMinDistance: 20,
                drawerInactiveTintColor: COLORS.lightBlue,
                drawerLabelStyle: {marginLeft: -20},
            }}
            drawerContent={props => <CustomDrawer {...props} />}
        >
            <Drawer.Screen
                name={navigationPages.PROFILE}
                component={ProfileScreen}
                options={{
                    drawerIcon: ({color}) => (
                        <FontAwesome5 name={'user'} size={20} color={color} />
                    )
                }}
            />
            <Drawer.Screen
                name={navigationPages.HOME}
                component={HomeScreen}
                options={{
                    drawerIcon: ({color}) => (
                        <AntDesign name={'message1'} size={20} color={color} />
                    )
                }}
            />
        </Drawer.Navigator>
    )
}