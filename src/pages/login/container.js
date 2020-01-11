import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import {actionCreator, ActionTypes} from '../../AppActions';
import Login from '.';
import {DashboardActionTypes} from '../dashboard/actions';
import {Alert} from 'react-native';

const mapStateToProps = state => ({});

const mapDispatchToProps = (dispatch, _) => ({
  async doLogin(credentials, onError) {
    try {
      if (
        credentials.username == 'Martin' &&
        credentials.password == 'Martin'
      ) {
        AsyncStorage.setItem('token', '200')
          .then(() => dispatch(actionCreator(DashboardActionTypes.LOAD_DATA)))
          .catch(error => console.debug(error))
          .finally(_ => dispatch(actionCreator(ActionTypes.LOGIN)));
      } else {
        Alert.alert('Not authorized user', 'Try again');
        dispatch(actionCreator(ActionTypes.LOGOUT));
      }
    } catch (error) {
      onError(error);
    }
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
