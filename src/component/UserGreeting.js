import {useSelector} from "react-redux";


const UserGreetings = () => {
    const user = useSelector(state => state.userAuth.user);

    return (
        <div className={"row"}>
            {user.role === "USER" && (
                <div className={"col-12"}>
                    <h1>Welcome to Clinic</h1>
                    <hr className={"mb-5 mt-4"}/>
                    <h2>Hello, {user.name}</h2>
                    <p className={"lead mt-3"}>You are patient of our clinic. Here you can make an appointment to
                        doctor.</p>
                    <p className={"lead mt-3"}>You can also see your appointments and cancel them if you want.</p>
                    <p className={"lead mt-3"}>You can also see your medical history.</p>

                    <hr className={"mt-5 mb-4"}/>
                </div>
            )}
            {user.role === "DOCTOR" && (
                <div className={"col-12"}>
                    <h1>Welcome to Clinic</h1>
                    <hr className={"mb-5 mt-4"}/>
                    <h2>Hello, {user.name}</h2>
                    <p className={"lead mt-3"}>You are doctor of our clinic. Here you can see your appointments and
                        change their status.</p>
                    <p className={"lead mt-3"}>You can also see your medical history.</p>
                </div>
            )}
        </div>
    )
};

export default UserGreetings;