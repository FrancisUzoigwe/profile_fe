import { useDispatch } from "react-redux"
import { logOut } from "../../global/globalState"

const Dashboard = () => {

    const dispatch = useDispatch()
    return (
        <div onClick={() => {
            dispatch(logOut())
        }}>Dashboard</div>
    )
}

export default Dashboard