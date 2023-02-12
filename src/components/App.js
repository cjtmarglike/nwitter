import { useEffect, useState } from 'react';
import AppRouter from "components/Router";
import { authService } from 'fbase';

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  // useEffect 2번째 인자를 []으로 지정해야 컴포넌트가 최초로 렌더링이 완료됐을 때 1회만 동작한다.
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj({
          uid: user.uid,
          displayName: user.displayName,
          updateProfile: (args) => user.updateProfile(args)
        });
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      uid: user.uid,
      displayName: user.displayName,
      updateProfile: (args) => user.updateProfile(args)
    });
  };

  return (
    <>
      {init ? <AppRouter refreshUser={refreshUser} isLoggedIn={Boolean(userObj)} userObj={userObj}/> : "initializing..."}
      {/* &copy: copyright 기호 출력 */}
      {/* JSX에 자바스크립트 코드 삽입 시 코드를 중괄호로 감싸기 */}
    </>
  );
}

export default App;
