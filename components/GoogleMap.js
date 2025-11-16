import { useEffect, useRef } from "react";

export default function GoogleMap({
  center = { lat: 12.9716, lng: 77.5946 }, // Default: Bangalore
  zoom = 12,
  markers = [],
  height = "400px",
  showDirections = false,
  waypoints = [],
}) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const directionsRendererRef = useRef(null);

  useEffect(() => {
    // Load Google Maps API if not already loaded
    if (!window.google) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      document.head.appendChild(script);
    } else {
      initMap();
    }

    return () => {
      // Cleanup markers
      markersRef.current.forEach((marker) => marker.setMap(null));
      if (directionsRendererRef.current) {
        directionsRendererRef.current.setMap(null);
      }
    };
  }, []);

  useEffect(() => {
    if (mapInstanceRef.current) {
      updateMarkers();
    }
  }, [markers]);

  useEffect(() => {
    if (mapInstanceRef.current && showDirections && waypoints.length > 0) {
      showRoute();
    }
  }, [showDirections, waypoints]);

  const initMap = () => {
    if (!mapRef.current) return;

    const map = new window.google.maps.Map(mapRef.current, {
      center,
      zoom,
      mapTypeControl: true,
      streetViewControl: false,
      fullscreenControl: true,
    });

    mapInstanceRef.current = map;
    updateMarkers();

    if (showDirections && waypoints.length > 0) {
      showRoute();
    }
  };

  const updateMarkers = () => {
    // Clear existing markers
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];

    // Add new markers
    markers.forEach((markerData) => {
      const marker = new window.google.maps.Marker({
        position: { lat: markerData.lat, lng: markerData.lng },
        map: mapInstanceRef.current,
        title: markerData.title,
        icon: markerData.icon || null,
      });

      // Add info window if description exists
      if (markerData.description) {
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="padding: 10px;">
              <h3 style="font-weight: bold; margin-bottom: 5px;">${markerData.title}</h3>
              <p style="margin: 0;">${markerData.description}</p>
            </div>
          `,
        });

        marker.addListener("click", () => {
          infoWindow.open(mapInstanceRef.current, marker);
        });
      }

      markersRef.current.push(marker);
    });

    // Fit bounds to show all markers
    if (markers.length > 1) {
      const bounds = new window.google.maps.LatLngBounds();
      markers.forEach((marker) => {
        bounds.extend({ lat: marker.lat, lng: marker.lng });
      });
      mapInstanceRef.current.fitBounds(bounds);
    }
  };

  const showRoute = () => {
    if (!window.google || waypoints.length < 2) return;

    // Clear existing directions
    if (directionsRendererRef.current) {
      directionsRendererRef.current.setMap(null);
    }

    const directionsService = new window.google.maps.DirectionsService();
    const directionsRenderer = new window.google.maps.DirectionsRenderer({
      map: mapInstanceRef.current,
      suppressMarkers: false,
    });

    directionsRendererRef.current = directionsRenderer;

    const origin = waypoints[0];
    const destination = waypoints[waypoints.length - 1];
    const intermediateWaypoints = waypoints.slice(1, -1).map((point) => ({
      location: { lat: point.lat, lng: point.lng },
      stopover: true,
    }));

    directionsService.route(
      {
        origin: { lat: origin.lat, lng: origin.lng },
        destination: { lat: destination.lat, lng: destination.lng },
        waypoints: intermediateWaypoints,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK") {
          directionsRenderer.setDirections(result);
        } else {
          console.error("Directions request failed:", status);
        }
      }
    );
  };

  return (
    <div
      ref={mapRef}
      style={{
        width: "100%",
        height,
        borderRadius: "8px",
        overflow: "hidden",
      }}
      className="shadow-md"
    />
  );
}
