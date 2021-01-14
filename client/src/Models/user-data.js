export const userData = [
    //roles are admin,manager, and tech
    //admin has full controls so can add locations, assets,users
    //manager can add locations and assets and assign techs to issues
    //techs can only see the dashboard and edit and create issues
    {
        id: 1,
        username: 'Daniel',
        password: '1234',
        role: 'admin',
    },
    {
        id: 2,
        username: 'Justin',
        password: '2345',
        role: 'user',
    },
    {
        id: 3,
        username: 'Eddy',
        password: '3456',
        role: 'user',
    }
]