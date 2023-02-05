import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from 'routes/Auth';
import Home from 'routes/Home';
import Profile from 'routes/Profile';
import Navigation from './Navigation';

const AppRouter = ({isLoggedIn}) => {
    return (
        <Router>
            {isLoggedIn && <Navigation />}
            <Routes>
                {isLoggedIn ? (
                    <>
                        // Route 컴포넌트에 exact, path="/" props를 전달
                        // props에 true or false 전달 시 true는 생략 가능
                        <Route exact path="/" element={<Home />} />
                        <Route exact path="/profile" element={<Profile />} />
                    </>
                ) : (
                    <Route exact path="/" element={<Auth />} />
                )}
                // logout 이후 user가 없으므로 isLoggedIn은 false가 되는데
                // false로 분기하는 Route의 동작 조건 주소가 "/"이므로 해당 Route는 무시되고
                // 최종적으로 아래 Redirect가 동작한다.
                // --- React Router v6에서 Redirect가 Navigate로 대체됨
                // ----- Navigate 대신 useHistory를 사용하는 방식으로 변경
                // ------- useHistory가 navigate로 대체되어 별다를 바 없어짐
                {/* <Route path="/*" element={<Navigate to="/" />} /> */}
            </Routes>
        </Router>
    );
};

export default AppRouter;