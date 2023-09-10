import {
  MapContainer,
  TileLayer,
  Marker,
  Popup
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster"

import React, { useEffect, useState, useContext } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import { useNavigate } from "react-router-dom/dist";
import AuthContext from "../../context/AuthContext";
import useService from "../../services/useService";
const MapOrders = () => {
  const navigate = useNavigate();
  const [markers, setMarkers] = useState([]);
  const customIcon = new Icon({
    iconUrl: require("./order-icon.png"),
    iconSize: [38, 38],
  });

  const {
    isLoading,
    statusCode,
    error,
    data,
    getSalesmanPendingOrders,
    clearRequest,
  } = useService();
  const { role } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  
  useEffect(() => {
    getSalesmanPendingOrders();
  }, [getSalesmanPendingOrders]);

  useEffect(() => {
    if (isLoading) {
      return;
    } else if (statusCode === 200 && !error && data) {
      setOrders(data.orders);
      clearRequest();
    } else if (statusCode !== 200 && error) {
      console.log(error);
    }
  }, [isLoading, data, statusCode, error, clearRequest]);

/*
 const orders = [
    {
      address: "Ilije Ognjanovica 14, Novi Sad, Srbija",
      //geocode: [48.86, 2.3522],
      popUp: "",
      id: 5,
    },

  ];
 */
  useEffect(() => {
 
    console.log(orders);
    if (orders) {
      const geocodePromises = orders.map((order) => {
        const geocodeUrl = 
            `${process.env.REACT_APP_GEOCODE_URL}?q=${encodeURIComponent(order.address)}&format=json`;

        return fetch(geocodeUrl)
          .then((response) => response.json())
          .then((data) => {
            if (data.length > 0) {
              const latitude = parseFloat(data[0].lat);
              const longitude = parseFloat(data[0].lon);
              return {
                id: order.id,
                geocode: [latitude, longitude],
                popUp: `Order: ${order.id}`,
              };
            } else {
              console.log(
                `No location found for address: ${order.address}`
              );
              return null;
            }
          })
          .catch((error) => {
            console.error("Error fetching geocode data:", error);
            return null;
          });
      });

      // Wait for all geocoding promises to resolve
      Promise.all(geocodePromises).then((markers) => {
        // Filter out any null markers (failed geocoding)
        const filteredMarkers = markers.filter((marker) => marker !== null);
        setMarkers(filteredMarkers);
      });
    }
  }, [orders]);

  const handleMarkerClick = (orderId) => {
    navigate("/finished-orders/" + orderId);
  };
  return (
    <MapContainer
      center={[44.7872, 20.4573]}
      zoom={13}
      className="leaflet-container"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MarkerClusterGroup>
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={marker.geocode}
            icon={customIcon}
            eventHandlers={{ click: () => handleMarkerClick(marker.id) }}
          >
            <Popup>{marker.popUp}</Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
};

export default MapOrders;
