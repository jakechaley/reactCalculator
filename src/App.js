import Wrapper from "./components/Wrapper";
import Screen from "./components/Screen";
import ButtonBox from "./components/ButtonBox";
import Button from "./components/Button";
import React, { useState } from "react";

const btnValues = [
  ["C", "+-", "%", "/"],
  [7, 8, 9, "X"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
];

const App = () => {
  let [calc, setCalc] = useState({
    sign: "",
    number: 0,
    calculated: 0,
  });

  return (
    <Wrapper>
      <Screen value={calc.number ? calc.number : calc.calculated} />
      <ButtonBox>
        {
          btnValues.flat().map((btn, i) => {
            return (
              <Button
              key={i}
              className={btn === "=" ? "equals" : ""}
              value={btn}
              onClick={
                btn === "C"
                  ? resetClickHandler
                  : btn === "+-"
                  ? invertClickHandler
                  : btn === "%"
                  ? percentClickHandler
                  : btn === "="
                  ? equalsClickHandler
                  : btn === "/" || btn === "X" || btn === "-" || btn === "+"
                  ? signClickHandler
                  : btn === "." 
                  ? decimalClickHandler 
                  : numberHanddler
              }
            />
          );
        })}
    </ButtonBox>
  </Wrapper>
  );
};

export default App;