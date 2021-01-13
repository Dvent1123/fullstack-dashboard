import React from 'react'

const AssetItems = ({asset}) => {
    const {id, name, status} = asset
    return (
        <section className="asset-container">
            <div className="asset-name"><h2>Name: {name}</h2></div>
            <div className="assset-num"><h2>Num: {id}</h2></div>
            <div className="asset-status"><h2>Status: {status}</h2></div>
        </section>
    )
}

export default AssetItems
