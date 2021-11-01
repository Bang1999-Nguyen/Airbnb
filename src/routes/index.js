import React from 'react'



const PageDetail = React.lazy(() => {
    return new Promise(resolve => setTimeout(resolve, 2 * 1000)).then(
        () => import("../containers/PageDetail/PageDetail")
    );
});
export const clientRoutes = [
    {
        path: '/:location/:id/:guest/:startDate/:endDate',
        component: PageDetail,
        exact: true,
    },
]