import React, {PureComponent} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {BarChart} from 'react-native-chart-kit';
import {NavigationNativeContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import IonIcons from 'react-native-vector-icons/Ionicons';
import GRADES from '../../grades/list/GradesList';
import CustomAppBar from '../../components/CustomAppBar';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  function Item({
    id,
    title,
    semester,
    grade,
    credits,
    status,
    note,
    date,
    selected,
    onSelect,
  }) {
    return (
      <TouchableOpacity onPress={() => onSelect(id)} style={[styles.item]}>
        <View style={styles.item}>
          <Text style={styles.title}>{title}</Text>
          {selected ? <Text>Semester: {semester}</Text> : null}
          <Text>Grade: {grade}</Text>
          <Text>Credits: {credits}</Text>
          {selected ? <Text>Status: {status}</Text> : null}
          {selected ? <Text>Note: {note}</Text> : null}
          {selected ? <Text>Date: {date}</Text> : null}
        </View>
      </TouchableOpacity>
    );
  }
  const [selected, setSelected] = React.useState(new Map());
  const onSelect = React.useCallback(
    id => {
      const newSelected = new Map(selected);
      newSelected.set(id, !selected.get(id));

      setSelected(newSelected);
    },
    [selected],
  );
  this.gradeData = GRADES;
  var refresh = false;
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={gradeData}
        renderItem={({item}) => (
          <Item
            id={item.id}
            title={item.name}
            semester={item.semester}
            grade={item.grade}
            credits={item.credits}
            status={item.status}
            note={item.note}
            date={item.date}
            selected={!!selected.get(item.id)}
            onSelect={onSelect}
          />
        )}
        keyExtractor={item => item.id}
        extraData={selected}
        onRefresh={() => (refresh = false)}
        refreshing={refresh}
      />
    </SafeAreaView>
  );
};

const FeedScreen = ({navigation}) => {
  const barData = {
    labels: GRADES.map(getFullName),
    datasets: [
      {
        data: GRADES.map(getGrades),
      },
    ],
  };
  const chartConfig = {
    backgroundColor: '#e26a00',
    backgroundGradientFrom: '#fb8c00',
    backgroundGradientTo: '#ffa726',
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 3,
    barPercentage: 1,
    style: {
      borderRadius: 16,
    },
  };

  function getFullName(item) {
    var fullname = item.name.split(' ')[0];
    return fullname;
  }
  function getGrades(item) {
    var grade = parseFloat(item.grade.replace(/,/g, '.'));
    return grade;
  }
  function getCredits(item) {
    var credits = parseFloat(item.credits.replace(/,/g, '.'));
    return credits;
  }

  function computeAverage(currentGrades) {
    const arrSum = currentGrades.reduce((a, b) => a + b, 0);
    var avgGrade = arrSum / currentGrades.length;
    return avgGrade.toFixed(2);
  }

  function totalCredits(credits) {
    return (creditsSum = credits.reduce((a, b) => a + b, 0));
  }

  return (
    <View>
      <View>
        <BarChart
          data={barData}
          width={Dimensions.get('window').width}
          height={Dimensions.get('window').height - 400}
          chartConfig={chartConfig}
          verticalLabelRotation={-90}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>
      <View>
        <Text>Grade average:{computeAverage(GRADES.map(getGrades))}</Text>
      </View>
      <View>
        <Text> Total of credits: {totalCredits(GRADES.map(getCredits))}</Text>
      </View>
    </View>
  );
};

const HomeTabNavigator = ({navigation, route}) => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconName;
          if (route.name == 'Grades') {
            iconName = 'ios-home';
          } else if (route.name == 'Statistics') {
            iconName = 'logo-rss';
          }
          return <IonIcons name={iconName} size={size} color={color} />;
        },
      })}>
      <Tab.Screen name="Grades" component={HomeScreen} />
      <Tab.Screen name="Statistics" component={FeedScreen} />
    </Tab.Navigator>
  );
};

export default class Dashboard extends PureComponent {
  render() {
    const {loading, error_occured, data} = this.props.dashboardState;
    return (
      <NavigationNativeContainer>
        <CustomAppBar onLogout={this.props.doLogout} />
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Home" component={HomeTabNavigator} />
        </Stack.Navigator>
      </NavigationNativeContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    //backgroundColor: '#ececec',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    //marginHorizontal: 16,
  },
  title: {
    fontSize: 25,
  },
});
