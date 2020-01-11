import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import {actionCreator, ActionTypes} from '../../AppActions';
import {Alert} from 'react-native';
import Dashboard from '.';

const mapStateToProps = state => ({
  dashboardState: state.dashboardState,
  appState: state.appState,
});

const mapDispatchToProps = (dispatch, _) => ({
  doLogout() {
    Alert.alert(
      'Confirm Action',
      'You are about to logout from this device, continue with action?',
      [
        {
          text: 'Logout',
          onPress: () =>
            AsyncStorage.removeItem('token').then(() =>
              dispatch(actionCreator(ActionTypes.LOGOUT)),
            ),
        },
      ],
      {cancelable: true},
    );
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
