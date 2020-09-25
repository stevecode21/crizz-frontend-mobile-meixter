import {StyleSheet} from 'react-native';
import colors from '../../Themes/Colors';
import fonts from '../../Themes/Fonts';

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewView: {
    flex: 1,
    alignItems: 'flex-start',
    backgroundColor: colors.transparentLight
  },
  scroll:{
    width: '100%',
    height: '100%',
  },
  backgroundVideo:{
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    right: 0,
    position:'absolute'
  },
  linearGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
    elevation:2,
    zIndex:1
  },
  loader: {
    marginTop: 10,
    alignItems: "center"
  }
});

export default style