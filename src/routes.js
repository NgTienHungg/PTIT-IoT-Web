import React from 'react';
import Myprofile from './Components/myprofile/Myprofile';
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
]

export default routes;