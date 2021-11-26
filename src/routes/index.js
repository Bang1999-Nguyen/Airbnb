import React from 'react'
import LocationAdmin from '../containers/admin/Location/Location';
import RoomStructure from '../containers/admin/Location/RoomStructure';
import User from '../containers/admin/User/User';


const PageDetail = React.lazy(() => {
    return new Promise(resolve => setTimeout(resolve, 2 * 1000)).then(
        () => import("../containers/PageDetail/PageDetail")
    );
});
const BookingTicket = React.lazy(() => {
    return new Promise(resolve => setTimeout(resolve, 2 * 1000)).then(
        () => import("../containers/BookTicket/BookTicket")
    );
});
const Profile = React.lazy(() => {
    return new Promise(resolve => setTimeout(resolve, 2 * 1000)).then(
        () => import("../containers/Profile/Profile")
    );
});
export const clientRoutes = [
    {
        path: '/:location/:id/:guest/:startDate/:endDate',
        component: PageDetail,
        exact: true,
    },
    {
        path: '/bookTicket/:id/:location/:guest/:startDate/:endDate',
        component: BookingTicket,
        exact: true,
    },
    {
        path: '/profile/:id',
        component: Profile,
        exact: true,
    }
   
]
export const adminRoutes = [
    {
        path: '/admin/room/:id',
        component: RoomStructure,
        exact: true,
    },
    {
        path: '/admin/location',
        component:  LocationAdmin,
        exact: true,
        isPrivate: true,
      },
      {
        path: '/admin/user',
        component: User,
        exact: true,
        isPrivate: true,
      },
]