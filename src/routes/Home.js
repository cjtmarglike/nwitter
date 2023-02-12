import { dbService } from "fbase";
import { useEffect, useState } from "react";
import Nweet from "components/Nweet";
import NweetFactory from "components/NweetFactory";

const Home = ({ userObj }) => {
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
        dbService
            .collection("nweets")
            .orderBy("createdAt", "desc")
            .onSnapshot((snapshot) => {
            const newArray = snapshot.docs.map((document) => ({
                id: document.id,
                ...document.data(),
            }));
            setNweets(newArray);
        });
    }, []);

    return (
        <div className="container">
            <NweetFactory userObj={userObj} />
            <div style={{ marginTop: 30 }}>
                {nweets.map((nweet) => (
                  <Nweet
                    key={nweet.id} 
                    nweetObj={nweet} 
                    isOwner={nweet.creatorId === userObj.uid}
                    />
                ))}
            </div>
        </div>
    );
};

export default Home;