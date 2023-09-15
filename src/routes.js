import React from 'react';
import Myprofile from './Components/myprofile/Myprofile';
import DataSensor from './Components/dataSensor/dataSensor';
import LightEvent from './Components/event/lightEvent';
import Page from './Components/page/page';

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
        path: "/events/light",
        main: () => <LightEvent />
    }
]

export default routes;