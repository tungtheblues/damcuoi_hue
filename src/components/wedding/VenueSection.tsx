import { MapPin, Navigation } from "lucide-react";
import { useState } from "react";

// Sub-components for better organization
const LocationToggle = ({
  currentLocation,
  groomLocation,
  brideLocation,
  groomLocationMap,
  brideLocationMap,
  onLocationChange,
  onLocationMapChange,
}) => (
  <div className="pt-4 space-x-2 flex justify-center">
    <button
      className={`inline-flex items-center px-4 py-2 border rounded-md transition-colors ${
        currentLocation === groomLocation
          ? "bg-rose-600 text-white"
          : "border-rose-600 text-rose-600 hover:bg-rose-600 hover:text-white"
      }`}
      onClick={() => {
        onLocationChange(groomLocation);
        onLocationMapChange(groomLocationMap);
      }}
    >
      Nhà Trai
    </button>
    <button
      className={`inline-flex items-center px-4 py-2 border rounded-md transition-colors ${
        currentLocation === brideLocation
          ? "bg-rose-600 text-white"
          : "border-rose-600 text-rose-600 hover:bg-rose-600 hover:text-white"
      }`}
      onClick={() => {
        onLocationChange(brideLocation);
        onLocationMapChange(brideLocationMap);
      }}
    >
      Nhà gái
    </button>
  </div>
);

const WeddingCalendar = ({ ceremonyTime, highlightedDate }) => {
  const isMay = true; // We're always showing May now

  return (
    <div className="relative border-2 border-rose-200 rounded-lg p-5 bg-white shadow-lg">
      <div className="absolute inset-0 border-8 border-double border-rose-100 rounded-lg pointer-events-none"></div>
      <h3 className="text-center font-serif text-2xl mb-3 text-rose-800 font-medium tracking-wide">
        May 2025
      </h3>

      <div className="bg-gradient-to-br from-white to-rose-50 p-3 rounded-md shadow-inner">
        <div className="grid grid-cols-7 text-center gap-1">
          {/* Day Headers */}
          <div className="text-rose-600 font-medium">S</div>
          <div className="font-medium text-gray-700">M</div>
          <div className="font-medium text-gray-700">T</div>
          <div className="font-medium text-gray-700">W</div>
          <div className="font-medium text-gray-700">T</div>
          <div className="font-medium text-gray-700">F</div>
          <div className="text-blue-600 font-medium">S</div>

          {/* May Calendar Dates - Week 1 */}
          <div className="py-1 text-rose-600 text-sm opacity-40">27</div>
          <div className="py-1 text-gray-600 text-sm opacity-40">28</div>
          <div className="py-1 text-gray-600 text-sm opacity-40">29</div>
          <div className="py-1 text-gray-600 text-sm opacity-40">30</div>
          <div
            className={`py-1 relative ${
              highlightedDate === 1 ? "" : "text-gray-600 text-sm"
            }`}
          >
            {highlightedDate === 1 ? (
              <>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <svg
                    className="h-12 w-12 text-rose-500 opacity-85"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>
                <span className="relative inline-flex items-center justify-center h-9 w-9 text-white text-2xl font-bold z-10">
                  1
                </span>
              </>
            ) : (
              "1"
            )}
          </div>
          <div className="py-1 text-gray-600 text-sm">2</div>
          <div className="py-1 text-blue-600 text-sm">3</div>

          {/* Calendar Dates - Week 2 with highlighted date */}
          <div
            className={`py-1 relative ${
              highlightedDate === 4 ? "" : "text-rose-600 text-sm"
            }`}
          >
            {highlightedDate === 4 ? (
              <>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <svg
                    className="h-12 w-12 text-rose-500 opacity-85"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>
                <span className="relative inline-flex items-center justify-center h-9 w-9 text-white text-2xl font-bold z-10">
                  4
                </span>
              </>
            ) : (
              "4"
            )}
          </div>
          <div className="py-1 text-gray-600 text-sm">5</div>
          <div className="py-1 text-gray-600 text-sm">6</div>
          <div className="py-1 text-gray-600 text-sm">7</div>
          <div className="py-1 text-gray-600 text-sm">8</div>
          <div className="py-1 text-gray-600 text-sm">9</div>
          <div className="py-1 text-blue-600 text-sm">10</div>
        </div>
      </div>
    </div>
  );
};

