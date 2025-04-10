// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import gmbCategories from '../../components/GmbCategoriesData';

// function SearchLeads() {
//     const [searchData, setSearchData] = useState({
//         type: "",
//         latitude: "",
//         longitude: "",
//         radius: 10
//     });
//     const [results, setResults] = useState([]);
//     const [showResults, setShowResults] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [suggestions, setSuggestions] = useState([]);
//     const navigate = useNavigate();
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setSearchData((prev) => ({ ...prev, [name]: value }));

//         if (name === "type") {
//             const filtered = gmbCategories
//                 .filter(category =>
//                     category.toLowerCase().includes(value.toLowerCase())
//                 )
//                 .sort();

//             setSuggestions(value ? filtered.slice(0, 10) : []);
//         }
//     };

//     const handleSelectSuggestion = (item) => {
//         setSearchData((prev) => ({ ...prev, type: item }));
//         setSuggestions([]);
//     };

//     const handleFetchLocation = () => {
//         if (navigator.geolocation) {
//             setLoading(true);
//             navigator.geolocation.getCurrentPosition(
//                 (position) => {
//                     const lat = position.coords.latitude.toFixed(6);
//                     const lng = position.coords.longitude.toFixed(6);

//                     setSearchData((prev) => ({
//                         ...prev,
//                         latitude: lat,
//                         longitude: lng
//                     }));

//                     setLoading(false);
//                 },
//                 (error) => {
//                     console.error("Error fetching location:", error);
//                     setError("Failed to fetch your location. Please check your permissions.");
//                     setLoading(false);
//                 }
//             );
//         } else {
//             setError("Geolocation is not supported by this browser.");
//         }
//     };

//     const fetchPlacesData = async () => {
//         try {
//             setLoading(true);
//             setError(null);
//             const lat = parseFloat(searchData.latitude);
//             const lng = parseFloat(searchData.longitude);
//             const radius = searchData.radius * 1000;
//             const keyword = encodeURIComponent(searchData.type);
//             const mockResponse = await simulateApiCall(lat, lng, radius, keyword);
//             if (mockResponse.status === "OK") {
//                 setResults(mockResponse.results);
//                 setShowResults(true);
//             } else {
//                 setError(`API status: ${mockResponse.status}`);
//             }
//             setLoading(false);
//         } catch (err) {
//             setError("Failed to fetch results.");
//             setLoading(false);
//         }
//     };


