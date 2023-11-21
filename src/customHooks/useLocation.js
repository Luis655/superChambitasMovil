import { useEffect, useState } from "react";
import * as Location from 'expo-location';

export const useLocation = ()=>{
    const [location, setLocation] = useState(null);
    const [status, setStatus] = useState(Location.PermissionStatus.DENIED)
    const [errorMsg, setErrorMsg] = useState(1);
    const [estadomsg, setEstadomsg] = useState(false);


    async function requestLocationPermission() {
    console.log("hola")

        try {
          setErrorMsg(1);
          setEstadomsg(true);

          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== Location.PermissionStatus.GRANTED) {
            console.error('Permiso para acceder a la ubicación denegado');
            return;
          }
          setStatus(Location.PermissionStatus.GRANTED)
          let location = await Location.getCurrentPositionAsync();
          const { latitude, longitude } = location.coords;
          setLocation({ latitude, longitude });
        } catch (err) {
          console.error(err)
          setErrorMsg(2);
          setEstadomsg(true);
          console.error('No se pudo obtener la ubicación. Inténtalo de nuevo.');
        }finally{
          setEstadomsg(false);
        }
      }

    useEffect(()=>{
        requestLocationPermission()
    },[])

    return {location, status, errorMsg, estadomsg, requestLocationPermission}
}