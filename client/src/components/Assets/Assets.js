import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import AssetItems from './AssetItems'
import  { assetData } from '../../Models/asset-data'

const Assets = () => {
    const [assets, setAssets] = useState(assetData)


    return (
        <div className='assets-container'>
            <div className='assets-title'><h1>You are in the Locations Page</h1></div>
                <section className="assets-items-container">
                    {
                        assets.map((asset) => {
                            return (
                            <div key={asset.id}>
                                <Link to={`/assets/${asset.id}`} className="nav-location">
                                    <AssetItems asset={asset} />
                                </Link>
                            </div>
                            )
                        })
                    }
 
                </section>
        </div>
    )
}

export default Assets
