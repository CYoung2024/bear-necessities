import React, { useState, useContext } from 'react';
import {
    Alert,
    Modal,
    StyleSheet,
    Text,
    TextInput,
    Pressable,
    View,
    TouchableOpacity,
    Platform,
} from 'react-native';

import DropDownPicker from 'react-native-dropdown-picker';
import MyStorage from "../storage";
import * as MyAzureFunctions from "../azureFunctions";
import { TokenContext } from "../contextToken";




const UserInputPopup = (props) => {

    
    const token = useContext(TokenContext);
    const [text, onChangeText] = useState('');
    const [cadetStatus, saveCadetStatus ] = useState('');



    // function UserInput() {
    //     return (
    //     )
    // }

    const [androidDefaults, setAndroidDefaults] = useState({
        container: {
            backgroundColor:
                (props.android &&
                    props.android.container &&
                    props.android.container.backgroundColor) ||
                '#FAFAFA',
        },
        title: {
            color:
                (props.android && props.android.title && props.android.title.color) ||
                '#000000',
            fontSize:
                (props.android &&
                    props.android.title &&
                    props.android.title.fontSize) ||
                22,
            fontWeight:
                (props.android &&
                    props.android.title &&
                    props.android.title.fontWeight) ||
                'bold',
        },
        message: {
            color:
                (props.android &&
                    props.android.message &&
                    props.android.message.color) ||
                '#000000',
            fontSize:
                (props.android &&
                    props.android.message &&
                    props.android.message.fontSize) ||
                15,
            fontWeight:
                (props.android &&
                    props.android.message &&
                    props.android.message.fontWeight) ||
                'normal',
        },
        button: {
            color: '#387ef5',
            fontSize: 16,
            fontWeight: '500',
            textTransform: 'uppercase',
            backgroundColor: 'transparent',
        },
    });

    const [iOSDefaults, setIOSDefaults] = useState({
        container: {
            backgroundColor:
                (props.ios &&
                    props.ios.container &&
                    props.ios.container.backgroundColor) ||
                '#F8F8F8',
        },
        title: {
            color:
                (props.ios && props.ios.title && props.ios.title.color) || '#000000',
            fontSize:
                (props.ios && props.ios.title && props.ios.title.fontSize) || 17,
            fontWeight:
                (props.ios && props.ios.title && props.ios.title.fontWeight) || '600',
        },
        message: {
            color:
                (props.ios && props.ios.message && props.ios.message.color) ||
                '#000000',
            fontSize:
                (props.ios && props.ios.message && props.ios.message.fontSize) || 13,
            fontWeight:
                (props.ios && props.ios.message && props.ios.message.fontWeight) ||
                'normal',
        },
        button: {
            color: '#387ef5',
            fontSize: 17,
            fontWeight: '500',
            textTransform: 'none',
            backgroundColor: 'transparent',
        },
    });

    const AndroidButtonBox = () => {
        const [buttonLayoutHorizontal, setButtonLayoutHorizontal] = useState(1);
        const buttonProps =
            props.buttons && props.buttons.length > 0 ? props.buttons : [{}];

        return (
            <View
                style={[
                    styles.androidButtonGroup,
                    {
                        flexDirection: buttonLayoutHorizontal === 1 ? 'row' : 'column',
                    },
                ]}
                onLayout={(e) => {
                    if (e.nativeEvent.layout.height > 60) setButtonLayoutHorizontal(0);
                }}>
                {buttonProps.map((item, index) => {
                    if (index > 2) return null;
                    const alignSelfProperty =
                        buttonProps.length > 2 &&
                            index === 0 &&
                            buttonLayoutHorizontal === 1
                            ? 'flex-start'
                            : 'flex-end';
                    let defaultButtonText = 'OK';
                    if (buttonProps.length > 2) {
                        if (index === 0) defaultButtonText = 'ASK ME LATER';
                        else if (index === 1) defaultButtonText = 'CANCEL';
                    } else if (buttonProps.length === 2 && index === 0)
                        defaultButtonText = 'CANCEL';
                    return (
                        <View
                            style={[
                                styles.androidButton,
                                index === 0 && buttonLayoutHorizontal === 1 ? { flex: 1 } : {},
                            ]}>
                            <TouchableOpacity
                                onPress={() => {props.setModalVisible(false)
                                    if (item.func && typeof item.func === 'function') {item.func();}
                                    if (item.text === 'OK' || defaultButtonText === 'OK' ) {

                                        props.saveCadetStatus(text), 
                                        console.log("cadetStatus=" + text), 
                                        MyAzureFunctions.call_writeCadetStatus(
                                            token,
                                            props.cadetCodeForFunc,
                                            text
                                          );
                                    }
                                }}
                                style={[{ alignSelf: alignSelfProperty }]}>
                                <View
                                    style={[
                                        styles.androidButtonInner,
                                        {
                                            backgroundColor:
                                                (item.styles && item.styles.backgroundColor) ||
                                                androidDefaults.button.backgroundColor,
                                        },
                                    ]}>
                                    <Text
                                        style={{
                                            color:
                                                (item.styles && item.styles.color) ||
                                                androidDefaults.button.color,
                                            //fontFamily:
                                                //(item.styles && item.styles.fontFamily) ||
                                                //androidDefaults.button.fontFamily,
                                            fontSize:
                                                (item.styles && item.styles.fontSize) ||
                                                androidDefaults.button.fontSize,
                                            fontWeight:
                                                (item.styles && item.styles.fontWeight) ||
                                                androidDefaults.button.fontWeight,
                                            textTransform:
                                                (item.styles && item.styles.textTransform) ||
                                                androidDefaults.button.textTransform,
                                        }}>
                                        {item.text || defaultButtonText}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    );
                })}
            </View>
        );
    };

    const IOSButtonBox = () => {
        const buttonProps =
            props.buttons && props.buttons.length > 0 ? props.buttons : [{}];
        const [buttonLayoutHorizontal, setButtonLayoutHorizontal] = useState(
            buttonProps.length === 2 ? 1 : 0
        );

        return (
            <View
                style={[
                    styles.iOSButtonGroup,
                    {
                        flexDirection: buttonLayoutHorizontal === 1 ? 'row' : 'column',
                    },
                ]}
                onLayout={(e) => {
                    if (e.nativeEvent.layout.height > 60) setButtonLayoutHorizontal(0);
                }}>
                {buttonProps.map((item, index) => {
                    let defaultButtonText = 'OK';
                    if (buttonProps.length > 2) {
                        if (index === 0) defaultButtonText = 'ASK ME LATER';
                        else if (index === 1) defaultButtonText = 'CANCEL';
                    } else if (buttonProps.length === 2 && index === 0)
                        defaultButtonText = 'CANCEL';
                    const singleButtonWrapperStyle = {};
                    let singleButtonWeight = iOSDefaults.button.fontWeight;
                    if (index === buttonProps.length - 1) {
                        singleButtonWeight = '700';
                    }
                    if (buttonLayoutHorizontal === 1) {
                        singleButtonWrapperStyle.minWidth = '50%';
                        if (index === 0) {
                            //singleButtonWrapperStyle.borderStyle = 'solid';
                            //singleButtonWrapperStyle.borderRightWidth = 0.55;
                            //singleButtonWrapperStyle.borderRightColor = '#dbdbdf';
                        }
                    }
                    return (
                        <View style={[styles.iOSButton, singleButtonWrapperStyle]}>
                            <Pressable
                                onPress={() => {props.setModalVisible(false)
                                    if (item.func && typeof item.func === 'function') {item.func();}
                                    if (item.text === 'OK' || defaultButtonText === 'OK' ) {
                                        props.saveCadetStatus(text), 
                                        console.log("cadetStatus=" + text), 
                                        MyAzureFunctions.call_writeCadetStatus(
                                            token,
                                            props.cadetCodeForFunc,
                                            text
                                          );
                                    }
                                }}>
                                <View
                                    style={[
                                        styles.iOSButtonInner,
                                        {
                                            backgroundColor:
                                                (item.styles && item.styles.backgroundColor) ||
                                                iOSDefaults.button.backgroundColor,
                                        },
                                    ]}>
                                    <Text
                                        style={{
                                            color:
                                                (item.styles && item.styles.color) ||
                                                iOSDefaults.button.color,
                                            //fontFamily:
                                                //(item.styles && item.styles.fontFamily) ||
                                                //iOSDefaults.button.fontFamily,
                                            fontSize:
                                                (item.styles && item.styles.fontSize) ||
                                                iOSDefaults.button.fontSize,
                                            fontWeight:
                                                (item.styles && item.styles.fontWeight) ||
                                                singleButtonWeight,
                                            textTransform:
                                                (item.styles && item.styles.textTransform) ||
                                                iOSDefaults.button.textTransform,
                                            textAlign: 'center',
                                        }}>
                                        {item.text || defaultButtonText}
                                    </Text>
                                </View>
                            </Pressable>
                        </View>
                    );
                })}
            </View>
        );
    };

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={props.modalVisible}
            onRequestClose={() => {
                props.setModalVisible(false)
            }}>
            <Pressable
                style={[
                    Platform.OS === 'ios' ? styles.iOSBackdrop : styles.androidBackdrop,
                    styles.backdrop,
                ]}
                onPress={() => { props.setModalVisible(false) }}
            />
            <View style={styles.alertBox}>
                {Platform.OS === 'ios' ? (
                    <View style={[styles.iOSAlertBox, iOSDefaults.container]}>
                        <Text style={[styles.iOSTitle, iOSDefaults.title]}>
                            {props.title || 'Message'}
                        </Text>
                        <Text style={[styles.iOSMessage, iOSDefaults.message]}>
                            {props.message || ''}
                        </Text>


                        <View style={styles.dropDownContainer}>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={text}
                    placeholder='IEEE Lunch Excusal'
                />
            </View>


                        <IOSButtonBox />
                    </View>
                ) : (
                    <View style={[styles.androidAlertBox, androidDefaults.container]}>
                        <Text style={[styles.androidTitle, androidDefaults.title]}>
                            {props.title || 'Message'}
                        </Text>
                        <Text style={[styles.androidMessage, androidDefaults.message]}>
                            {props.message || ''}
                        </Text>

                        <View style={styles.dropDownContainer}>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={text}
                    placeholder='IEEE Lunch Excusal'
                />
            </View>


                        <AndroidButtonBox />
                    </View>
                )}
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },

    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },

    iOSBackdrop: {
        backgroundColor: '#000000',
        opacity: 0.3,
    },
    androidBackdrop: {
        backgroundColor: '#232f34',
        opacity: 0.4,
    },
    backdrop: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    alertBox: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    androidAlertBox: {
        maxWidth: 280,
        width: '100%',
        margin: 48,
        elevation: 24,
        borderRadius: 2,
    },
    androidTitle: {
        margin: 24,
    },
    androidMessage: {
        marginLeft: 24,
        marginRight: 24,
        marginBottom: 24,
    },
    androidButtonGroup: {
        marginTop: 0,
        marginRight: 0,
        marginBottom: 8,
        marginLeft: 24,
    },
    androidButton: {
        marginTop: 12,
        marginRight: 8,
    },
    androidButtonInner: {
        padding: 10,
    },

    iOSAlertBox: {
        maxWidth: 270,
        width: '100%',
        zIndex: 10,
        borderRadius: 13,
        justifyContent: 'space-around',
    },
    iOSTitle: {
        paddingTop: 12,
        paddingRight: 16,
        paddingBottom: 7,
        paddingLeft: 16,
        marginTop: 8,
        textAlign: 'center',
    },
    iOSMessage: {
        paddingTop: 0,
        paddingRight: 16,
        paddingBottom: 21,
        paddingLeft: 16,
        textAlign: 'center',
    },
    iOSButtonGroup: {
        marginRight: -0.55,
    },
    iOSButton: {
        borderTopColor: '#dbdbdf',
        borderTopWidth: 0.55,
        borderStyle: 'solid',
    },
    iOSButtonInner: {
        minHeight: 44,
        justifyContent: 'center',
    },
    dropDownContainer: {
    },
    input: {
      height: 50,
      margin: 12,
      borderWidth: 1,
      borderRadius: 10,
      padding: 15,
    },
});

export default UserInputPopup;
