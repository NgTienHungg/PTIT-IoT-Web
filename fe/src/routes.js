import React from 'react';
import Page from './Components/page/page';
import Myprofile from './Components/myprofile/Myprofile';
import DataSensor from './Components/dataSensor/dataSensor';
import DataLedFan from './Components/dataLedFan/dataLedFan';

const routes = [
    {
        id: 1,
        path: "*",
        main: () => <Page />
    },
    {
        id: 2,
        path: "/Myprofile",
        main: () => <Myprofile />
    },
    {
        id: 3,
        path: "/DataSensor",
        main: () => <DataSensor />
    },
    {
        id: 4,
        path: "/DataLedFan",
        main: () => <DataLedFan />
    }
]

export default routes;