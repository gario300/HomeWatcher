import React, { useState, useEffect } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { Button, TextInput, Layout, useTheme } from 'react-native-rapi-ui';
import MapView from 'react-native-maps';
import { homeStyles } from "./HomeStyles";
import Loading from '../../components/Loading'
import * as Location from 'expo-location';
import { RENDER_MESSAGE } from "../../redux/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  getAuth,
  onAuthStateChanged
} from 'firebase/auth';
import QueriyingClass from "../../shared/utils/queriyingClass"
import LoadingModal from '../../components/LoadingModal'
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot
} from 'firebase/firestore'
import { RootState } from "../../redux/store";
import {alterUser} from "../../redux/actions/alterUser";
import Constants from 'expo-constants'
import GeoCoding from "../../shared/utils/geoCoding"
import geoCoding from "../../shared/utils/geoCoding";
interface latLngTypes {
  lat: number;
  lng: number;
}

interface userTypes {
  email: string;
  uid: string;
}
const HomeScreen = () => {
  const [locationPermission, setLocationPermission] = useState<boolean>(false);
  const [latLng, setLatLng] = useState<latLngTypes>({ lat: 0, lng: 0});
  const [dangerMode, setDangerMode] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector<userTypes, RootState>(( state ) => ({ user: alterUser(state).user })) 
  
  const dispach = useDispatch()  

  useEffect(() => {
    requestLocation()
  },[]);
  
  const liveUpdate = async() => {
    const db = getFirestore()
    const auth = getAuth()
    onAuthStateChanged(auth, u => {
      if (u) {
        const q = query(
          collection(db, 'emergencesColection'),
          where('user_id', '==', u.uid),
          where('type', '==', 'PANIC')
        )
        interface emergenceMessagesTypes {
          A: string;
          P: string;
          D: string;
          E: string;
          [key: string] : string;
        }
        const emergenceMessages : emergenceMessagesTypes  = {
          A: 'Su emergencia está siendo adendida',
          P: 'Un supervisor está en camino',
          D: 'El supervisor está dentro de su perimetro',
          E: 'La emergencia fue atendida'
        }
        onSnapshot(q, (snapshot) => {
          snapshot.docChanges().forEach((change) => {
            switch (change.type) {
              case 'added':
                if (change.doc.data().status !== 'E') {
                  setDangerMode(true)
                }
                break
              case 'modified':
                dispach({ message: { show: true, message: emergenceMessages[change.doc.data().status], status: 'S' }, type: RENDER_MESSAGE })
                if (change.doc.data().status === 'E') {
                  setDangerMode(false)
                }
              break
            }
          })
        })
        
      }
    })
  }
  const requestLocation = async() => {
    let permission = await Location.requestForegroundPermissionsAsync();
    if (permission.status !== 'granted') {
        dispach({ message: { show: true, message: 'Necesitamos tu permiso para monitorear tu seguridad', status: 'N' }, type: RENDER_MESSAGE })
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLatLng({lat: location.coords.latitude, lng: location.coords.longitude})
    setLocationPermission(true)
    liveUpdate()
  }

  const calcCrow = (lat1:number, lon1:number, lat2:number, lon2:number) => {
    let R = 6371; // km
    let dLat = toRad(lat2-lat1);
    let dLon = toRad(lon2-lon1);
    lat1 = toRad(lat1);
    lat2 = toRad(lat2);

    let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    let d = R * c;
    return d;
  }

  const toRad = (Value:number) => {
    return Value * Math.PI / 180;
  }

  const enterAlertMode = async() => {
    setLoading(true)
    const userData = getAuth()
    const userId : string = userData!.currentUser!.uid
    const verify : any = await QueriyingClass.findByTwo('emergencesColection', [
      { where: 'user_id', operator: '==',  clause: userId },
      { where: 'type', operator: '==', clause: 'PANIC'}
    ])
    const filterType = verify.filter( (item : { status:string }) => item.status !== 'E')
    if (dangerMode || filterType.length > 0) {
      try {
        await QueriyingClass.deleteData('emergencesColection', filterType[0].id)
        setLoading(false)
        dispach({ message: { show: true, message: 'Saliste del modo de emergencia', status: 'S' }, type: RENDER_MESSAGE })
        setDangerMode(false)
      } catch (e) {
        setLoading(false)
      }
      return
    }
    try {
      if (filterType.length !== 0) {
        setLoading(false)
        dispach({ message: { show: true, message: 'Ya tienes una emergencia en proceso', status: 'N' }, type: RENDER_MESSAGE }) 
        return
      }
      let location = await Location.getCurrentPositionAsync({});
      const userQuery:any = 
        await QueriyingClass.findByOne('usersColection', { where: 'email', operator: '==', clause: userData!.currentUser!.email })
      const address = await geoCoding.reverseGeoCoding(location.coords.latitude, location.coords.longitude, Constants.manifest!.extra!.GOOGLE_CLOUD)
      await QueriyingClass.addData('emergencesColection',{
        user_id: userId,
        lat: location.coords.latitude,
        lng: location.coords.longitude,
        supevisor_id: '',
        status: 'S',
        type: 'PANIC',
        name: userQuery[0].name,
        lastName: userQuery[0].lastName,
        address: address
      }) 
      setLatLng({lat: location.coords.latitude, lng: location.coords.longitude})
      setLoading(false)
      dispach({ message: { show: true, message: 'Acabas de entrar en modo de emergencia', status: 'S' }, type: RENDER_MESSAGE }) 
      setDangerMode(true)
    } catch (e) {
      setLoading(false)
      console.log(e)
    }
  }
  return (
    <Layout>
      <LoadingModal
        show={loading}
      />
      {
        !locationPermission &&
          <Loading/>
      }
      {
        locationPermission &&
        <View
          style={homeStyles.container}
        >
          <MapView
            style={homeStyles.mapView}
            region={{
              latitude: latLng.lat,
              longitude: latLng.lng,
              latitudeDelta: 0.0922, 
              longitudeDelta: 0.0421
            }}
            showsUserLocation={true}
          >
            <MapView.Circle
              center = {{
                latitude: latLng.lat,
                longitude: latLng.lng
              }}
              radius = { 2000 }
              strokeWidth = { 1 }
              strokeColor = { !dangerMode ? '#48C774' : '#F14668' }
              fillColor = { !dangerMode ? 'rgba(72,199,116,0.5)' : 'rgba(241,70,104,0.5)' }
            />
          </MapView>
          <View
            style={homeStyles.dangerButtonContainer}
          >
            <TouchableOpacity
              onLongPress={() => {
                enterAlertMode()
              }}
            >
              <View
                style={[homeStyles.buttonDanger, { backgroundColor: dangerMode ? '#F14668' : '#48C774'}]}
              >
                <Image
                  source={require('../../../assets/alert.png')}
                  style={[homeStyles.imageAlert, { tintColor: !dangerMode ? '#F14668' : '#48C774'}]}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      }
    </Layout>
  )
}

export default HomeScreen
