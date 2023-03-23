import React from 'react';

import {COLORS} from '../../resources/colors';
import {ClipboardMessageView} from './children/MessageContainer';
import {ClipboardCitySelectionView} from './children/CitySelectionContainer';

export const ClipboardMessageContainer = props => {
  if (props.chosenMessage.isResend) {
    return (
      <ClipboardMessageView
        name={'arrow-redo-outline'}
        color={COLORS.orangeRed}
        dialogName={props.dialogName}
        chosenMessage={props.chosenMessage}
        clearClipboard={props.clearClipboard}
      />
    );
  } else if (props.chosenMessage.inAStateOfEdit) {
    return (
      <ClipboardMessageView
        name={'pencil-outline'}
        color={COLORS.limeGreen}
        dialogName={props.dialogName}
        chosenMessage={props.chosenMessage}
        clearClipboard={props.clearClipboard}
      />
    );
  } else if (props.chosenMessage.sentToAnotherDialog) {
    return (
      <ClipboardMessageView
        name={'arrow-forward-outline'}
        color={'white'}
        dialogName={props.chosenMessage.resendedDialogName}
        chosenMessage={props.chosenMessage}
        clearClipboard={props.clearClipboard}
      />
    );
  } else if (props.isWeather) {
    return (
      <ClipboardCitySelectionView
        selectCity={props.selectCity}
        clearClipboard={props.clearClipboard}
        loadingStatus={props.loadingStatus}
      />
    );
  }
};
