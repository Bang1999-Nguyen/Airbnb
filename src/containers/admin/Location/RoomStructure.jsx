import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { actFetchDetail } from '../../PageDetail/module/action';
import { Table, Form, } from 'antd';
import Room from './Room/Room';
import { useFormik } from 'formik';
import locationApi from '../../../apis/airbnb';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from 'glamor';
import EditRoomValue from './Room/EditRoom';
import { actFetchRoom } from '../../BookTicket/module/action';
toast.configure({
    toastClassName: css({
        fontSize: '18px !important',
        backgroundColor: 'red!important',
        padding: '18px !important'
    }),
});
export default function RoomStructure(props) {
    const { DetailOfLocation } = useSelector(state => state.DetailReducer)
    const { token } = useSelector(state => state.authReducer)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(actFetchDetail(props.match.params.id))
    }, [])
    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    }
    const wave = () => toast.success('Update image  successfully👋', { position: toast.POSITION.TOP_RIGHT, autoClose: 2500 })
    const [id, setId] = useState('')
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
           room:''
        },
        onSubmit: (values) => {
            let formData = new FormData();
            formData.append('room', values.room)
            locationApi.changeImageValue(id, formData, token).then(response => {
                setTimeout(() => {
                    setModal(false)
                }, 3000);
               wave()
                dispatch(actFetchDetail(props.match.params.id))
            }).catch(err => {
                console.log(err);
            })
        }
    })
    const waveDelete = () => toast.success('Delete user  successfully👋', { position: toast.POSITION.TOP_RIGHT, autoClose: 2500 })
    const [componentSize, setComponentSize] = useState('default');
    const [create, setCreate] = useState(false)
    const closeCreate = () => setCreate(false)
    const [modal, setModal]= useState(false)
    const [imgSrc, setImgSrc]= useState(null)
    const changeImage = (e) =>{
        let file = e.target.files[0]
        if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/img') {
            // Reader
            let reader = new FileReader();
            reader.readAsDataURL(file)
            reader.onload = (e) => {
                setImgSrc(e.target.result)
            }
            formik.setFieldValue('room', file)
        }
    }
    const [editRoom, setEditRoom] = useState(false)
    const closeEditRoom = () => setEditRoom(false)
    const [item, setItem] = useState('')
    const changeImageValue = (id) =>{
        setModal(true)
       setId(id)
       let index = DetailOfLocation.findIndex(item => item._id === id)
       let itemSelected = DetailOfLocation[index]
       setItem(itemSelected)
    }
    const findRoom = (arr, item) => {
        return arr.filter(function(room){
            return room.name.toLowerCase().indexOf(item.toLowerCase()) !== -1;
        })
    }
    const searchItem = (e) =>{
        if(e.target.value === ''){
            dispatch(actFetchDetail(props.match.params.id))
        }else{
            var arraySelected = findRoom( DetailOfLocation, e.target.value)
            dispatch({
                type:'CUSTOM_ARRAY',
                payload: arraySelected
            })
        }
    }
    const changeInputValue = (id) =>{
        setEditRoom(true)
        setId(id)
        dispatch(actFetchRoom(id))
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
            width: '10%'
        },
        {
            title: 'Name',
            dataIndex: 'name',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.province - b.province,
            width: '15%'
        },
        {
            title: 'Description',
            dataIndex: 'description',
            render: (text, location) => {
                return <p>
                    {location.description.length > 10 ? location.description.substr(0, 50) + '...' : location.description},
                </p>
            },
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.moTa - b.moTa,
            width: '25%'
        },
        {
            title: 'Guests',
            dataIndex: 'guests',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.guests - b.guests,
            width: '5%'
        },
        {
            title: 'Bedroom',
            dataIndex: 'bedRoom',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.bedRoom - b.bedRoom,
            width: '5%'
        },
        {
            title: 'Bath',
            dataIndex: 'bath',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.bath - b.bath,
            width: '5%'
        },
        {
            title: 'Actions',
            width: '18%',
            render: (location) => {
                return (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', fontSize: '20px' }}>
                         <i class="fas fa-images" style={{ color: 'gray' }} onClick={() => changeImageValue(location._id)}></i>
                        <i class="far fa-edit" style={{ color: 'gray', marginLeft: '20px' }} onClick={() => changeInputValue(location._id)}></i>
                        <i class="far fa-trash-alt" style={{ color: 'red', marginLeft: '20px' }} onClick={() =>{
                            locationApi.deleteRoomAdmin(location._id, token).then((response) =>{
                                waveDelete()
                                dispatch(actFetchDetail(props.match.params.id))
                            }).catch(err =>{
                                console.log(err);
                            })
                        }}></i>
                      
                    </div>
                )
            }
        },
    ]
    return (
        <div>
        <div style={{ width: '85%', margin: '50px auto' }}>
            <div className="function">
                <div className="btn-addAdmin">
                    <input type="search" name="Search" placeholder="Search according to room names.." className="w-45 py-3 pl-10 text-sm rounded-md sm:w-auto focus:outline-none bg-coolGray-100 text-coolGray-800 focus:bg-coolGray-50" onKeyUp={searchItem}/>
                    <svg fill="currentColor" viewBox="0 0 512 512" className="w-1 h-4 text-coolGray-800 icon-admin">
                        <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z" />
                    </svg>
                </div>
                <div className="btn-addAdmin">
                    <button onClick={() => setCreate(true)}>Add New Location</button>
                </div>
            </div>
            <Table columns={columns} dataSource={ DetailOfLocation} className="mt-2" style={{ fontSize: '18px' }} />
            {create ? <div className="back_drop"></div> : null}
            <Room create={create}  closeCreate={ closeCreate} id={props.match.params.id}/>
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
                            <input type="file" accept="image/img, image/jpeg, image/gif, image/png"  name="room" onChange={changeImage}></input>

                            <div className="people-i" style={{ backgroundImage: `url(${imgSrc === null ? item.image : imgSrc})`, width: '70px', height: '70px', borderRadius: '50%', backgroundPosition: 'center', backgroundSize: 'cover' }}>
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
            
        </div>
        {editRoom ? <div className="back_dropAdmin"></div> : null}
            <EditRoomValue editRoom={editRoom} id={id} closeEditRoom ={closeEditRoom}/>
           
        </div>
         
  

    )
}
