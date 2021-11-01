import React from 'react'
import "./Loader.scss"
export default function Loader(props) {
    return (
        <div style={{ height: '100vh', width: '100%', backgroundColor: 'white' }} className="loader">
            <img src="https://media.giphy.com/media/1Xi8pLxovCB5E82A1t/giphy.gif" className="global"></img>
        </div>
    )
}
