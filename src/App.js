import "./App.css";
import { useState } from "react";
import Box from "./component/Box";

//rsp 게임
// 1. 박스 두개(타이틀, 사진, 결과값)
// 2. 가위 바위 보 버튼이 있음
// 3. 버튼을 클릭하면 클릭한 값이 내 박스에 보임
// 4. 컴퓨터 박스에는 랜덤하게 선택된 값이 보임
// 5. 3,4의 결과를 가지고 누가 이겼는지 승패를 따진다
// 6. 승패 겨로가에 따라 테두리 색이 바뀐다.(이김-초록,짐-빨강,비김-검정)
const choice = {
  rock: {
    name: "Rock",
    img: "https://www.pngitem.com/pimgs/m/45-452491_rock-paper-scissors-rock-hd-png-download.png",
  },
  scissors: {
    name: "Scissors",
    img: "https://www.pngfind.com/pngs/m/627-6272685_rock-paper-scissors-hd-png-download.png",
  },
  paper: {
    name: "Paper",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjx9a4CY64kmEAGBkZOOvql2020gd98i6huw&usqp=CAU",
  },
};

function App() {
  const [userSelect, setUserSelect] = useState(null);
  const [computerSelect, setComputerSelect] = useState(null);
  const [result, setResult] = useState("");
  const play = (userchoice) => {
    setUserSelect(choice[userchoice]);
    let computerChoice = randomchoice();
    setComputerSelect(computerChoice);
    setResult(judgement(choice[userchoice], computerChoice));
  };
  const judgement = (user, computer) => {
    if (user.name === computer.name) return "tie";
    else if (user.name === "Rock")
      return computer.name === "Scissors" ? "win" : "lose";
    else if (user.name === "Scissors")
      return computer.name === "Paper" ? "win" : "lose";
    else if (user.name === "Paper")
      return computer.name === "Rock" ? "win" : "lose";
  };
  const randomchoice = () => {
    let itemArray = Object.keys(choice); //Object.keys()는 객체의 키값을 받아 배열로 만들어줌
    let randomItem = Math.floor(Math.random() * itemArray.length);

    return choice[itemArray[randomItem]];
  };
  return (
    <div>
      <div className="main">
        <Box title="You" item={userSelect} result={result} />
        <Box title="Computer" item={computerSelect} result={result} />
      </div>
      <div className="main">
        {/* onClick 할 때는 함수명() 이런 식으로 써주면
        react가 UI를 그릴 때 함수를 그냥 실행해버림
        아래처럼 콜백 형태로 함수를 써줘야 click이벤트가 발생했을때만
        함수를 실행시킬 수 있음 */}
        <button onClick={() => play("scissors")}>가위</button>
        <button onClick={() => play("rock")}>바위</button>
        <button onClick={() => play("paper")}>보</button>
      </div>
    </div>
  );
}

export default App;

/*
  let counter = 0; //변수는 re render 될 때마다 초기화 된다.

  //ui에 보내서 자동으로 업데이트 해줘야 하는 것은 무조건 state로 보내기
  const [counter2, setCounter2] = useState(0);
  const increase = () => {
    counter++;
    setCounter2(counter2 + 1); //setCounter2()는 increase()가 끝나야 실행됨 : 비동기적
    // state가 바뀌면 UI가 다시 렌더링됨(다시 그려줌)->바뀌는데에 시간이 걸림 (state는 비동기적으로 동작)
  };
  // 작동 원리
  // 1. 유저가 버튼을 누름
  // 2. counter+1 해서 1이 됨
  // 3. setCounter2()함수 호출
  // 4. 이때 counter변수는 1, state값은 아직 안변했기 떄문에 그 전값으로 보임
  // 5. app이 다시 re render가 되면서 let counter=0 으로 초기화->counter값은 다시 1이됨
  // 6. 업데이트 된 state값이 보인다.

*/
