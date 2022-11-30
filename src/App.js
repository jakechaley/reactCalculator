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

const toLocaleString = (number) =>
  String(number).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

const removeSpaces = (number) => number.toString().replace(/\s/g, "");

const App = () => {
  let [calc, setCalc] = useState({
    sign: "",
    number: 0,
    calculated: 0,
  });

  const numberHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    if (removeSpaces(calc.number).length < 16) {
      setCalc({
        ...calc,
        number:
          calc.number === 0 && value === "0"
            ? "0"
            : removeSpaces(calc.number) % 1 === 0
            ? toLocaleString(Number(removeSpaces(calc.number + value)))
            : toLocaleString(calc.number + value),
        calculated: !calc.sign ? 0 : calc.calculated,
      });
    }
  };

  const decimalClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
  
    setCalc({
      ...calc,
      number: !calc.number.toString().includes(".") ? calc.number + value : calc.number,
    });
  };

  const signClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalc({
      ...calc,
      sign: value,
      calculated: !calc.calculated && calc.number ? calc.number : calc.calculated,
      number: 0,
    });
  };

  const equalsClickHandler = () => {
    if (calc.sign && calc.number) {
      const math = (a, b, sign) =>
        sign === "+"
          ? a + b
          : sign === "-"
          ? a - b 
          : sign === "X"
          ? a * b
          : a / b;
      
      setCalc({
        ...calc,
        calculated: 
          calc.number === "0" && calc.sign === "/"
            ? "Can't divide with 0"
            : toLocaleString(
                math(
                  Number(removeSpaces(calc.calculated)),
                  Number(removeSpaces(calc.number)),
                  calc.sign
                )
            ),
        sign: "",
        number: 0,
      });
    }
  };

  const invertClickHandler = () => {
    setCalc({
      ...calc,
      number: calc.number ? toLocaleString (removeSpaces(calc.number) * -1) : 0,
      calculated: calc.calculated ? toLocaleString (removeSpaces(calc.calculated) * -1) : 0,
      sign: "",
    });
  };

  const percentClickHandler = () => {
    let number = calc.number ? parseFloat(removeSpaces(calc.number)) : 0;
    let calculated = calc.calculated ? parseFloat(removeSpaces(calc.calculated)) : 0;

    setCalc({
      ...calc,
      number: (number /= Math.pow(100, 1)),
      calculated: (calculated /= Math.pow(100, 1)),
      sign: "",
    });
  };

  const resetClickHandler = () => {
    setCalc({
      ...calc,
      sign: "",
      number: 0,
      calculated: 0,
    });
  };

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
                  : numberHandler
              }
            />
          );
        })}
    </ButtonBox>
  </Wrapper>
  );
};

export default App;