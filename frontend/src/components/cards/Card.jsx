import React, { useEffect, useState } from 'react'
import './Card.css'
import { Link } from 'react-router-dom'

const Card = (props) => {
    const {
        id, name, handleClick
    } = props;
    return (
        <>
            <div className="card " style={{ width: '18rem', color: 'black', margin: "1%" }}>
                <div className="card-body playlist-card" style={{ display: "flex" }}>
                    <div className="left-side">
                        <h5 className="card-title">{name}</h5>
                        <p className="card-text" style={{ color: 'black' }}>{id}</p>
                    </div>
                    <div className="right-side">
                        <button className="btn btn-primary" onClick={handleClick}>View</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card