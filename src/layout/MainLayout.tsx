import { Outlet } from "react-router-dom"
import Header from '../common/components/Header'
import Footer from "../common/components/Footer"

const MainLayout = () => {
    return (
        <div>
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}

export default MainLayout
