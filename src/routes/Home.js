import { dbService } from "fbase";
import { useEffect, useState } from "react";
import Nweet from "components/Nweet";

const Home = ({ userObj }) => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);

    // dbService 관련 함수는 async-await문을 사용한다.
    // > 실시간 데이터베이스를 사용하도록 변경할 것이므로 삭제
    // const getNweets = async () => {
    //     const dbNweets = await dbService.collection("nweets").get();
    //     dbNweets.forEach((document) => {
    //         const nweetObject = {...document.data(), id: document.id};
    //         setNweets((prev) => [nweetObject, ...prev]); // 전개 구문(spread syntax)
    //     });
    // };

    useEffect(() => {
        // async-await문을 쓰는 함수가 useEffect에 포함되어 있으면
        // 따로 빼내어 정의하고 useEffect에서는 이를 호출하여 사용한다. 
        // getNweets();

        // onSnapshot 함수 적용
        dbService.collection("nweets").onSnapshot((snapshot) => {
            const newArray = snapshot.docs.map((document) => ({
                id: document.id,
                ...document.data(),
            })).sort((a, b) => b.createdAt - a.createdAt);
            setNweets(newArray);
        });
    }, []);

    const onSubmit = async (event) => {
        event.preventDefault();
        // dbService.collections("nweets").add(...)는
        // Promise를 반환하므로 async-await문을 사용
        await dbService.collection("nweets").add({
            text: nweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
        });
        setNweet("");
    };

    const onChange = (event) => {
        event.preventDefault();
        const {
            target: { value },
        } = event;
        setNweet(value);
    };

    return (
        <>
            <form onSubmit={onSubmit}>
                <input
                    value={nweet}
                    onChange={onChange}
                    type="text"
                    placeholder="What's on your mind?"
                    maxLength={120}
                />
                <input type="submit" value="Nweet" />
            </form>
            <div>
                {nweets.map((nweet) => (
                //   <div key={nweet.id}>
                //     <h4>{nweet.text}</h4>
                //   </div>
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

export default Home;