import React, { useEffect, useState } from "react";
import "./index.scss";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";

const MainBox = () => {
  const [state, setstate] = useState({
    amount: 500,
    months: 6,
    interestRate: 0,
    monthlyPayment: 0,
    numPayments: 0,
  });

  const url = `https://ftl-frontend-test.herokuapp.com/interest?amount=${state.amount}&numMonths=${state.months}`;

  useEffect(() => {
    const abortController = new AbortController();
    fetch(url, { signal: abortController.signal })
      .then((response) => response.json())
      .then((responseJson) => {
        const obj = {
          interestRate: +responseJson.interestRate,
          monthlyPayment: +responseJson.monthlyPayment.amount,
          numPayments: +responseJson.numPayments,
        };
        setstate({ ...state, ...obj });
      })
      .catch((err) => {});
    return () => {
      abortController.abort();
    };
  }, [url]);

  return (
    <React.Fragment>
      <main className="main">
        <div className="input-form row">
          <form class="col-sm-12 col-md-6">
            <div className="form-group">
              <InputRange
                maxValue={5000}
                minValue={100}
                step={100}
                value={state.amount}
                onChange={(amount) => setstate({ ...state, amount })}
                formatLabel={(val) => `${val} $`}
              />

              <label>Сумма кредита</label>
            </div>
            <div className="form-group">
              <InputRange
                maxValue={24}
                minValue={6}
                value={state.months}
                onChange={(months) => setstate({ ...state, months: months })}
              />
              <label>Срок кредита в месяцах</label>
            </div>
          </form>
          <div className="current-status col-sm-12 col-md-6">
            <h4>Параметры кредита</h4>
            <div className="row2">
              <div className="col2"> Годовая ставка, % </div>
              <div className="col2"> {`${state.interestRate}`} </div>
            </div>
            <div className="row2">
              <div className="col2"> Месячный платёж, $ </div>
              <div className="col2"> {`${state.monthlyPayment}`} </div>
            </div>
            <div className="row2">
              <div className="col2"> Количество платежей </div>
              <div className="col2"> {state.numPayments} </div>
            </div>
          </div>
        </div>
      </main>
    </React.Fragment>
  );
};

export default MainBox;
