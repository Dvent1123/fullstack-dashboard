import React from 'react'
import HomeContainer from '../Helpers/HomeContainer'

const HomeAssets = ({assets}) => {

    return (
            <section className="home-containers">
                <div className="section-title">
                    <h1>Assets</h1>
                </div>
                <section className="section-container">
                    <div className="section-title">
                        <h2>Immediate Action</h2>
                    </div>
                        {
                            assets.filter(asset => asset.status === 1).map(filteredAsset => {
                                return (
                                    <div key={filteredAsset.id}>
                                        <HomeContainer item={filteredAsset}/>
                                    </div>
                                )
                            })
                        }
                    </section>
                <section className="section-container">
                    <div className="section-title">
                        <h2>Needs Service</h2>
                    </div>
                    {
                            assets.filter(asset => asset.status === 2).map(filteredAsset => {
                                return (
                                    <div key={filteredAsset.id}>
                                        <HomeContainer item={filteredAsset}/>
                                    </div>
                                )
                            })
                        }
                </section>
            </section>
    )
}

export default HomeAssets
