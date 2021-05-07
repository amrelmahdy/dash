import {Text, TouchableHighlight, TouchableOpacity, View} from "react-native";
import ImageSlider from "react-native-image-slider";
import {goToProductDetails} from "../../helpers/magicServices";
import {Image} from "react-native-elements";
import React, {Component} from 'react'


const HomeSlider = ({adsSlider, width, styles}) => (
    <View style={{flex: 1}}>
        <ImageSlider
            // loop
            autoPlayWithInterval={3000}
            images={adsSlider && adsSlider.length ? adsSlider : null}
            onPress={({index}) => alert(index)}
            customSlide={({index, item, style, width}) => (
                // It's important to put style here because it's got offset inside
                <TouchableOpacity
                    style={[
                        style,
                        styles.customSlide,
                    ]}
                    key={index} onPress={() => {goToProductDetails(item.product_id)}}
                >
                    <Image source={{uri: item.image}} style={{width: width, height: 150}}/>
                </TouchableOpacity>
            )}
            customButtons={(position, move) => (
                <View style={styles.buttons}>
                    {adsSlider && adsSlider.length > 1? adsSlider.map((image, index) => {
                        return (
                            <TouchableHighlight
                                key={index}
                                underlayColor="#ccc"
                                onPress={() => move(index)}
                                style={styles.button}
                            >
                                <Text style={position === index && styles.buttonSelected}>
                                    {/*{index + 1}*/}
                                </Text>
                            </TouchableHighlight>
                        );
                    }) : null}
                </View>
            )}
        />
    </View>
);

export default HomeSlider;