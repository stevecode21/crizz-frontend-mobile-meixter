import React from 'react';
import Toast from 'react-native-tiny-toast';
import colors from '../Themes/Colors';

let toast;

export default function showToast(message, type, duration = 5000) {
  Toast.show(message, {
    position: 24,
    duration: duration,
    textColor: colors.white,
    containerStyle: {
      backgroundColor:
        type == 'success'
          ? colors.cyan
          : type == 'error'
          ? colors.fucsia
          : type == 'info'
          ? colors.lila
          : 'white',

      borderRadius: 0,
      padding: 15,
      margin: 0,
      width: '100%',
    },
  });
}

export function hideLoading() {
  Toast.hide(toast);
}

export function showLoading(message = '') {
  toast = Toast.showLoading(message, {
    position: 0,
    containerStyle: {
      padding: 30,
      backgroundColor: 'rgba(0,0,0, 0.7)',
    },
    textColor: 'white',
    textstyle: {fontSize: 16},
    // maskColor:'rgba(10, 10, 10, 0.5)'
  });
}

export function showErrorToast(message) {
  showToast(message, 'error');
}

export function showSuccessToast(message) {
  showToast(message, 'success');
}

export function showInfoToast(message) {
  showToast(message, 'info');
}
