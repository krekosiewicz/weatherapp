import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import React, { use, useState, useEffect, useActionState, Suspense, useRef } from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server.mjs";
import { createSlice, configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, Provider } from "react-redux";
import { c } from "react/compiler-runtime";
import { useNavigate, useParams, Route, Routes } from "react-router-dom";
import { useClickAway, useDebounce } from "@uidotdev/usehooks";
const initialState = {
  latestCity: null,
  latestCities: []
};
const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setLatestCity: (state, action) => {
      state.latestCity = action.payload;
    },
    setLatestCities: (state, action) => {
      state.latestCities = action.payload;
    }
  }
});
const getLatestCity = (state) => state.weather.latestCity;
const {
  setLatestCity,
  setLatestCities
} = weatherSlice.actions;
const weatherReducer = weatherSlice.reducer;
const store = configureStore({
  reducer: {
    weather: weatherReducer
  }
});
const weatherImage = "/assets/weatherapp-DTC7c7xn.webp";
const homeContainer = "_homeContainer_dtb48_1";
const heroImage = "_heroImage_dtb48_5";
const searchBox$1 = "_searchBox_dtb48_11";
const styles$5 = {
  homeContainer,
  heroImage,
  searchBox: searchBox$1
};
const searchBox = "_searchBox_xycn5_1";
const wide = "_wide_xycn5_23";
const searchIcon$1 = "_searchIcon_xycn5_27";
const styles$4 = {
  searchBox,
  wide,
  searchIcon: searchIcon$1
};
const searchIcon = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='iso-8859-1'?%3e%3c!--%20Uploaded%20to:%20SVG%20Repo,%20www.svgrepo.com,%20Generator:%20SVG%20Repo%20Mixer%20Tools%20--%3e%3csvg%20fill='%23000000'%20height='800px'%20width='800px'%20version='1.1'%20id='Layer_1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20viewBox='0%200%20502.173%20502.173'%20xml:space='preserve'%3e%3cg%3e%3cg%3e%3cg%3e%3cpath%20d='M494.336,443.646L316.402,265.713c20.399-31.421,30.023-68.955,27.189-106.632%20C340.507,118.096,322.783,79.5,293.684,50.4C261.167,17.884,217.984,0,172.023,0c-0.222,0-0.445,0.001-0.668,0.001%20C125.149,0.176,81.837,18.409,49.398,51.342c-66.308,67.316-65.691,176.257,1.375,242.85%20c29.112,28.907,67.655,46.482,108.528,49.489c37.579,2.762,75.008-6.867,106.343-27.21l177.933,177.932%20c5.18,5.18,11.984,7.77,18.788,7.77s13.608-2.59,18.789-7.769l13.182-13.182C504.695,470.862,504.695,454.006,494.336,443.646z%20M480.193,467.079l-13.182,13.182c-2.563,2.563-6.73,2.561-9.292,0L273.914,296.456c-1.936-1.937-4.497-2.929-7.074-2.929%20c-2.044,0-4.098,0.624-5.858,1.898c-60.538,43.788-143.018,37.3-196.118-15.425C5.592,221.146,5.046,124.867,63.646,65.377%20c28.67-29.107,66.949-45.222,107.784-45.376c0.199,0,0.392-0.001,0.591-0.001c40.617,0,78.785,15.807,107.52,44.542%20c53.108,53.108,59.759,135.751,15.814,196.509c-2.878,3.979-2.441,9.459,1.032,12.932l183.806,183.805%20C482.755,460.35,482.755,464.517,480.193,467.079z'/%3e%3cpath%20d='M259.633,84.449c-48.317-48.316-126.935-48.316-175.253,0c-23.406,23.406-36.296,54.526-36.296,87.627%20c0,33.102,12.89,64.221,36.296,87.627S138.906,296,172.007,296c33.102,0,64.222-12.891,87.627-36.297%20C307.951,211.386,307.951,132.767,259.633,84.449z%20M245.492,245.561C225.863,265.189,199.766,276,172.007,276%20c-27.758,0-53.856-10.811-73.484-30.44c-19.628-19.628-30.438-45.726-30.438-73.484s10.809-53.855,30.438-73.484%20c20.262-20.263,46.868-30.39,73.484-30.39c26.61,0,53.227,10.133,73.484,30.39C286.011,139.112,286.011,205.042,245.492,245.561z%20'/%3e%3cpath%20d='M111.017,153.935c1.569-5.296-1.452-10.861-6.747-12.43c-5.294-1.569-10.86,1.451-12.429,6.746%20c-8.73,29.459-0.668,61.244,21.04,82.952c1.952,1.952,4.512,2.929,7.071,2.929s5.118-0.977,7.071-2.928%20c3.905-3.906,3.905-10.238,0-14.143C110.506,200.544,104.372,176.355,111.017,153.935z'/%3e%3cpath%20d='M141.469,94.214c-10.748,4.211-20.367,10.514-28.588,18.735c-3.905,3.906-3.905,10.238,0,14.143%20c1.952,1.952,4.512,2.929,7.071,2.929s5.118-0.977,7.07-2.929c6.26-6.26,13.575-11.057,21.741-14.255%20c5.143-2.015,7.678-7.816,5.664-12.959C152.413,94.735,146.611,92.202,141.469,94.214z'/%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/svg%3e";
const largestCitiesInPoland = [
  "Warsaw",
  // Warsaw
  "Krakow",
  // Krakow
  "Lodz",
  // Lodz
  "Wroclaw",
  // Wroclaw
  "Poznan",
  // Poznan
  "Gdansk",
  // Gdansk
  "Szczecin",
  // Szczecin
  "Kalisz",
  // Kalisz
  "Lublin",
  // Lublin
  "Katowice"
  // Katowice
];
const apiActionFetchCurrentForecast = async (city) => {
  const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${"aeb261d493734f1f86e191625240106"}&q=${city}&days=7`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
const apiActionFetchBulkWeather = async () => {
  const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${"aeb261d493734f1f86e191625240106"}&q=bulk&days=7`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      locations: largestCitiesInPoland.map((city) => ({
        q: city
      }))
    })
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  const sanitizedData = data.bulk.map((item) => {
    return {
      current: item.query.current,
      forecast: item.query.forecast,
      location: item.query.location
    };
  });
  return sanitizedData;
};
const fetchAutocompleteSuggestions = async (query) => {
  const response = await fetch(`https://api.weatherapi.com/v1/search.json?key=${"aeb261d493734f1f86e191625240106"}&q=${query}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
const getAutocompleteSuggestions = (query) => {
  if (query.length < 3) {
    return Promise.resolve([]);
  }
  return fetchAutocompleteSuggestions(query);
};
const AutocompleteList = (t0) => {
  const $ = c(25);
  const {
    suggestionPromise,
    onSuggestionClick,
    onClose
  } = t0;
  const suggestions = use(suggestionPromise);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  let t1;
  if ($[0] !== onClose) {
    t1 = () => {
      onClose();
    };
    $[0] = onClose;
    $[1] = t1;
  } else {
    t1 = $[1];
  }
  const listRef = useClickAway(t1);
  let t2;
  if ($[2] !== suggestions || $[3] !== listRef.current || $[4] !== selectedIndex || $[5] !== onSuggestionClick) {
    t2 = (event) => {
      var _a, _b, _c, _d;
      if (!suggestions.length) {
        return;
      }
      if (event.key === "ArrowDown") {
        setSelectedIndex((prevIndex) => Math.min(prevIndex + 1, suggestions.length - 1));
        (_b = (_a = listRef.current) == null ? void 0 : _a.children[selectedIndex + 1]) == null ? void 0 : _b.scrollIntoView({
          behavior: "smooth",
          block: "nearest"
        });
      } else {
        if (event.key === "ArrowUp") {
          setSelectedIndex((prevIndex_0) => Math.max(prevIndex_0 - 1, 0));
          (_d = (_c = listRef.current) == null ? void 0 : _c.children[selectedIndex - 1]) == null ? void 0 : _d.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
          });
        } else {
          if (event.key === "Enter" && selectedIndex >= 0) {
            onSuggestionClick(suggestions[selectedIndex]);
          }
        }
      }
    };
    $[2] = suggestions;
    $[3] = listRef.current;
    $[4] = selectedIndex;
    $[5] = onSuggestionClick;
    $[6] = t2;
  } else {
    t2 = $[6];
  }
  const handleKeyDown = t2;
  let t3;
  if ($[7] !== handleKeyDown) {
    t3 = () => {
      const inputElement = document.querySelector('[name="city"]');
      inputElement == null ? void 0 : inputElement.addEventListener("keydown", handleKeyDown);
      return () => {
        inputElement == null ? void 0 : inputElement.removeEventListener("keydown", handleKeyDown);
      };
    };
    $[7] = handleKeyDown;
    $[8] = t3;
  } else {
    t3 = $[8];
  }
  let t4;
  if ($[9] !== handleKeyDown || $[10] !== suggestions) {
    t4 = [handleKeyDown, suggestions];
    $[9] = handleKeyDown;
    $[10] = suggestions;
    $[11] = t4;
  } else {
    t4 = $[11];
  }
  useEffect(t3, t4);
  const t5 = listRef;
  let t6;
  if ($[12] !== selectedIndex || $[13] !== onSuggestionClick || $[14] !== suggestions) {
    let t72;
    if ($[16] !== selectedIndex || $[17] !== onSuggestionClick) {
      t72 = (suggestion, index) => /* @__PURE__ */ jsx("div", { className: `${"suggestionItem"} ${index === selectedIndex ? "activeSuggestion" : ""}`, onClick: () => onSuggestionClick(suggestion), children: suggestion.name }, suggestion.id);
      $[16] = selectedIndex;
      $[17] = onSuggestionClick;
      $[18] = t72;
    } else {
      t72 = $[18];
    }
    t6 = suggestions.map(t72);
    $[12] = selectedIndex;
    $[13] = onSuggestionClick;
    $[14] = suggestions;
    $[15] = t6;
  } else {
    t6 = $[15];
  }
  let t7;
  if ($[19] !== suggestions.length) {
    t7 = suggestions.length === 0 && /* @__PURE__ */ jsx("div", { className: "suggestionItem", children: "Brak wynikow" });
    $[19] = suggestions.length;
    $[20] = t7;
  } else {
    t7 = $[20];
  }
  let t8;
  if ($[21] !== t5 || $[22] !== t6 || $[23] !== t7) {
    t8 = /* @__PURE__ */ jsxs("div", { ref: t5, className: "autocompleteList", children: [
      t6,
      t7
    ] });
    $[21] = t5;
    $[22] = t6;
    $[23] = t7;
    $[24] = t8;
  } else {
    t8 = $[24];
  }
  return t8;
};
const AutocompleteCity = (t0) => {
  const $ = c(35);
  const {
    wide: wide2
  } = t0;
  const [city, setCity] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const debouncedSearch = useDebounce(city, 500);
  let t1;
  if ($[0] !== city || $[1] !== navigate) {
    t1 = async () => {
      if (city.length < 3) {
        return "Miejsce musi mieć co najmniej 3 znaki";
      }
      navigate(`/${city}`);
      return null;
    };
    $[0] = city;
    $[1] = navigate;
    $[2] = t1;
  } else {
    t1 = $[2];
  }
  const [error, submitAction] = useActionState(t1, null);
  let t2;
  if ($[3] !== navigate) {
    t2 = (suggestion) => {
      navigate(`/${suggestion.name}`);
      setCity("");
      setIsOpen(false);
    };
    $[3] = navigate;
    $[4] = t2;
  } else {
    t2 = $[4];
  }
  const handleSuggestionClick = t2;
  let t3;
  if ($[5] !== debouncedSearch.length) {
    t3 = () => {
      if (debouncedSearch.length > 3) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };
    $[5] = debouncedSearch.length;
    $[6] = t3;
  } else {
    t3 = $[6];
  }
  let t4;
  if ($[7] !== debouncedSearch) {
    t4 = [debouncedSearch];
    $[7] = debouncedSearch;
    $[8] = t4;
  } else {
    t4 = $[8];
  }
  useEffect(t3, t4);
  let t5;
  let t6;
  if ($[9] !== debouncedSearch) {
    t6 = getAutocompleteSuggestions(debouncedSearch);
    $[9] = debouncedSearch;
    $[10] = t6;
  } else {
    t6 = $[10];
  }
  t5 = t6;
  const suggestionPromise = t5;
  const t7 = `${styles$4.searchBox} ${wide2 ? styles$4.wide : ""}`;
  let t8;
  if ($[11] === Symbol.for("react.memo_cache_sentinel")) {
    t8 = (e) => setCity(e.target.value);
    $[11] = t8;
  } else {
    t8 = $[11];
  }
  let t9;
  if ($[12] !== city) {
    t9 = /* @__PURE__ */ jsx("input", { autoComplete: "off", type: "text", name: "city", placeholder: "Pogoda dla...", value: city, onChange: t8 });
    $[12] = city;
    $[13] = t9;
  } else {
    t9 = $[13];
  }
  let t10;
  if ($[14] !== isOpen || $[15] !== city || $[16] !== suggestionPromise || $[17] !== handleSuggestionClick) {
    t10 = isOpen && /* @__PURE__ */ jsx(Suspense, { children: city && /* @__PURE__ */ jsx(AutocompleteList, { onClose: () => setIsOpen(false), suggestionPromise, onSuggestionClick: handleSuggestionClick }) });
    $[14] = isOpen;
    $[15] = city;
    $[16] = suggestionPromise;
    $[17] = handleSuggestionClick;
    $[18] = t10;
  } else {
    t10 = $[18];
  }
  let t11;
  if ($[19] !== t9 || $[20] !== t10) {
    t11 = /* @__PURE__ */ jsxs("div", { className: "appInputTextField", children: [
      t9,
      t10
    ] });
    $[19] = t9;
    $[20] = t10;
    $[21] = t11;
  } else {
    t11 = $[21];
  }
  let t12;
  if ($[22] === Symbol.for("react.memo_cache_sentinel")) {
    t12 = /* @__PURE__ */ jsx("img", { className: styles$4.searchIcon, src: searchIcon, alt: "Search Icon" });
    $[22] = t12;
  } else {
    t12 = $[22];
  }
  let t13;
  if ($[23] !== submitAction) {
    t13 = /* @__PURE__ */ jsx("div", { className: "appButton", onClick: submitAction, children: t12 });
    $[23] = submitAction;
    $[24] = t13;
  } else {
    t13 = $[24];
  }
  let t14;
  if ($[25] !== t7 || $[26] !== submitAction || $[27] !== t11 || $[28] !== t13) {
    t14 = /* @__PURE__ */ jsxs("form", { className: t7, onSubmit: submitAction, children: [
      t11,
      t13
    ] });
    $[25] = t7;
    $[26] = submitAction;
    $[27] = t11;
    $[28] = t13;
    $[29] = t14;
  } else {
    t14 = $[29];
  }
  let t15;
  if ($[30] !== error) {
    t15 = error && /* @__PURE__ */ jsx("p", { className: styles$4.searchBox, children: error });
    $[30] = error;
    $[31] = t15;
  } else {
    t15 = $[31];
  }
  let t16;
  if ($[32] !== t14 || $[33] !== t15) {
    t16 = /* @__PURE__ */ jsxs(Fragment, { children: [
      t14,
      t15
    ] });
    $[32] = t14;
    $[33] = t15;
    $[34] = t16;
  } else {
    t16 = $[34];
  }
  return t16;
};
const Home = () => {
  const $ = c(2);
  let t0;
  if ($[0] === Symbol.for("react.memo_cache_sentinel")) {
    t0 = /* @__PURE__ */ jsx("div", { className: `container centered-h`, children: /* @__PURE__ */ jsx("img", { src: weatherImage, alt: "Weather", className: `${styles$5.heroImage}` }) });
    $[0] = t0;
  } else {
    t0 = $[0];
  }
  let t1;
  if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
    t1 = /* @__PURE__ */ jsxs("div", { className: styles$5.homeContainer, children: [
      t0,
      /* @__PURE__ */ jsx(AutocompleteCity, {})
    ] });
    $[1] = t1;
  } else {
    t1 = $[1];
  }
  return t1;
};
const cityCardDetails$1 = "_cityCardDetails_m552g_1";
const cityHeader$1 = "_cityHeader_m552g_7";
const forecastGrid = "_forecastGrid_m552g_13";
const forecastHeader = "_forecastHeader_m552g_20";
const cityRow$1 = "_cityRow_m552g_24";
const styles$3 = {
  cityCardDetails: cityCardDetails$1,
  cityHeader: cityHeader$1,
  forecastGrid,
  forecastHeader,
  cityRow: cityRow$1
};
const cityCardDetails = "_cityCardDetails_rx3z7_1";
const cityHeader = "_cityHeader_rx3z7_7";
const styles$2 = {
  cityCardDetails,
  cityHeader
};
const WeatherCityCard = (t0) => {
  const $ = c(17);
  const {
    data
  } = t0;
  if (!data) {
    return null;
  }
  let t1;
  if ($[0] === Symbol.for("react.memo_cache_sentinel")) {
    t1 = {
      width: "80px",
      height: "80px"
    };
    $[0] = t1;
  } else {
    t1 = $[0];
  }
  let t2;
  if ($[1] !== data.icon) {
    t2 = /* @__PURE__ */ jsx("img", { src: data.icon, alt: "Weather icon", style: t1 });
    $[1] = data.icon;
    $[2] = t2;
  } else {
    t2 = $[2];
  }
  let t3;
  if ($[3] !== data.location || $[4] !== t2) {
    t3 = /* @__PURE__ */ jsxs("h1", { className: styles$2.cityHeader, children: [
      data.location,
      t2
    ] });
    $[3] = data.location;
    $[4] = t2;
    $[5] = t3;
  } else {
    t3 = $[5];
  }
  let t4;
  if ($[6] !== data.temperature) {
    t4 = /* @__PURE__ */ jsxs("p", { children: [
      "Temperatura: ",
      data.temperature,
      "°C"
    ] });
    $[6] = data.temperature;
    $[7] = t4;
  } else {
    t4 = $[7];
  }
  let t5;
  if ($[8] !== data.humidity) {
    t5 = /* @__PURE__ */ jsxs("p", { children: [
      "Wilgotność: ",
      data.humidity,
      "%"
    ] });
    $[8] = data.humidity;
    $[9] = t5;
  } else {
    t5 = $[9];
  }
  let t6;
  if ($[10] !== data.windSpeed) {
    t6 = /* @__PURE__ */ jsxs("p", { children: [
      "Siła wiatru: ",
      data.windSpeed,
      "m/s"
    ] });
    $[10] = data.windSpeed;
    $[11] = t6;
  } else {
    t6 = $[11];
  }
  let t7;
  if ($[12] !== t3 || $[13] !== t4 || $[14] !== t5 || $[15] !== t6) {
    t7 = /* @__PURE__ */ jsxs("div", { className: `${styles$2.cityCardDetails} card`, children: [
      t3,
      t4,
      t5,
      t6
    ] });
    $[12] = t3;
    $[13] = t4;
    $[14] = t5;
    $[15] = t6;
    $[16] = t7;
  } else {
    t7 = $[16];
  }
  return t7;
};
const dayNames = ["niedziela", "poniedziałek", "wtorek", "środa", "czwartek", "piątek", "sobota"];
function WeatherDetails(t0) {
  "use memo";
  const $ = c(11);
  const {
    cityPromise
  } = t0;
  const data = use(cityPromise);
  const dispatch = useDispatch();
  if (data.current.location) {
    dispatch(setLatestCity(data));
  }
  let t1;
  if ($[0] !== data.current) {
    t1 = /* @__PURE__ */ jsx(WeatherCityCard, { data: data.current });
    $[0] = data.current;
    $[1] = t1;
  } else {
    t1 = $[1];
  }
  let t2;
  if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
    t2 = /* @__PURE__ */ jsx("h6", { className: styles$3.forecastHeader, children: "Pogoda na najbliższe dni:" });
    $[2] = t2;
  } else {
    t2 = $[2];
  }
  let t3;
  if ($[3] !== data.forecastDays) {
    let t42;
    if ($[5] === Symbol.for("react.memo_cache_sentinel")) {
      t42 = (day, index) => {
        const date = new Date(day.date);
        const dayOfWeek = dayNames[date.getDay()];
        return /* @__PURE__ */ jsx(React.Fragment, { children: /* @__PURE__ */ jsxs("div", { className: `${styles$3.cityRow} card`, children: [
          /* @__PURE__ */ jsx("div", { children: index === 0 ? "jutro" : dayOfWeek }),
          /* @__PURE__ */ jsx("img", { src: day.icon, alt: "Weather icon", className: styles$3.weatherIcon }),
          /* @__PURE__ */ jsxs("div", { children: [
            day.avgTempC,
            "°C"
          ] })
        ] }) }, index);
      };
      $[5] = t42;
    } else {
      t42 = $[5];
    }
    t3 = data.forecastDays.map(t42);
    $[3] = data.forecastDays;
    $[4] = t3;
  } else {
    t3 = $[4];
  }
  let t4;
  if ($[6] !== t3) {
    t4 = /* @__PURE__ */ jsx("div", { className: styles$3.forecastGrid, children: t3 });
    $[6] = t3;
    $[7] = t4;
  } else {
    t4 = $[7];
  }
  let t5;
  if ($[8] !== t1 || $[9] !== t4) {
    t5 = /* @__PURE__ */ jsxs(Fragment, { children: [
      t1,
      t2,
      t4
    ] });
    $[8] = t1;
    $[9] = t4;
    $[10] = t5;
  } else {
    t5 = $[10];
  }
  return t5;
}
function parseWeatherResponse(rawData) {
  return {
    current: parseCurrentWeather(rawData),
    forecastDays: parseForecastDays(rawData)
  };
}
function parseCurrentWeather(data) {
  const currentWeather = data.current;
  const location = data.location;
  return {
    location: location.name,
    icon: currentWeather.condition.icon,
    sunnyPeriods: extractSunnyPeriods(data.forecast.forecastday[0].hour),
    astro: parseAstro(data.forecast.forecastday[0].astro),
    temperature: currentWeather.temp_c,
    humidity: currentWeather.humidity,
    windSpeed: currentWeather.wind_kph,
    windDirection: currentWeather.wind_dir,
    uvIndex: currentWeather.uv
  };
}
function parseForecastDays(data) {
  return data.forecast.forecastday.slice(0, 7).map((day) => ({
    date: day.date,
    icon: day.day.condition.icon,
    maxTempC: day.day.maxtemp_c,
    minTempC: day.day.mintemp_c,
    avgTempC: day.day.avgtemp_c
  }));
}
function extractSunnyPeriods(hours) {
  const periods = [];
  let currentPeriod = null;
  hours.forEach((hour) => {
    if (hour.condition.text.includes("Sunny")) {
      if (!currentPeriod) {
        currentPeriod = {
          start: hour.time,
          end: hour.time
        };
        periods.push(currentPeriod);
      } else {
        currentPeriod.end = hour.time;
      }
    } else {
      currentPeriod = null;
    }
  });
  return periods;
}
function parseAstro(astro) {
  return {
    sunrise: astro.sunrise,
    sunset: astro.sunset,
    moonrise: astro.moonrise,
    moonset: astro.moonset,
    moonPhase: astro.moon_phase,
    moonIllumination: astro.moon_illumination
  };
}
const parseBulkWeatherToFrontend = async () => {
  const bulkData = await apiActionFetchBulkWeather();
  return bulkData.map(parseWeatherResponse);
};
const parseWeatherForecastToFrontend = async (city) => {
  const backendData = await apiActionFetchCurrentForecast(city);
  return parseWeatherResponse(backendData);
};
const navigation = "_navigation_1gprq_1";
const cityRow = "_cityRow_1gprq_6";
const weatherGrid = "_weatherGrid_1gprq_15";
const styles$1 = {
  navigation,
  cityRow,
  weatherGrid
};
const dialog = "_dialog_18u1e_1";
const dialogContent = "_dialogContent_18u1e_21";
const closeButton = "_closeButton_18u1e_42";
const styles = {
  dialog,
  dialogContent,
  closeButton
};
const Dialog = (t0) => {
  const $ = c(14);
  const {
    isOpen,
    onClose,
    children
  } = t0;
  const dialogRef = useRef(null);
  let t1;
  let t2;
  if ($[0] !== isOpen) {
    t1 = () => {
      const dialog2 = dialogRef.current;
      const body = document.body;
      if (dialog2) {
        if (isOpen) {
          if (!dialog2.open) {
            dialog2.showModal();
            body.style.overflow = "hidden";
          }
        } else {
          dialog2.close();
          body.style.overflow = "";
        }
      }
      return () => {
        body.style.overflow = "";
      };
    };
    t2 = [isOpen];
    $[0] = isOpen;
    $[1] = t1;
    $[2] = t2;
  } else {
    t1 = $[1];
    t2 = $[2];
  }
  useEffect(t1, t2);
  let t3;
  if ($[3] !== onClose) {
    t3 = (event) => {
      if (event.target === dialogRef.current) {
        onClose();
      }
    };
    $[3] = onClose;
    $[4] = t3;
  } else {
    t3 = $[4];
  }
  const handleBackdropClick = t3;
  let t4;
  if ($[5] !== onClose) {
    t4 = /* @__PURE__ */ jsx("div", { className: styles.dialogHeader, children: /* @__PURE__ */ jsx("div", { onClick: onClose, className: `appButton ${styles.closeButton}`, children: "Zamknij" }) });
    $[5] = onClose;
    $[6] = t4;
  } else {
    t4 = $[6];
  }
  let t5;
  if ($[7] !== children || $[8] !== t4) {
    t5 = /* @__PURE__ */ jsxs("div", { className: styles.dialogContent, children: [
      children,
      t4
    ] });
    $[7] = children;
    $[8] = t4;
    $[9] = t5;
  } else {
    t5 = $[9];
  }
  let t6;
  if ($[10] !== dialogRef || $[11] !== handleBackdropClick || $[12] !== t5) {
    t6 = /* @__PURE__ */ jsx("dialog", { ref: dialogRef, className: styles.dialog, onClick: handleBackdropClick, children: t5 });
    $[10] = dialogRef;
    $[11] = handleBackdropClick;
    $[12] = t5;
    $[13] = t6;
  } else {
    t6 = $[13];
  }
  return t6;
};
const LargestCitiesWeather = (t0) => {
  const $ = c(14);
  const {
    largestCitiesPromise
  } = t0;
  const data = use(largestCitiesPromise);
  const dispatch = useDispatch();
  const [isDialogOpen, setDialogOpen] = useState(false);
  let t1;
  if ($[0] === Symbol.for("react.memo_cache_sentinel")) {
    t1 = () => setDialogOpen(true);
    $[0] = t1;
  } else {
    t1 = $[0];
  }
  const openDialog = t1;
  let t2;
  if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
    t2 = () => setDialogOpen(false);
    $[1] = t2;
  } else {
    t2 = $[1];
  }
  const closeDialog = t2;
  if (data && data.length) {
    dispatch(setLatestCities(data));
  }
  const latestCity = useSelector(getLatestCity);
  let t3;
  if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
    t3 = /* @__PURE__ */ jsx("div", { className: styles$1.navigation, children: /* @__PURE__ */ jsx("div", { className: "appButton", onClick: openDialog, children: "Porównaj pogodę z innymi miastami" }) });
    $[2] = t3;
  } else {
    t3 = $[2];
  }
  const t4 = latestCity == null ? void 0 : latestCity.current;
  let t5;
  if ($[3] !== t4) {
    t5 = /* @__PURE__ */ jsx(WeatherCityCard, { data: t4 });
    $[3] = t4;
    $[4] = t5;
  } else {
    t5 = $[4];
  }
  let t6;
  if ($[5] !== data) {
    let t72;
    if ($[7] === Symbol.for("react.memo_cache_sentinel")) {
      t72 = (city, index) => /* @__PURE__ */ jsxs("div", { className: styles$1.cityRow, children: [
        /* @__PURE__ */ jsx("div", { children: city.current.location }),
        /* @__PURE__ */ jsx("img", { src: city.current.icon, alt: "Weather icon", className: styles$1.weatherIcon }),
        /* @__PURE__ */ jsxs("div", { children: [
          city.current.temperature,
          "°C"
        ] })
      ] }, index);
      $[7] = t72;
    } else {
      t72 = $[7];
    }
    t6 = data.map(t72);
    $[5] = data;
    $[6] = t6;
  } else {
    t6 = $[6];
  }
  let t7;
  if ($[8] !== t6) {
    t7 = /* @__PURE__ */ jsx("div", { className: styles$1.weatherGrid, children: t6 });
    $[8] = t6;
    $[9] = t7;
  } else {
    t7 = $[9];
  }
  let t8;
  if ($[10] !== isDialogOpen || $[11] !== t5 || $[12] !== t7) {
    t8 = /* @__PURE__ */ jsxs(Fragment, { children: [
      t3,
      /* @__PURE__ */ jsxs(Dialog, { isOpen: isDialogOpen, onClose: closeDialog, children: [
        t5,
        t7
      ] })
    ] });
    $[10] = isDialogOpen;
    $[11] = t5;
    $[12] = t7;
    $[13] = t8;
  } else {
    t8 = $[13];
  }
  return t8;
};
const CityWeatherPage = () => {
  const $ = c(9);
  const {
    city
  } = useParams();
  let t0;
  const t1 = city || "";
  let t2;
  if ($[0] !== t1) {
    t2 = parseWeatherForecastToFrontend(t1);
    $[0] = t1;
    $[1] = t2;
  } else {
    t2 = $[1];
  }
  t0 = t2;
  const cityPromise = t0;
  let t3;
  let t4;
  if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
    t4 = parseBulkWeatherToFrontend();
    $[2] = t4;
  } else {
    t4 = $[2];
  }
  t3 = t4;
  const largestCitiesPromise = t3;
  let t5;
  if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
    t5 = /* @__PURE__ */ jsx(AutocompleteCity, { wide: true });
    $[3] = t5;
  } else {
    t5 = $[3];
  }
  let t6;
  if ($[4] === Symbol.for("react.memo_cache_sentinel")) {
    t6 = /* @__PURE__ */ jsx("div", { children: "Loading weather details..." });
    $[4] = t6;
  } else {
    t6 = $[4];
  }
  let t7;
  if ($[5] === Symbol.for("react.memo_cache_sentinel")) {
    t7 = /* @__PURE__ */ jsx(Suspense, { fallback: t6, children: /* @__PURE__ */ jsx(LargestCitiesWeather, { largestCitiesPromise }) });
    $[5] = t7;
  } else {
    t7 = $[5];
  }
  let t8;
  if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
    t8 = /* @__PURE__ */ jsx("div", { children: "Loading weather details..." });
    $[6] = t8;
  } else {
    t8 = $[6];
  }
  let t9;
  if ($[7] !== cityPromise) {
    t9 = /* @__PURE__ */ jsxs("div", { className: "smallSize", children: [
      t5,
      t7,
      /* @__PURE__ */ jsx(Suspense, { fallback: t8, children: /* @__PURE__ */ jsx(WeatherDetails, { cityPromise }) })
    ] });
    $[7] = cityPromise;
    $[8] = t9;
  } else {
    t9 = $[8];
  }
  return t9;
};
const Router = () => {
  const $ = c(2);
  let t0;
  if ($[0] === Symbol.for("react.memo_cache_sentinel")) {
    t0 = /* @__PURE__ */ jsx(Route, { path: "/", element: /* @__PURE__ */ jsx(Home, {}) });
    $[0] = t0;
  } else {
    t0 = $[0];
  }
  let t1;
  if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
    t1 = /* @__PURE__ */ jsxs(Routes, { children: [
      t0,
      /* @__PURE__ */ jsx(Route, { path: "/:city", element: /* @__PURE__ */ jsx(CityWeatherPage, {}) })
    ] });
    $[1] = t1;
  } else {
    t1 = $[1];
  }
  return t1;
};
const App = () => {
  const $ = c(1);
  let t0;
  if ($[0] === Symbol.for("react.memo_cache_sentinel")) {
    t0 = /* @__PURE__ */ jsx("div", { className: "appContainer", children: /* @__PURE__ */ jsx("div", { className: "appContent", children: /* @__PURE__ */ jsx(Router, {}) }) });
    $[0] = t0;
  } else {
    t0 = $[0];
  }
  return t0;
};
function render({
  path
}) {
  const html = ReactDOMServer.renderToString(/* @__PURE__ */ jsx(React.StrictMode, { children: /* @__PURE__ */ jsx(StaticRouter, { location: path, children: /* @__PURE__ */ jsx(Provider, { store, children: /* @__PURE__ */ jsx(App, {}) }) }) }));
  console.log("Server Rendered HTML:", html);
  return {
    html
  };
}
export {
  render
};
