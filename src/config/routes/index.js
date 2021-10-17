import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import Beranda from '../../pages/Beranda';
import BarangHilang from '../../pages/BarangHilang';
import BarangTemuan from '../../pages/BarangTemuan';
import PencarianDisimpan from '../../pages/PencarianDisimpan';
import ModalFilter from '../../pages/ModalFilter';
import DetailItem from '../../pages/DetailItem';
import SignIn from '../../pages/auth/SignIn';
import SignUp from '../../pages/auth/SignUp';
import {AuthContext} from '../../context/auth/AuthContextProvider';
import {Spinner, Text} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CreateBarangHilang} from '../../pages/CreateBarangHilang';
import {CreateBarangTemuan} from '../../pages/CreateBarangTemuan';
import MyIcon from '../../components/atoms/MyIcon';
import MyDate from '../../pages/MyDate';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export const FilterContext = createContext();
function BerandaStack() {
  const initialfilterState = {
    keyword: '',
    locationId: null,
    provinceId: null,
    regencyId: null,
  };

  const searchReducer = (state = initialfilterState, action) => {
    switch (action.type) {
      case 'SET_KEYWORD':
        return {
          ...state,
          keyword: action.keyword,
        };
      case 'SET_LOCATION_ID':
        return {
          ...state,
          locationId: action.locationId,
        };
      case 'SET_PROVINCE_ID':
        return {
          ...state,
          provinceId: action.provinceId,
        };
      case 'SET_REGENCY_ID':
        return {
          ...state,
          regencyId: action.regencyId,
        };
      default:
        return state;
    }
  };

  const [filterState, dispatch] = useReducer(searchReducer, initialfilterState);
  return (
    <FilterContext.Provider value={{filterState, dispatch}}>
      <Stack.Navigator>
        <Stack.Group>
          <Stack.Screen name="StackBeranda" component={Beranda} />
          <Stack.Screen name="DetailItem" component={DetailItem} />
        </Stack.Group>
        <Stack.Group screenOptions={{presentation: 'modal'}}>
          <Stack.Screen
            name="ModalFilter"
            component={ModalFilter}
            options={{title: 'Filter Item'}}
          />
        </Stack.Group>
      </Stack.Navigator>
    </FilterContext.Provider>
  );
}

const BarangHilangStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="BarangHilang" component={BarangHilang} />
      <Stack.Screen name="CreateBarangHilang" component={CreateBarangHilang} />
    </Stack.Navigator>
  );
};

const BarangTemuanStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BarangTemuan"
        component={BarangTemuan}
        options={({navigation}) => ({
          title: 'Barang Temuan',
          headerLeft: () => (
            <MyIcon
              name="menu"
              size={25}
              style={{marginLeft: 10}}
              onPress={() => navigation.openDrawer()}
            />
          ),
        })}
      />
      <Stack.Screen
        name="CreateBarangTemuan"
        component={CreateBarangTemuan}
        options={{title: 'Buat Barang Temuan'}}
      />
    </Stack.Navigator>
  );
};

function MyDrawer({signOut}) {
  return (
    <Drawer.Navigator initialRouteName="Beranda">
      <Drawer.Screen
        name="Beranda"
        component={BerandaStack}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="BarangHilangDrawer"
        component={BarangHilangStack}
        options={{headerTitle: 'Barang Hilang', drawerLabel: 'Barang Hilang'}}
      />
      <Drawer.Screen
        name="BarangTemuanDrawer"
        component={BarangTemuanStack}
        options={{headerShown: false, drawerLabel: 'Barang Temuan'}}
      />
      <Drawer.Screen
        name="PencarianDisimpan"
        component={PencarianDisimpan}
        options={{
          headerTitle: 'Pencarian Disimpan',
          drawerLabel: 'Pencarian Disimpan',
        }}
      />
      <Drawer.Screen
        name="MyDate"
        component={MyDate}
        options={{
          headerTitle: 'MyDate',
          drawerLabel: 'MyDate',
        }}
      />
      <Drawer.Screen
        name="Logout"
        options={{headerShown: false}}
        component={() => {
          useEffect(() => {
            signOut();
          }, []);
          return <Spinner />;
        }}
      />
    </Drawer.Navigator>
  );
}

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Group>
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default function Routes() {
  const {authState, dispatch} = useContext(AuthContext);

  useEffect(async () => {
    let userToken = null;
    try {
      const getToken = await AsyncStorage.getItem('userToken');
      getToken && (userToken = getToken);
    } catch (error) {
      console.log('error restore token', error);
    }
    dispatch({type: 'RESTORE_TOKEN', userToken});
  }, []);

  const signOut = async () => {
    await AsyncStorage.removeItem('userToken');
    dispatch({type: 'SIGNOUT'});
  };

  if (authState.isLoading) {
    return <Spinner />;
  }

  return authState.userToken == null ? (
    <AuthStack />
  ) : (
    <MyDrawer signOut={signOut} />
  );
}