//     const simulateApiCall = async (lat, lng, radius, keyword) => {
//         await new Promise(resolve => setTimeout(resolve, 1000));
//         const mockPlaces = [];
//         const resultCount = Math.min(Math.floor(radius / 1000) + 3, 15);
//         for (let i = 0; i < resultCount; i++) {
//             const latOffset = (Math.random() - 0.5) * 0.05;
//             const lngOffset = (Math.random() - 0.5) * 0.05;
//             mockPlaces.push({
//                 place_id: `place_${i}_${Date.now()}`,
//                 name: `${keyword} ${['Service', 'Provider', 'Center', 'Shop', 'Solutions'][i % 5]} ${i + 1}`,
//                 vicinity: `${Math.floor(Math.random() * 100) + 1} ${['Main St', 'Park Ave', 'Market Rd', 'Gandhi Rd'][i % 4]}, ${['Bangalore', 'Whitefield'][i % 2]}`,
//                 types: [keyword.toLowerCase().replace(/\s+/g, '_')],
//                 rating: Math.floor(Math.random() * 50 + 10) / 10,
//                 user_ratings_total: Math.floor(Math.random() * 500),
//                 business_status: Math.random() > 0.2 ? "OPERATIONAL" : "CLOSED_TEMPORARILY",
//                 geometry: {
//                     location: {
//                         lat: lat + latOffset,
//                         lng: lng + lngOffset
//                     }
//                 }
//             });
//         }
//         return { status: "OK", results: mockPlaces };
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (!searchData.latitude || !searchData.longitude) {
//             setError("Latitude and longitude are required.");
//             return;
//         }
//         fetchPlacesData();
//     };

//     const handleNewSearch = () => {
//         setShowResults(false);
//         setError(null);
//     };

//     const formatType = (types) => {
//         if (!types || types.length === 0) return "N/A";
//         return types[0].split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
//     };

//     const formatCoordinate = (coord) => {
//         if (typeof coord === 'number') {
//             return coord.toFixed(6);
//         }
//         return coord;
//     };

//     if (loading) {
//         return (
//             <div className="container mx-auto p-8 mt-20 text-center">
//                 <p className="text-xl">Loading...</p>
//                 <div className="mt-4 w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
//             </div>
//         );
//     }

//     return (
//         <div className="container mx-auto p-6 mt-12">
//             {!showResults ? (
//                 <>
//                     <h2 className="text-4xl font-bold mb-6 text-center mt-20">Location Search</h2>
//                     <form
//                         onSubmit={handleSubmit}
//                         className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-lg bg-gray-50 shadow-lg border border-gray-300"
//                     >
//                         {error && (
//                             <div className="col-span-1 md:col-span-2 text-red-600 bg-red-50 p-3 rounded-lg">
//                                 {error}
//                             </div>
//                         )}

//                         <div className="relative flex flex-col col-span-2 md:col-span-1">
//                             <label className="block text-sm font-medium pb-2">Type:</label>
//                             <input
//                                 type="text"
//                                 name="type"
//                                 value={searchData.type}
//                                 onChange={handleChange}
//                                 placeholder="e.g. Water tank cleaning service"
//                                 className="border border-gray-300 p-3 rounded-lg"
//                             />
//                             {suggestions.length > 0 && (
//                                 <ul className="absolute z-10 mt-1 max-h-48 overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-md w-full">
//                                     {suggestions.map((item, index) => (
//                                         <li
//                                             key={index}
//                                             onClick={() => handleSelectSuggestion(item)}
//                                             className="p-2 hover:bg-blue-100 cursor-pointer"
//                                         >
//                                             {item}
//                                         </li>
//                                     ))}
//                                 </ul>
//                             )}
//                         </div>


//                         <div className="flex flex-col">
//                             <label className="block text-sm font-medium pb-2">Latitude:</label>
//                             <input
//                                 type="text"
//                                 name="latitude"
//                                 value={searchData.latitude}
//                                 onChange={handleChange}
//                                 placeholder="e.g. 12.9629807"
//                                 className="border border-gray-300 p-3 rounded-lg"
//                                 required
//                             />
//                         </div>

//                         <div className="flex flex-col">
//                             <label className="block text-sm font-medium pb-2">Longitude:</label>
//                             <input
//                                 type="text"
//                                 name="longitude"
//                                 value={searchData.longitude}
//                                 onChange={handleChange}
//                                 placeholder="e.g. 77.6725375"
//                                 className="border border-gray-300 p-3 rounded-lg"
//                                 required
//                             />
//                         </div>

//                         <div className="flex items-end">
//                             <button
//                                 type="button"
//                                 onClick={handleFetchLocation}
//                                 className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-colors w-full"
//                             >
//                                 Fetch My Location
//                             </button>
//                         </div>

//                         <div className="col-span-1 md:col-span-2 flex flex-col">
//                             <label className="block text-sm font-medium pb-2">
//                                 Radius: {searchData.radius} km
//                             </label>
//                             <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
//                                 <div
//                                     className="bg-blue-600 h-2.5 rounded-full"
//                                     style={{ width: `${(searchData.radius / 100) * 100}%` }}
//                                 ></div>
//                             </div>
//                             <input
//                                 type="range"
//                                 name="radius"
//                                 min="1"
//                                 max="100"
//                                 value={searchData.radius}
//                                 onChange={handleChange}
//                                 className="w-full"
//                             />
//                         </div>

//                         <div className="col-span-1 md:col-span-2 text-center">
//                             <button
//                                 type="submit"
//                                 className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-colors"
//                             >
//                                 Search
//                             </button>
//                         </div>

//                         <div className="col-span-1 md:col-span-2 bg-yellow-50 border-l-4 border-yellow-400 p-4">
//                             <p className="text-yellow-700">
//                                 <strong>Note:</strong> This component is using simulated data for demonstration purposes.
//                                 In a production environment, you should implement a proper backend API endpoint to securely
//                                 call the Google Places API.
//                             </p>
//                         </div>
//                     </form>
//                 </>
//             ) : (
//                 <div>
//                     <div className="flex justify-between items-center mb-8">
//                         <h2 className="text-3xl font-bold">Search Results</h2>
//                         <button
//                             onClick={handleNewSearch}
//                             className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors"
//                         >
//                             New Search
//                         </button>
//                     </div>

//                     {error && (
//                         <div className="mb-6 text-red-600 bg-red-50 p-4 rounded-lg">
//                             {error}
//                         </div>
//                     )}

//                     {results.length === 0 ? (
//                         <div className="text-center p-8 bg-gray-50 rounded-lg border border-gray-200">
//                             <p className="text-xl text-gray-600">No results found. Please try different search criteria.</p>
//                         </div>
//                     ) : (
//                         <div className="overflow-x-auto shadow-lg rounded-lg">
//                             <table className="min-w-full bg-white">
//                                 <thead className="bg-gray-100">
//                                     <tr>
//                                         <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Name</th>
//                                         <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Address</th>
//                                         <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Type</th>
//                                         <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Rating</th>
//                                         <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Status</th>
//                                         <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Location</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody className="divide-y divide-gray-200">
//                                     {results.map((place, index) => (
//                                         <tr key={place.place_id || index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
//                                             <td className="py-4 px-4 text-sm font-medium text-gray-900">{place.name || "N/A"}</td>
//                                             <td className="py-4 px-4 text-sm text-gray-500">{place.vicinity || "N/A"}</td>
//                                             <td className="py-4 px-4 text-sm text-gray-500">{formatType(place.types || [])}</td>
//                                             <td className="py-4 px-4 text-sm text-gray-500">
//                                                 {place.rating ? (
//                                                     <div className="flex items-center">
//                                                         <span className="mr-1">{place.rating}</span>
//                                                         <span className="text-yellow-500">★</span>
//                                                         <span className="ml-1 text-xs text-gray-400">({place.user_ratings_total || 0})</span>
//                                                     </div>
//                                                 ) : (
//                                                     "N/A"
//                                                 )}
//                                             </td>
//                                             <td className="py-4 px-4 text-sm">
//                                                 {place.business_status === "OPERATIONAL" ? (
//                                                     <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
//                                                         Open
//                                                     </span>
//                                                 ) : place.business_status ? (
//                                                     <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
//                                                         Closed
//                                                     </span>
//                                                 ) : (
//                                                     <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
//                                                         N/A
//                                                     </span>
//                                                 )}
//                                             </td>
//                                             <td className="py-4 px-4 text-sm text-gray-500">
//                                                 {place.geometry && place.geometry.location ? (
//                                                     `${formatCoordinate(place.geometry.location.lat)}, ${formatCoordinate(place.geometry.location.lng)}`
//                                                 ) : (
//                                                     "N/A"
//                                                 )}
//                                             </td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         </div>
//                     )}
//                 </div>
//             )}
//         </div>
//     );
// }

// export default SearchLeads;
// SearchLeads.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import gmbCategories from '../../components/GmbCategoriesData'; // should contain valid `type` values

function SearchLeads() {
    const [searchData, setSearchData] = useState({
        type: "",  // Now using "type" instead of "keyword"
        latitude: "",
        longitude: "",
        radius: 10
    });
    const [results, setResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [suggestions, setSuggestions] = useState([]);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearchData((prev) => ({ ...prev, [name]: value }));

        if (name === "type") {
            const filtered = gmbCategories
                .filter(category =>
                    category.toLowerCase().includes(value.toLowerCase())
                )
                .sort();
            setSuggestions(value ? filtered.slice(0, 10) : []);
        }
    };

    const handleSelectSuggestion = (item) => {
        setSearchData((prev) => ({ ...prev, type: item }));
        setSuggestions([]);
    };

    const handleFetchLocation = () => {
        if (navigator.geolocation) {
            setLoading(true);
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude.toFixed(6);
                    const lng = position.coords.longitude.toFixed(6);
                    setSearchData((prev) => ({
                        ...prev,
                        latitude: lat,
                        longitude: lng
                    }));
                    setLoading(false);
                },
                (error) => {
                    console.error("Error fetching location:", error);
                    setError("Failed to fetch your location. Please check your permissions.");
                    setLoading(false);
                }
            );
        } else {
            setError("Geolocation is not supported by this browser.");
        }
    };

    const fetchPlacesData = async () => {
        try {
            setLoading(true);
            setError(null);

            const { latitude, longitude, radius, type } = searchData;
            const location = `${latitude},${longitude}`;
            const encodedType = encodeURIComponent(type);
            const apiKey = "AIzaSyAl6mLYFS3S5fP3MLsQVQh_rYhz3NTZHu0"; // move to env in prod

            const apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius * 1000}&type=${encodedType}&key=${apiKey}`;

            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.status === "OK") {
                setResults(data.results);
                setShowResults(true);
            } else {
                setError(`Google API Error: ${data.status}`);
            }

            setLoading(false);
        } catch (err) {
            setError("Failed to fetch data from Google Places API.");
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!searchData.latitude || !searchData.longitude) {
            setError("Latitude and longitude are required.");
            return;
        }
        fetchPlacesData();
    };

    const handleNewSearch = () => {
        setShowResults(false);
        setError(null);
        setResults([]);
    };

    const formatType = (types) => {
        if (!types || types.length === 0) return "N/A";
        return types[0].split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    const formatCoordinate = (coord) => {
        if (typeof coord === 'number') {
            return coord.toFixed(6);
        }
        return coord;
    };

    if (loading) {
        return (
            <div className="container mx-auto p-8 mt-20 text-center">
                <p className="text-xl">Loading...</p>
                <div className="mt-4 w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6 mt-12">
            {!showResults ? (
                <>
                    <h2 className="text-4xl font-bold mb-6 text-center mt-20">Location Search</h2>
                    <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-lg bg-gray-50 shadow-lg border border-gray-300"
                    >
                        {error && (
                            <div className="col-span-2 text-red-600 bg-red-50 p-3 rounded-lg">
                                {error}
                            </div>
                        )}

                        <div className="relative flex flex-col col-span-2 md:col-span-1">
                            <label className="block text-sm font-medium pb-2">Search Type:</label>
                            <input
                                type="text"
                                name="type"
                                value={searchData.type}
                                onChange={handleChange}
                                placeholder="e.g. local_government_office"
                                className="border border-gray-300 p-3 rounded-lg"
                            />
                            {suggestions.length > 0 && (
                                <ul className="absolute z-10 mt-1 max-h-48 overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-md w-full">
                                    {suggestions.map((item, index) => (
                                        <li
                                            key={index}
                                            onClick={() => handleSelectSuggestion(item)}
                                            className="p-2 hover:bg-blue-100 cursor-pointer"
                                        >
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <div className="flex flex-col">
                            <label className="block text-sm font-medium pb-2">Latitude:</label>
                            <input
                                type="text"
                                name="latitude"
                                value={searchData.latitude}
                                onChange={handleChange}
                                placeholder="e.g. 12.909694"
                                className="border border-gray-300 p-3 rounded-lg"
                                required
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="block text-sm font-medium pb-2">Longitude:</label>
                            <input
                                type="text"
                                name="longitude"
                                value={searchData.longitude}
                                onChange={handleChange}
                                placeholder="e.g. 77.573394"
                                className="border border-gray-300 p-3 rounded-lg"
                                required
                            />
                        </div>

                        <div className="flex items-end">
                            <button
                                type="button"
                                onClick={handleFetchLocation}
                                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-colors w-full"
                            >
                                Fetch My Location
                            </button>
                        </div>

                        <div className="col-span-2 flex flex-col">
                            <label className="block text-sm font-medium pb-2">
                                Radius: {searchData.radius} km
                            </label>
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                                <div
                                    className="bg-blue-600 h-2.5 rounded-full"
                                    style={{ width: `${(searchData.radius / 100) * 100}%` }}
                                ></div>
                            </div>
                            <input
                                type="range"
                                name="radius"
                                min="1"
                                max="100"
                                value={searchData.radius}
                                onChange={handleChange}
                                className="w-full"
                            />
                        </div>

                        <div className="col-span-2 text-center">
                            <button
                                type="submit"
                                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-colors"
                            >
                                Search
                            </button>
                        </div>
                    </form>
                </>
            ) : (
                <div>
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-3xl font-bold">Search Results</h2>
                        <button
                            onClick={handleNewSearch}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors"
                        >
                            New Search
                        </button>
                    </div>

                    {results.length === 0 ? (
                        <div className="text-center p-8 bg-gray-50 rounded-lg border border-gray-200">
                            <p className="text-xl text-gray-600">No results found. Please try different search criteria.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto shadow-lg rounded-lg">
                            <table className="min-w-full bg-white">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Name</th>
                                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Address</th>
                                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Type</th>
                                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Rating</th>
                                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Status</th>
                                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Location</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {results.map((place, index) => (
                                        <tr key={place.place_id || index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                            <td className="py-4 px-4 text-sm font-medium text-gray-900">{place.name || "N/A"}</td>
                                            <td className="py-4 px-4 text-sm text-gray-500">{place.vicinity || "N/A"}</td>
                                            <td className="py-4 px-4 text-sm text-gray-500">{formatType(place.types || [])}</td>
                                            <td className="py-4 px-4 text-sm text-gray-500">
                                                {place.rating ? (
                                                    <div className="flex items-center">
                                                        <span className="mr-1">{place.rating}</span>
                                                        <span className="text-yellow-500">★</span>
                                                        <span className="ml-1 text-xs text-gray-400">({place.user_ratings_total || 0})</span>
                                                    </div>
                                                ) : (
                                                    "N/A"
                                                )}
                                            </td>
                                            <td className="py-4 px-4 text-sm">
                                                {place.business_status === "OPERATIONAL" ? (
                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                        Open
                                                    </span>
                                                ) : place.business_status ? (
                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                                        Closed
                                                    </span>
                                                ) : (
                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                                                        N/A
                                                    </span>
                                                )}
                                            </td>
                                            <td className="py-4 px-4 text-sm text-gray-500">
                                                {place.geometry?.location ? (
                                                    `${formatCoordinate(place.geometry.location.lat)}, ${formatCoordinate(place.geometry.location.lng)}`
                                                ) : "N/A"}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default SearchLeads;


