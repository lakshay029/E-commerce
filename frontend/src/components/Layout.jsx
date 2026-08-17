import react from 'react'
import{Outlet} from 'react-router'

const Layout=()=>{

    return(
        <>
        <div className='bg-blue-950 text-2xl text-red-500 text-center p-5'>Collection</div>
        <Outlet />
        </>
    )
}

export default Layout