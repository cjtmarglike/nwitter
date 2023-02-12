import { authService, dbService } from "fbase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nweet from "components/Nweet";

const Profile = ({ userObj, refreshUser }) => {
    const navigate = useNavigate();
    const [myNweets, setMyNweets] = useState([]);
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

    const onLogOutClick = () => {
        authService.signOut();
        navigate("/"); // useHistory가 navigate로 대체되어 이전 방법과 크게 다르지 않게 되었다.
    }

    const getMyNweets = async () => {
        const nweets = await dbService
            .collection("nweets")
            .where("creatorId", "==", userObj.uid)
            .orderBy("createdAt", "asc")
            .get();
        setMyNweets(nweets.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        })).reverse());
    };

    const onChange = (event) => {
        const {
            target: { value }
        } = event;
        setNewDisplayName(value);
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        if (userObj.displayName !== newDisplayName) {
            await userObj.updateProfile({ displayName: newDisplayName});
            refreshUser();
        };
    };

    useEffect(() => {
        getMyNweets();
    }, [myNweets]);

    return (
        <>
            <form onSubmit={onSubmit}>
                <input 
                    onChange={onChange}
                    type="text" 
                    placeholder="Display Name"
                    value={newDisplayName}
                />
                <input type="submit" value="Update Profile" />
            </form>
            <button onClick={onLogOutClick}>Log Out</button>
            <div>
                {myNweets.map((nweet) => (
                  <Nweet
                    key={nweet.id} 
                    nweetObj={nweet} 
                    isOwner={nweet.creatorId === userObj.uid}
                    />
                ))}
            </div>
        </>
    );
};

export default Profile;