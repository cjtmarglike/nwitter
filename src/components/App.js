import { useEffect, useState } from 'react';
import AppRouter from "components/Router";
import { authService } from 'fbase';

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect 2번째 인자를 []으로 지정해야 컴포넌트가 최초로 렌더링이 완료됐을 때 1회만 동작한다.
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, [])
  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn}/> : "initializing..."}
      {/* &copy: copyright 기호 출력 */}
      {/* JSX에 자바스크립트 코드 삽입 시 코드를 중괄호로 감싸기 */}
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );
}

export default App;
