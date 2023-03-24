import React, { createContext, PropsWithChildren, useEffect, useMemo, useState } from 'react';

export type UserInfo = {
  ip?: string;
  network?: string;
  version?: string;
  city?: string;
  region?: string;
  region_code?: string;
  country?: string;
  country_name?: string;
  country_code?: string;
  country_code_iso3?: string;
  country_capital?: string;
  country_tld?: string;
  continent_code?: string;
  in_eu?: boolean;
  postal?: string;
  latitude?: number;
  longitude?: number;
  timezone?: string;
  utc_offset?: string;
  country_calling_code?: string;
  currency?: string;
  currency_name?: string;
  languages?: string;
  country_area?: number;
  country_population?: number;
  asn?: string;
  org?: string;
};

const defaultInfo: UserInfo = {
  ip: undefined,
  network: undefined,
  version: undefined,
  city: undefined,
  region: undefined,
  region_code: undefined,
  country: undefined,
  country_name: undefined,
  country_code: undefined,
  country_code_iso3: undefined,
  country_capital: undefined,
  country_tld: undefined,
  continent_code: undefined,
  in_eu: undefined,
  postal: undefined,
  latitude: undefined,
  longitude: undefined,
  timezone: undefined,
  utc_offset: undefined,
  country_calling_code: undefined,
  currency: undefined,
  currency_name: undefined,
  languages: undefined,
  country_area: undefined,
  country_population: undefined,
  asn: undefined,
  org: undefined,
};

export const IPInfoContext = createContext<UserInfo>(defaultInfo);
const localstoreName = 'storefeuinverau_country_code';

const IPInfo = ({ children }: PropsWithChildren<Record<never, never>>) => {
  const [locationData, setLocationData] = useState<UserInfo>(defaultInfo);
  const [currentIp, setcurrentIp] = useState('');

  // on first render, get the ip address and set it
  useEffect(() => {
    // load from local storage
    // get the current IP
    fetch('https://api.ipify.org?format=json')
      .then((response) => response.json())
      .then((data) => {
        // get the location data and check if it has changed
        const localData = localStorage.getItem(localstoreName);
        // parse local storage data
        if (localData) {
          const convertToObj = JSON.parse(localData);
          // check if ip has changed
          if (convertToObj.ip !== data.ip) {
            // change the ip, otherwise do nothing
            setcurrentIp(data.ip);
          } else {
            // set the location data
            setLocationData(convertToObj);
          }
        } else {
          // need new data
          setcurrentIp(data.ip);
        }
      });
  }, []);

  // check if ip has changed -> if it has changed, get the new location data
  useEffect(() => {
    if (currentIp && currentIp !== '') {
      fetch(`https://ipapi.co/${currentIp}/json`)
        .then((response) => response.json())
        .then((data) => setLocationData(data));
    }
  }, [currentIp]);

  // Everytime location data changes, save it to local storage
  useEffect(() => {
    if (locationData && locationData.ip) {
      const convertToStr = JSON.stringify(locationData);
      localStorage.setItem(localstoreName, convertToStr);
    }
  }, [locationData]);

  // make ip the dependency to look for changes
  const userInfo = useMemo(() => locationData, [locationData]);

  return <IPInfoContext.Provider value={userInfo}>{children}</IPInfoContext.Provider>;
};

export default IPInfo;
