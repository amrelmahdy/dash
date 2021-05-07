import React, {Component} from 'react';
import {Image, Linking, Platform, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View,} from 'react-native';
import {contact, menu} from "../../constants/images";
import {Divider} from "react-native-elements"
// import MapView, {Marker} from 'react-native-maps'
import {MapView} from 'expo';

const {Marker} = MapView;

class Contact extends Component {
    static navigationOptions = {
        title: 'Contact',
    };

    dialCall = () => {

        let phoneNumber = '';

        if (Platform.OS === 'android') {
            phoneNumber = 'tel:${1234567890}';
        } else {
            phoneNumber = 'telprompt:${1234567890}';
        }

        Linking.openURL(phoneNumber);
    };

    dialCall = () => {

        let phoneNumber = '';

        if (Platform.OS === 'android') {
            phoneNumber = 'tel:${1234567890}';
        } else {
            phoneNumber = 'telprompt:${1234567890}';
        }

        Linking.openURL(phoneNumber);
    };

    render() {

        const region = {
            latitude: 30.05838,
            longitude: 31.198916,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        };

        const marker = {
            coordinate: {
                latitude: 30.05838,
                longitude: 31.198916,
            },
            title: "Premi Advertising Agency",
            description: "84 Shehab, Gazirat Mit Oqbah, Al Agouzah, Giza Governorate 12411"
        };


        return (
            <View style={styles.container}>
                <StatusBar barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"}/>
                <ScrollView style={{
                    backgroundColor: '#FFF',
                    width: "90%",
                    marginTop: 20,
                    marginBottom: 20,
                    borderRadius: 15,
                    padding: 30
                }}>
                    <View style={{flex: 1}}>
                        <View style={{alignItems: "center"}}>
                            <Image source={contact.contactUs} style={{marginBottom: 20}}/>
                            <Text style={styles.title}>
                                get in touch !

                            </Text>

                        </View>

                    </View>

                    <View style={styles.iconLabel}>
                        <Image source={menu.contact} style={styles.iconLabelTest}/>
                        <TouchableOpacity
                            onPress={() => Linking.openURL("http://premi.com.eg/")}>
                            <Text>premi.com.eg</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{flex: 1}}>
                        <View style={styles.iconLabel}>
                            <Image source={menu.contact} style={styles.iconLabelTest}/>
                            <Text>
                                info@premi.com.eg
                            </Text>

                        </View>


                        {/*<View style={styles.iconLabel}>*/}
                        {/*    <Image source={menu.contact} style={styles.iconLabelTest} />*/}
                        {/*    <Text>*/}
                        {/*        info@premieg.net*/}
                        {/*    </Text>*/}
                        {/*</View>*/}

                        <Divider/>
                    </View>


                    <View style={{flex: 1, paddingTop: 10, paddingBottom: 10}}>
                        <View style={styles.iconLabel}>
                            <Image source={contact.phone} style={{marginRight: 5, marginTop: 5}}/>
                            <TouchableOpacity onPress={() => this.dialCall()}>
                                <Text style={styles.iconLabelTest}>
                                    (+202) – 33031009
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.iconLabel}>
                            <Image source={contact.phone} style={{marginRight: 5, marginTop: 5}}/>
                            <Text style={styles.iconLabelTest}>
                                (+2) 0100 918 3304
                            </Text>
                        </View>
                    </View>


                    <View style={{flex: 1}}>
                        <View style={styles.iconLabel}>
                            <Image source={contact.address} style={{marginRight: 5, marginTop: 5}}/>
                            <TouchableOpacity
                                onPress={() => Linking.openURL('https://www.google.com/maps/dir//30.05838,31.198916/@30.05838,31.198916,16z?hl=en-US')}>
                                <Text style={styles.iconLabelTest}>
                                    84 Shehab St, Mohandessin, Giza, Egypt
                                </Text>
                            </TouchableOpacity>

                        </View>
                        <View style={{height: 200}}>


                            {/*<MapView*/}
                            {/*style={styles.map}*/}
                            {/*region={region}*/}
                            {/*initialRegion={marker}*/}
                            {/*/>*/}

                            {/*<Marker*/}
                            {/*coordinate={marker}*/}
                            {/*title={marker.title}*/}
                            {/*description={marker.description}*/}

                            {/*/>*/}

                            {/*</MapView>*/}

                            <MapView
                                style={{flex: 1}}
                                region={region}
                            >
                                <Marker
                                    coordinate={marker.coordinate}
                                    title={marker.title}
                                    description={marker.description}
                                />
                            </MapView>
                        </View>
                        {/*<View style={styles.mapContainer}>
                       <MapView
                           style={styles.map}
                           region={{
                               latitude: 37.78825,
                               longitude: -122.4324,
                               latitudeDelta: 0.015,
                               longitudeDelta: 0.0121,
                           }}
                       >
                       </MapView>
                   </View>*/}
                    </View>


                </ScrollView>
            </View>

        )


    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#c7c7c7",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    mapContainer: {
        ...StyleSheet.absoluteFillObject,
        flex: 1
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        height: 150
    },

    title: {
        color: "black",
        fontSize: 20,
        textAlign: "center",
        textTransform: "uppercase",
        marginBottom: 20
    },
    scrollView: {
        width: "90%",
        marginLeft: "5%",
        marginTop: "5%",
        marginBottom: "5%",
        borderRadius: 15,
        backgroundColor: "#ffffff",
        padding: 30,
        flex: 1,
    },

    iconLabel: {
        flexDirection: "row",
        marginBottom: 10
    },

    iconLabelTest: {
        marginRight: 10,
        marginTop: 3
    }
});

export default Contact;

