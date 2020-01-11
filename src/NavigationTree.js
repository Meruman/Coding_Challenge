import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Auth from './pages/auth';
import Login from './pages/login/container';
import Dashboard from './pages/dashboard/container';

const AuthStack = createStackNavigator(
  {Login, Auth},
  {
    headerMode: 'none',
    initialRouteName: 'Auth',
  },
);

const DashboardStack = createStackNavigator(
  {
    Dashboard,
  },
  {
    headerMode: 'none',
    initialRouteName: 'Dashboard',
  },
);

const AppStack = isLoggedIn =>
  createSwitchNavigator(
    {
      Auth: AuthStack,
      Dashboard: DashboardStack,
    },
    {
      backBehavior: 'initialRoute',
      initialRouteName: isLoggedIn ? 'Dashboard' : 'Auth',
    },
  );

export default createRootNavigation = isLoggedIn =>
  createAppContainer(AppStack(isLoggedIn));
