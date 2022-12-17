import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
    },
    imageBG:{
      flex: 1,
      resizeMode: 'center',
      justifyContent: 'flex-end',
    },
    avatar: {
      marginTop: -60,
      width: 120,
      height: 120,
      borderRadius: 16,
    },
    title: {
      marginVertical: 32,
      // fontFamily: 'Roboto-Bold',
      fontSize: 30,
      lineHeight: 35,
      textAlign: 'center',
    },
    form: {
      paddingHorizontal: 16,
      backgroundColor: '#ffffff',
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      alignItems: 'center',
    },
    image: {
      alignSelf: 'center',
    },
    icon: {
      width: 40,
      height: 40,
      padding: 8,
    },
    plusIcon: {
      width: 70,
      height: 40,
    },
    input: {
      padding: 16,
      marginBottom: 16,
      width: '100%',
      // fontFamily: 'Roboto-Regular',
      fontSize: 16,
      height: 50,
      borderWidth: 1,
      borderColor: '#E8E8E8',
      backgroundColor: '#F6F6F6',
      borderRadius: 8,
    },
    text: {
      color: '#ffffff',
      fontSize: 16,
      textAlign: 'center',
    },
    btn: {
      // fontFamily: 'Roboto-Regular',
      marginTop: 35,
      marginBottom: 16,
      paddingVertical: 16,
      paddingHorizontal: 32,
      width: '100%',
      borderRadius: 100,
      backgroundColor: '#FF6C00',
    },
});