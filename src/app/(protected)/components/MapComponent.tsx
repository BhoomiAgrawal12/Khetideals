"use client";
import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
import FarmerDashboard from "./FarmerDashboard";
import { getAllCoordinates } from "../../../../data/user";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetinaUrl.src,
  iconUrl: iconUrl.src,
  shadowUrl: shadowUrl.src,
});

interface Coordinate {
  id: string;
  latitude: string;
  longitude: string;
}

const MapComponent: React.FC = () => {
  const mapRef = useRef<L.Map | null>(null);
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [coordinates, setCoordinates] = useState<Coordinate[]>([]);
  const [searchResults, setSearchResults] = useState<Coordinate[]>([]);
  const circleRef = useRef<L.Circle | null>(null); // Reference for the circle

  const addMarkers = (data: Coordinate[]) => {
    if (mapRef.current) {
      data.forEach((coord) => {
        const lat = parseFloat(coord.latitude);
        const lng = parseFloat(coord.longitude);

        // Check if lat and lng are valid numbers
        if (!isNaN(lat) && !isNaN(lng)) {
          L.marker([lat, lng])
            .addTo(mapRef.current!)
            .openPopup()
            .on("click", () => {
              window.location.href = `/users/${coord.id}`;
            });
        } else {
          console.error(
            `Invalid coordinates for id ${coord.id}: (${coord.latitude}, ${coord.longitude})`
          );
        }
      });
    }
  };

  useEffect(() => {
    const fetchCoordinates = async (): Promise<void> => {
      try {
        const response = await fetch("/api/dashboard");
        const data: Coordinate[] = await response.json();
        setCoordinates(data);
        setSearchResults(data); // Set initial search results to all coordinates
      } catch (error) {
        console.error("Error fetching coordinates:", error);
      }
    };

    const initializeMap = (latitude: number, longitude: number) => {
      if (!mapRef.current) {
        const map = L.map("map").setView([latitude, longitude], 13);
        mapRef.current = map;

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "© Kethideal contributors",
        }).addTo(map);

        L.marker([latitude, longitude])
          .addTo(map)
          .bindPopup("I am here")
          .openPopup();

        // Add a circle around the current location
        L.circle([latitude, longitude], {
          color: "blue",
          fillColor: "#f03",
          fillOpacity: 0.5,
          radius: 500, // Adjust radius as needed
        }).addTo(map);

        map.on("click", (event: L.LeafletMouseEvent) => {
          const latLng = event.latlng;
          map.flyTo(latLng, 13);
        });

        // Add initial markers
        addMarkers(coordinates);
      }
    };

    fetchCoordinates();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setPosition([latitude, longitude]);
          initializeMap(latitude, longitude);
        },
        (error) => {
          console.error(error);
          alert("Unable to retrieve your location.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (mapRef.current) {
      // Remove existing markers
      mapRef.current.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          mapRef.current?.removeLayer(layer);
        }
      });

      // Add new markers based on search results
      addMarkers(searchResults);

      // Re-center the map to the first result in the filtered list and draw a circle
      if (searchResults.length > 0) {
        const firstResult = searchResults[0];
        const lat = parseFloat(firstResult.latitude);
        const lng = parseFloat(firstResult.longitude);

        // Check if lat and lng are valid numbers
        if (!isNaN(lat) && !isNaN(lng)) {
          mapRef.current.setView([lat, lng], 13); // Adjust zoom level if needed

          // Remove existing circle
          if (circleRef.current) {
            mapRef.current.removeLayer(circleRef.current);
          }

          // Add a new circle around the first filtered result
          circleRef.current = L.circle([lat, lng], {
            color: "blue",
            fillColor: "#30f",
            fillOpacity: 0.4,
            radius: 5000, // Adjust radius as needed
          }).addTo(mapRef.current);
        } else {
          console.error(
            `Invalid coordinates for first search result: (${firstResult.latitude}, ${firstResult.longitude})`
          );
        }
      }
    }
  }, [searchResults]);

  return (
    <div className="flex flex-col w-full">
      {/* Side bar */}
      <div>
        <FarmerDashboard onSearchResults={setSearchResults} />
      </div>

      {/* Map */}
      <div
        id="map"
        style={{ height: "100vh", width: "100%" }}
        className="flex justify-center items-center"
      >
        {!position && <p className="font-extrabold">Loading map...</p>}
      </div>
    </div>
  );
};

export default MapComponent;
