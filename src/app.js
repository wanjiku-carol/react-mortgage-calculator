import React from 'react';
import ReactDOM from 'react-dom';

import { Header } from './Header';
import { MortgageCalculator } from './MortgageCalculator';

var calculatePayment = function(principal, years, rate) {
    var monthlyRate = rate / 100 / 12;
    var monthlyPayment = principal * monthlyRate / (1 - (Math.pow(1/(1 + monthlyRate), years * 12)));
    var balance = principal;
    var amortization = [];
    for (var y=0; y<years; y++) {
        var interestY = 0;  //Interest payment for year y
        var principalY = 0; //Principal payment for year y
        for (var m=0; m<12; m++) {
            var interestM = balance * monthlyRate;       //Interest payment for month m
            var principalM = monthlyPayment - interestM; //Principal payment for month m
            interestY = interestY + interestM;
            principalY = principalY + principalM;
            balance = balance - principalM;
        }
        amortization.push({principalY: principalY, interestY: interestY, balance: balance});
    }
    return {monthlyPayment: monthlyPayment, amortization:amortization};
};

class App extends React.Component{
    render() {
        return (
            <div>
                <Header title="React Mortgage Calculator"/>
                <MortgageCalculator principal="200000" years="30" rate="5"/>
            </div>
        );
    }
};

ReactDOM.render(<App/>,  document.getElementById("app"));