import React, { createContext, PropsWithChildren, useEffect, useMemo, useState } from 'react';

import axios from 'axios';

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

const defaultInfo: UserInfo = {};

export const IPInfoContext = createContext<UserInfo>(defaultInfo);
const localstoreName = 'storefeuinverau_country_code';

const IPInfo = ({ children }: PropsWithChildren<Record<never, never>>) => {
  const [locationData, setLocationData] = useState<UserInfo>(defaultInfo);
  const [loadlocation, setloadlocation] = useState(false);

  // save location locally on browser
  useEffect(() => {
    if (locationData && locationData.ip) {
      const convertToStr = JSON.stringify(locationData);
      localStorage.setItem(localstoreName, convertToStr);
    }
  }, [locationData]);

  // check if data exists on in local storage
  useEffect(() => {
    if (setLocationData) {
      const ipDataStr = localStorage.getItem(localstoreName);
      const ipData = JSON.parse(ipDataStr || '{}');
      const countryCode = ipData.country_code;

      if (countryCode) {
        const currentip = ipData.ip;

        axios.get('https://api.ipify.org?format=json').then((res) => {
          const ip = res.data.ip;
          // check if ip matches
          if (ip !== currentip) {
            // refetch
            setloadlocation(true);
          } else {
            // set data
            setLocationData(res.data);
          }
        });
      } else {
        // start loaction getting
        // fetch ip -> check if we need to refetch

        setloadlocation(true);
      }
    }
  }, [setLocationData]);

  useEffect(() => {
    if (loadlocation) {
      axios.get('https://api.ipify.org?format=json').then((res) => {
        const ip = res.data.ip;

        if (ip) {
          axios.get(`https://ipapi.co/${ip}/json`).then((res) => {
            setLocationData(res.data);
          });
        }
      });
      setloadlocation(false);
    }
  }, [loadlocation]);

  const userInfo = useMemo(() => locationData || defaultInfo, [locationData]);

  return <IPInfoContext.Provider value={userInfo}>{children}</IPInfoContext.Provider>;
};

export default IPInfo;
