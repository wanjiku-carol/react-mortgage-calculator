import React from 'react';

import { AmortizationChart } from './AmortizationChart';
import { calculatePayment } from './appContainer';

export class MortgageCalculator extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            principal: "",
            years: "",
            rate:""
        };
        this.principalChange = this.principalChange.bind(this);
        this.yearsChange = this.yearsChange.bind(this);
        this.rateChange = this.rateChange.bind(this);
    }
  
    principalChange(event) {
        this.setState({principal: event.target.value});
    }
    yearsChange(event) {
        this.setState({years: event.target.value});
    }
    rateChange(event) {
        this.setState({rate: event.target.value});
    }
    render() {
        var payment = calculatePayment(this.state.principal, this.state.years, this.state.rate);
        var monthlyPayment = payment.monthlyPayment;
        var amortization = payment.amortization;
        return (
            <div className="content">
                <div className="form">
                    <div>
                        <label>Principal:</label>
                        <input type="text" value={this.state.principal} onChange={this.principalChange}/>
                    </div>
                    <div>
                        <label>Years:</label>
                        <input type="text" value={this.state.years} onChange={this.yearsChange}/>
                    </div>
                    <div>
                        <label htmlFor="rate">Rate:</label>
                        <input type="text" value={this.state.rate} onChange={this.rateChange}/>
                    </div>
                </div>
                <h2>Monthly Payment: <span className="currency">{Number(monthlyPayment.toFixed(2)).toLocaleString()}</span></h2>
                <AmortizationChart data={amortization}/>
            </div>
        );
    }
};
