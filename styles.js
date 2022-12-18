import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
    },
    imageBG:{
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'flex-end',
    },
    avatar: {
      marginTop: -60,
      width: 120,
      height: 120,
      borderRadius: 16,
      backgroundColor: '#D3D3D3',
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
      resizeMode: 'contain',
      width: '100%',
      height: '100%',
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
    camera: {
      height: 240,
      marginTop: 32,
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 16,
      borderColor: 'red',
      borderWidth: 5,
      borderRadius: 8,
    },
    takePhotoView: {
      position: 'absolute',
      top: 32,
      left: 16,
    },
    snapContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 60,
      height: 60,
      borderRadius: 50,
      backgroundColor: '#ffffff',
    },
    snap: {
      width: 24,
      height: 24,
    },
    map: {
      flex: 1,
    }
});