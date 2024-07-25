import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
const SongList = (props) => {
    const { name, index } = props;
    return (
        <>
            <ListGroup style={{ alignItems: "center" }}>
                <ListGroup.Item action variant={index % 3 ? (index % 3) % 2 ? "warning" : "primary" : "success"} style={{ width: "90%", marginBottom: "1%" }}>
                    {name}
                </ListGroup.Item>
            </ListGroup>
        </>
    )
}

export default SongList