import { useEffect, useState } from "react";
import * as Location from 'expo-location';

export const useLocation = ()=>{
    const [location, setLocation] = useState(null);
    const [status, setStatus] = useState(Location.PermissionStatus.DENIED)
    async function requestLocationPermission() {
        try {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== Location.PermissionStatus.GRANTED) {
            console.error('Permiso para acceder a la ubicación denegado');
            return;
          }
          let location = await Location.getCurrentPositionAsync();
          const { latitude, longitude } = location.coords;
          setLocation({ latitude, longitude });
        } catch (err) {
          console.warn("pito error " + err);
        }
      }

    useEffect(()=>{
        requestLocationPermission()
    },[])

    return {location,status}
}