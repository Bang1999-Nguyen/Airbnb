import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { actFetchLocationAdmin } from './module/action';
import { Table } from 'antd';
import './Location.scss'
import locationApi from '../../../apis/airbnb';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from 'glamor';
import { actMoreDetail } from '../../PageDetail/module/action';
import { Form } from 'antd';
import { useFormik } from 'formik';
import EditLocation from './EditLocation/EditLocation';
import { NavLink } from 'react-router-dom'
toast.configure({
    toastClassName: css({
        fontSize: '18px !important',
        backgroundColor: 'red!important',
        padding: '18px !important'
    }),
});
export default function LocationAdmin(props) {
    const { listLocation } = useSelector(state => state.CarouselAdminReducer)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(actFetchLocationAdmin())
    }, [])
    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    }
    const [componentSize, setComponentSize] = useState('default');
    const wave = () => toast.success('Create a new location  successfully👋', { position: toast.POSITION.TOP_RIGHT, autoClose: 2500 })
    const waveDelete = () => toast('Delete location  successfully👋', { position: toast.POSITION.TOP_RIGHT, autoClose: 2500 })
    const { token } = useSelector(state => state.authReducer)
    const [show, setShow] = useState(false)
    const [modal, setModal]= useState(false)
    const [location, setLocation] = useState({});
    const onChangeValue = (e) =>{
        const {name, value} = e.target;
        setLocation(prevState => ({
            ...prevState,
            [name]: value,
        }));
    }
    const findLocation = (arr, item) => {
        return arr.filter(function(location){
            return location.province.toLowerCase().indexOf(item.toLowerCase()) !== -1;
        })
    }
    const searchItem = (e) =>{
        if(e.target.value === ''){
            dispatch(actFetchLocationAdmin())
        }else{
            var arraySelected = findLocation( listLocation, e.target.value)
            dispatch({
                type:'CUSTOM_LOCATION',
                payload: arraySelected
            })
        }
    }
    const createLocation= () =>{
        locationApi.createNewLocation(location, token).then(response =>{
            wave()
            dispatch(actFetchLocationAdmin())
            setTimeout(() =>{
                setShow(false)
            }, 1000)
        }).catch(err =>{
            console.log(err);
        })
    }
    const [itemSelected, setItemSelected] = useState('')
    const {  moreDetail } = useSelector(state => state.DetailReducer)
    const [id, setId] = useState('')
    const changeImage = (id) =>{
       setModal(true)
       let idx = listLocation.findIndex(item => item._id === id)
       let item = listLocation[idx]
       setItemSelected(item)
       setId(id)
    }
    const [input, setInput]= useState(false)
    const closeHandle = () => setInput(false)
    const changeDetail = (id) =>{
        dispatch(actMoreDetail(id))
        setInput(true)
        setId(id)
    }
    const deleteLocation = (id) =>{
        locationApi.deleteLocationAdmin(id, token).then(response =>{
            waveDelete()
            dispatch(actFetchLocationAdmin())
           
        }).catch(err =>{
            console.log(err);
        })
    }
    const formik = useFormik({
        initialValues: {
            location: {}
        },
        onSubmit: (values) => {
            let formData = new FormData();
            formData.append('location', values.location)
            locationApi.updateImageForLocation(id, formData, token).then(response => {
                wave()
                setTimeout(() => {
                    setModal(false)
                }, 3000);
                dispatch(actFetchLocationAdmin())
            }).catch(err => {
                console.log(err);
            })
        }
    })
    const [imgSrc, setImgSrc] = useState(null)
    const handleImage = (e) => {
        let file = e.target.files[0]
        if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/img') {
            // Reader
            let reader = new FileReader();
            reader.readAsDataURL(file)
            reader.onload = (e) => {
                setImgSrc(e.target.result)
            }
            formik.setFieldValue('location', file)
        }
    }
   
    const columns = [
        {
            title: 'Image',
            dataIndex: 'hinhAnh',
            render: (text, location) => {
                return <div>
                    <img src={location.image} alt={location.image} width={80} height={60} onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://i.pinimg.com/736x/a1/88/3a/a1883aa6e53df2b48626a655d67ea4da.jpg";
                    }
                    } style={{ borderRadius: '10%' }} />
                </div>
            },
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.age - b.age,
            width: '15%'
        },
        {
            title: 'Name',
            dataIndex: 'name',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.province - b.province,
            width: '20%'
        },
        {
            title: 'Evaluate',
            dataIndex: 'valueate',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.valueate - b.valueate,
            width: '8%'
        },
        {
            title: 'Province',
            dataIndex: 'province',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.province - b.province,
            width: '20%'
        },
        {
            title: 'Actions',
            width: '23%',
            render: (location) => {

                return (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', fontSize: '20px' }}>
                         <i class="fas fa-images" style={{ color: 'gray' }} onClick={() => changeImage(location._id)}></i>
                        <i class="far fa-edit" style={{ color: 'gray', marginLeft: '20px' }} onClick={() => changeDetail(location._id)}></i>
                        <i class="far fa-trash-alt" style={{ color: 'red', marginLeft: '20px' }} onClick={() => deleteLocation(location._id)}></i>
                       <NavLink to={`/admin/room/${location._id}`} style={{fontSize:'15px', marginLeft: '20px' }}>List rooms</NavLink>
                    </div>
                )
            }
        },
    ]
    return (
        <div style={{ width: '85%', margin: '50px auto' }}>
            <div className="function">
                <div className="btn-addAdmin">
                    <input type="search" name="Search" placeholder="Search according to province..." className="w-45 py-3 pl-10 text-sm rounded-md sm:w-auto focus:outline-none bg-coolGray-100 text-coolGray-800 focus:bg-coolGray-50" onKeyUp={searchItem}/>
                    <svg fill="currentColor" viewBox="0 0 512 512" className="w-1 h-4 text-coolGray-800 icon-admin">
                        <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z" />
                    </svg>
                </div>
                <div className="btn-addAdmin">
                    <button onClick={() => setShow(true)}>Add New Location</button>
                </div>
            </div>
            <Table columns={columns} dataSource={listLocation} className="mt-2" style={{ fontSize: '18px' }} />
            {show ? <div className="back_drop"></div> : null}
            <div className="evaluation__wrapProfile" style={{
                opacity: show ? '1' : '0',
                transform: show ? 'translateY(13%)' : 'translateY(-150vh)'
            }}>

                <div className="content-profile">
                    <p>Create a new location if you want</p>
                    <input name="name" placeholder="Name" onChange={onChangeValue}></input>
                    <input name="province" placeholder="Province" onChange={onChangeValue}></input>
                    <input name="country" placeholder="Country" onChange={onChangeValue}></input>
                    <input name="valueate" placeholder="Evaluation" onChange={onChangeValue}></input>
                </div>
                <button className="rateIsAdmin" onClick={() => createLocation()}>Create new location</button>
                {/* <button className="later" >May be later</button> */}

                <div className="modal-close" onClick={() => setShow(false)}>
                    <svg width="16px" height="16px" viewBox="0 0 16 16" className="icon-close w-1half h-1half absolute pinX-50 pinY-50 translate-50-ul close_icon"><g stroke="none" stroke-width="1" fill="white" fill-rule="evenodd" stroke-linecap="square"><g transform="translate(-1328.000000, -34.000000)" stroke="currentColor"><g transform="translate(1328.000000, 34.000000)"><path d="M1,1 L15,15" id="Line-3"></path> <path d="M1,1 L15,15" id="Line-3" transform="translate(8.000000, 8.000000) scale(-1, 1) rotate(-1.000000) translate(-8.000000, -8.000000) "></path></g></g></g></svg>
                </div>
                
            </div>
            {modal ? <div className="back_drop"></div> : null}
            <div className="evaluation__wrapProfileAdmin" style={{
                opacity: modal ? '1' : '0',
                transform: modal ? 'translateY(13%)' : 'translateY(-150vh)'
            }}>

                <Form onSubmitCapture={formik.handleSubmit}
                    labelCol={{
                        span: 4,
                    }}
                    wrapperCol={{
                        span: 20,
                    }}
                    layout="horizontal"
                    initialValues={{
                        size: componentSize,
                    }}
                    onValuesChange={onFormLayoutChange}
                    size={componentSize}
                    className="form-Change"
                    style={{ marginTop: '50px' }}
                >
                    <div className="content-profileSed">
                        <p>Change your avatar if you want</p>
                        <div className="img-sed">
                            <input type="file" accept="image/img, image/jpeg, image/gif, image/png"  name="location" onChange={handleImage}></input>

                            <div className="people-i" style={{ backgroundImage: `url(${imgSrc === null ? itemSelected.image : imgSrc})`, width: '70px', height: '70px', borderRadius: '50%', backgroundPosition: 'center', backgroundSize: 'cover' }}>
                            </div>
                        </div>
                    </div>
                    <button className="rateIs" type="submit" key="submit">Change</button>
                    <button className="later" onClick={() =>  setModal(false)}>May be later</button>
                </Form>
                <div className="modal-close" onClick={() => setModal(false)}>
                    <svg width="16px" height="16px" viewBox="0 0 16 16" className="icon-close w-1half h-1half absolute pinX-50 pinY-50 translate-50-ul close_icon"><g stroke="none" stroke-width="1" fill="white" fill-rule="evenodd" stroke-linecap="square"><g transform="translate(-1328.000000, -34.000000)" stroke="currentColor"><g transform="translate(1328.000000, 34.000000)"><path d="M1,1 L15,15" id="Line-3"></path> <path d="M1,1 L15,15" id="Line-3" transform="translate(8.000000, 8.000000) scale(-1, 1) rotate(-1.000000) translate(-8.000000, -8.000000) "></path></g></g></g></svg>
                </div>
            </div>
            {input ? <div className="back_drop"></div> : null}
            <EditLocation input={input} closeHandle={closeHandle} id={id}/>
             {/* {create ? <div className="back_drop"></div> : null}
           <Room create={create} closeCreate={closeCreate}/> */}
            
        </div>
    )
}
