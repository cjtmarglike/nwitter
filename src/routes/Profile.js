import { authService } from "fbase";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate();

    const onLogOutClick = () => {
        authService.signOut();
        navigate("/"); // useHistory가 navigate로 대체되어 이전 방법과 크게 다르지 않게 되었다.
    }
    return (
        <>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    );
};

export default Profile;