import React, {Component} from 'react'
import {View, Image, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native'
import {Images, notifications} from "../../theme/images";
import {NavigationServices} from "../../api/NavigationService";



class NotificationsCell extends Component {
    handleNotificationPress = (notification) => {
        NavigationServices.pop();
        NavigationServices.navigate("NotificationDetails", {
            product_id: notification.product_id,
            notificationId: notification.id
        })
    };

    render() {
        const {notification} = this.props;

        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.cell} onPress={() => {
                    this.handleNotificationPress(notification)
                }}>
                    <View>
                        {notification.is_read === 0 ? <Image source={notifications.unread}/> :
                            <Image source={notifications.read}/>}

                    </View>
                    <View style={styles.cellData}>
                        <Text style={styles.desc}>{notification.message}</Text>
                        <Text style={{color: "#bfbfbf",}}>{notification.created_at}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    cell: {
        flexDirection: 'row',
    },
    cellData: {
        marginLeft: 10,
        marginRight: 10,
    },
    desc: {
        marginBottom: 10,
        color: "#bfbfbf",
    },
    text: {
        marginLeft: 12,
        fontSize: 16,
    },
    photo: {
        height: 40,
        width: 40,
        borderRadius: 20,
    },
    separator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#8E8E8E',
    },
});


export default NotificationsCell;