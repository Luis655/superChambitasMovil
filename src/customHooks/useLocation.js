import { useEffect, useState } from "react";
import * as Location from 'expo-location';

export const useLocation = ()=>{
    const [location, setLocation] = useState(null);
    const [status, setStatus] = useState(Location.PermissionStatus.DENIED)
    const [errorMsg, setErrorMsg] = useState(null);

    async function requestLocationPermission() {
      console.log("hola")
        try {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== Location.PermissionStatus.GRANTED) {
            setErrorMsg('Permiso para acceder a la ubicación denegado');
            console.error('Permiso para acceder a la ubicación denegado');
            return;
          }
          setStatus(Location.PermissionStatus.GRANTED)
          let location = await Location.getCurrentPositionAsync();
          const { latitude, longitude } = location.coords;
          setLocation({ latitude, longitude });
        } catch (err) {
          setErrorMsg('No se pudo obtener la ubicación. Inténtalo de nuevo.');
          console.error('No se pudo obtener la ubicación. Inténtalo de nuevo.');

        }
      }

    useEffect(()=>{
        requestLocationPermission()
    },[])

    return {location, status, errorMsg, requestLocationPermission}
}