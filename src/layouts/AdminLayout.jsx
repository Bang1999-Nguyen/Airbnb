import React, { useEffect } from 'react'
import { Menu } from 'antd';
import {
    TeamOutlined,
    VideoCameraOutlined,
    DesktopOutlined
} from '@ant-design/icons';
import { Link, } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { actFetchInformation } from '../containers/Profile/module/action';
import withLayout from '../hocs/withLayout';
import { Redirect } from 'react-router-dom';
 function AdminLayout(props) {
    const dispatch = useDispatch()
    const { Information } = useSelector(state => state.ProfileReducer)
    const { currentUser } = useSelector(state => state.authReducer)
    useEffect(() => {
        dispatch(actFetchInformation(currentUser._id))
    }, [])

    return currentUser.type === 'ADMIN' ?(
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-transparent py-3">
                <div className="container-fluid">
                    <a href="#" aria-label="Back to homepage" className="flex items-center">
                        <img src="https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png" alt="" />
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <form className="d-flex ml-auto" style={{ alignItems: 'center' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: '400', marginRight: '10px' }}>Hello!</h3>
                            <h3 style={{ fontSize: '18px', fontWeight: '500', marginRight: '10px' }}>{Information.name}</h3>
                            <div >
                                <img src={`${Information?.avatar}`} style={{ height: '50px', width: '50px', borderRadius: '50%' }}></img>
                            </div>
                        </form>
                    </div>
                </div>
            </nav>
            <div style={{ height: '1900px', width: '100%', background: '#ECF0F1', position: 'relative', display: 'flex', justifyContent: 'center' }}>
                <div style={{ height: '1900px', width: '20%' }}>
                    <div style={{ height: '1900px', width: '100%', background: '#211d2c' }}>
                        <div style={{ height: '80px', borderBottom: '1.5px solid gray' }}>
                            <h1 style={{ color: 'white', lineHeight: '80px', letterSpacing: '1.5px', fontSize: '30px' }}>Dashboard</h1>
                        </div>
                        <div className="py-5 px-3">
                            <Menu theme="dark" mode="inline" defaultSelectedKeys='1' style={{ backgroundColor: 'transparent', padding: '0 20px' }} >
                                <Menu.Item key="1" icon={<DesktopOutlined />}>
                                    <Link to="/admin">Dashboard</Link>
                                </Menu.Item>
                                <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                                    <Link to="/admin/location">Location</Link>
                                </Menu.Item>
                                <Menu.Item key="3" icon={<TeamOutlined />}>
                                    <Link to="/admin/user">User</Link>
                                </Menu.Item>
                            </Menu>
                        </div>
                    </div>
                </div>
                <div style={{ height: '1900px', width: '80%' }}>
                    {props.children}
                </div>
            </div>
        </div>
    ) : (
        <Redirect to="/" />
      );
}
export default withLayout(AdminLayout)
