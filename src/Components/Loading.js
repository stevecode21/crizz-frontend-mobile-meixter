import React from 'react';
import { View, Modal, ActivityIndicator } from 'react-native';
import colors from '../Themes/Colors';

export default function Loader(props) {
  const { visible } = props
  return (
    <Modal transparent={true} animationType={'none'} visible={visible}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'space-around',
          backgroundColor: colors.transparentLight,
        }}
      >
        <ActivityIndicator
          size="large"
          color={colors.cyan}
        />
      </View>
    </Modal>
  );
}