const LocationDetails = ({ ceremonyTime, currentLocation, onNavigate }) => (
  <div className="mt-4">
    <div className="flex items-start gap-3">
      <svg
        className="h-5 w-5 text-rose-600 mt-1 flex-shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
      <div className="flex-grow">
        <p className="text-gray-700">
          <span className="font-medium">Join us for our ceremony:</span>{" "}
          {ceremonyTime}
        </p>
      </div>
    </div>
    <div className="flex items-start gap-3 mt-3">
      <MapPin className="h-5 w-5 text-rose-600 mt-1 flex-shrink-0" />
      <div className="flex-grow">
        <p className="text-gray-700">{currentLocation}</p>
      </div>
    </div>
    <div className="mt-3">
      <button
        className="bg-rose-500 border-rose-600 text-white hover:bg-rose-700 transition-colors duration-300 ease-in-out
                 py-2 px-4 rounded-full shadow-md flex items-center justify-center"
        onClick={onNavigate}
      >
        <Navigation className="mr-2 h-4 w-4" />
        Chỉ đường
      </button>
    </div>
  </div>
);

// Type definitions for props
interface VenueSectionProps {
  venueName?: string;
  venueDescription?: string;
  ceremonyTimeGroom?: string;
  ceremonyTimeBride?: string;
  receptionTime?: string;
  groomLocation?: string;
  groomLocationMap?: string;
  brideLocation?: string;
  brideLocationMap?: string;
  mapApiKey?: string;
}

const VenueSection = ({
  venueDescription = "Sự hiện diện của quý khách là lời chúc hạnh phúc và ý nghĩa nhất với hai bên gia đình.",
  ceremonyTimeGroom = "10:00 AM",
  ceremonyTimeBride = "10:30 AM",
  groomLocation = " Đội 1, Thuỷ Thành, Giao Châu, Giao Thuỷ, Nam Định",
  groomLocationMap = "Đội 1, Thuỷ Thành, Giao Châu, Giao Thuỷ, Nam Định",
  brideLocation = "Thôn Trà Đông, xã Tân Minh, huyện Tiên Lãng, TP Hải Phòng",
  brideLocationMap = "Thôn Trà Đông, xã Tân Minh, huyện Tiên Lãng, TP Hải Phòng",
  mapApiKey = "AIzaSyDFhsUtcRITpol9dDD3CMGPmoBKLYr1VQY", // Should be moved to env variables
}: VenueSectionProps) => {
  const [currentLocation, setCurrentLocation] = useState(brideLocation);
  const [currentLocationMap, setCurrentLocationMap] =
    useState(brideLocationMap);
  const [highlightedDate, setHighlightedDate] = useState(4); // Default to May 4 (bride)
  const [currentCeremonyTime, setCurrentCeremonyTime] =
    useState(ceremonyTimeBride);

  const handleLocationChange = (location: string) => {
    setCurrentLocation(location);
    // Update highlighted date based on location
    const isBrideLocation = location === brideLocation;
    setHighlightedDate(isBrideLocation ? 4 : 1);
    // Update ceremony time based on location
    setCurrentCeremonyTime(
      isBrideLocation ? ceremonyTimeBride : ceremonyTimeGroom
    );
  };

  const handleLocaltionMapChange = (locationMap: string) => {
    setCurrentLocationMap(locationMap);
  };

  const handleNavigate = () => {
    const navigationUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
      currentLocationMap
    )}`;
    window.open(navigationUrl);
  };

  return (
    <section id="venue" className="pb-20 bg-rose-50 text-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-serif text-center mb-12 text-rose-800">
          Sự kiện cưới
        </h2>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <LocationToggle
              currentLocation={currentLocation}
              groomLocation={groomLocation}
              groomLocationMap={groomLocationMap}
              brideLocation={brideLocation}
              brideLocationMap={brideLocationMap}
              onLocationChange={handleLocationChange}
              onLocationMapChange={handleLocaltionMapChange}
            />

            <div className="mt-6 max-w-md mx-auto">
              <WeddingCalendar
                ceremonyTime={currentCeremonyTime}
                highlightedDate={highlightedDate}
              />
              <LocationDetails
                ceremonyTime={currentCeremonyTime}
                currentLocation={currentLocation}
                onNavigate={handleNavigate}
              />
            </div>
          </div>

          <div className="rounded-lg overflow-hidden shadow-lg h-[450px]">
            <iframe
              src={`https://www.google.com/maps/embed/v1/place?key=${mapApiKey}&q=${encodeURIComponent(
                currentLocationMap
              )}`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Venue Location"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VenueSection;
