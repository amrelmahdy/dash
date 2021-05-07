import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Switch, Alert, FlatList} from 'react-native';
import { ActionSheetCustom as ActionSheet } from 'react-native-custom-actionsheet'




const SettingsCell = ({item, index, handleNotification, handleLanguage}) => {
    if (index === 0) {
        return <View style={{flexDirection: "row", marginBottom: 10}}>
            <Text style={{flex: 0.8, marginTop: "3%"}}>{item.name}</Text>
            <Switch style={{flex: 0.2}} onValueChange={() => handleNotification()} value={false}/>
        </View>;
    } else if (index === 1) {
        return <TouchableOpacity style={{marginTop: 10}}  onPress={() => handleLanguage()}>
            <Text>{item.name}</Text>
        </TouchableOpacity>;
    }
};




const CANCEL_INDEX = 0;
const DESTRUCTIVE_INDEX = 3;
const options = [ 'Cancel', 'English', 'العربية' ];
const title = 'Which language would you like?';


class Settings extends Component {




    static navigationOptions = {
        title: 'Settings',
    };

    handleLanguage = () => {
        /*Alert.alert(
            'Alert Title',
            'My Alert Msg',
            [
                {
                    text: 'English', onPress: () => console.log('Ask me later pressed'),
                },
                {
                    text: 'العربية',
                    onPress: () => console.log('Cancel Pressed'),
                },
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false},
        );*/

        //this.RBSheet.open();
        this.showActionSheet();
    };



    handleSwitchNotification = () => {
    };


    settings = [
        {
            id: 1,
            name: "Notifications",
        },
        {
            id: 2,
            name: "Language",
        },
    ];




    state = {
        selected: '',
    };

    showActionSheet = () => this.actionSheet.show();

    getActionSheetRef = ref => (this.actionSheet = ref);

    handlePress = (index) => this.setState({ selected: index })

    render() {
        return (
            <View>
                <FlatList style={{backgroundColor: "#FFF", borderRadius: 10, padding: 10}}
                          data={this.settings}
                          renderItem={({item, index}) => { return ( <SettingsCell handleNotification={() => this.handleSwitchNotification()} handleLanguage={() => this.handleLanguage()}  item={item} index={index} />) } }
                          keyExtractor={item => String(item.id)}
                          ItemSeparatorComponent={() => <View
                              style={{height: 0.5, width: '100%', backgroundColor: '#dbdbdb'}}/>}
                          disableVirtualization />

                <ActionSheet
                    ref={this.getActionSheetRef}
                    title={title}
                    message="Please choose your preferred language"
                    options={options}
                    cancelButtonIndex={CANCEL_INDEX}
                    destructiveButtonIndex={DESTRUCTIVE_INDEX}
                    onPress={this.handlePress}
                />

            </View>
        )
    }
}

export default Settings