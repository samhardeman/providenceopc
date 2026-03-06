"use client";

import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { SMALL_GROUPS } from "@/data/small-groups";

// Create a custom SVG marker using your exact theme color (#171717)
const darkMarkerHtml = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#171717" width="36px" height="36px">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
  </svg>
`;

const customDarkIcon = L.divIcon({
  html: darkMarkerHtml,
  className: "", // Leave empty to remove default Leaflet background styles
  iconSize: [36, 36],
  iconAnchor: [18, 36], // Anchors the bottom tip of the pin to the exact coordinate
  popupAnchor: [0, -36], // Opens the popup right above the pin
});

export default function GroupsMap() {
  return (
    <div className="w-full h-[350px] md:h-[450px] rounded-sm overflow-hidden border border-neutral-900/10 z-0 relative mt-8">
      <MapContainer 
        center={[33.5, -111.95]} 
        zoom={10} 
        scrollWheelZoom={false} 
        className="w-full h-full bg-[#FAFAF7]" // Added matching background color behind the map tiles
      >
        {/* CartoDB Positron (Light) */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        
        {SMALL_GROUPS.map((group) => (
          <Marker key={group.id} position={[group.lat, group.lng]} icon={customDarkIcon}>
            <Popup className="font-sans text-neutral-900 rounded-sm">
              <strong className="font-serif text-lg block mb-1 leading-tight">{group.name}</strong>
              <span className="block text-sm mb-1">{group.time}</span>
              <span className="block text-xs text-neutral-500 uppercase tracking-wider mt-2 border-t border-neutral-200 pt-2">
                Leader: {group.leader}
              </span>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}