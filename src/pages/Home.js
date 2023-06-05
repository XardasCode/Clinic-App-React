import {useSelector} from "react-redux";
import DoctorCards from "../component/DoctorCards";
import UserGreetings from "../component/UserGreeting";


const Home = () => {
    const user = useSelector(state => state.userAuth.user);

    return (
        <div className={"container mb-5"}>
            <UserGreetings/>
            {user.role === "USER" && (
                <DoctorCards/>
            )}
        </div>
    )
};
export default Home;