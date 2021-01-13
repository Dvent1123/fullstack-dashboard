export const assetData = [
    {
        id: 1,
        name: 'computer',
        status: 2,       //1 = good/working, 2 = pending updates/servicing, 3 = not working/down
        location: 'Tempe',   //this will correspond to the location in the location data
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi in tempore blanditiis atque nisi repudiandae cupiditate!',
        issue: 'Broken Screen',
        tech: 'Ted'     //this will corespond to a user name and is the person assigned to this asset to fix it, could be none
    },
    {
        id: 2,
        name: 'server',
        status: 1,       //1 = good/working, 2 = pending updates/servicing, 3 = not working/down
        location: 'Havasu',   //this will correspond to the location in the location data
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi in tempore blanditiis atque nisi repudiandae cupiditate!',
        issue: 'none',  //can also be none because no issues
        tech: 'none'     //this will corespond to a user name and is the person assigned to this asset to fix it, could be none
    },
    {
        id: 3,
        name: 'computer',
        status: 3,       //1 = good/working, 2 = pending updates/servicing, 3 = not working/down
        location: 'Phoenix',   //this will correspond to the location in the location data
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi in tempore blanditiis atque nisi repudiandae cupiditate!',
        issue: 'Broken Everything',
        tech: 'Daniel'     //this will corespond to a user name and is the person assigned to this asset to fix it, could be none
    }
]