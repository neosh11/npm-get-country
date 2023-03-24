# npm-get-country

<p>
<img src="https://img.shields.io/pypi/wheel/pip?color=green&label=es6"/>
<img src="https://img.shields.io/pypi/wheel/pip?color=green&label=React"/>

<img src="https://img.shields.io/bundlephobia/min/ip-info-react/1.0.0"/>
<img src="https://img.shields.io/bundlephobia/minzip/ip-info-react/1.0.0"/>
<img src="https://img.shields.io/npm/v/ip-info-react"/>

<img src="https://img.shields.io/twitter/follow/IGrowNeo?style=social"/>

</p>

## IPInfo - React Context for IP and Location Information

IPInfo is a simple React context for fetching and storing IP and location information of a user. It uses `ipify.org` to get the user's IP address and `ipapi.co` to fetch detailed location data.

## Features

- Fetches user's IP address and location data
- Stores location data in local storage for faster access
- Automatically refetches data if IP address changes
- Provides a React context to access the fetched information

## Usage

### 1. Wrap your app

```ts
import IPInfo from 'ip-info-react';

function App() {
  return <IPInfo>{/* Your application components */}</IPInfo>;
}
```

### 2. Use it wherever you want

```ts
import { useContext } from 'react';
import { IPInfoContext } from 'ip-info-react';

function MyComponent() {
  const userInfo = useContext(IPInfoContext);

  // Access the fetched data
  console.log(userInfo.ip);
  console.log(userInfo.city);
  console.log(userInfo.country_name);

  return (
    // Your component JSX
  );
}
```

## Data Structure

The userInfo object provided by the IPInfoContext contains the following properties:

```ts
type UserInfo = {
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
```

Please note that some properties may be undefined if the data is not available.

## Dependencies

- React
