import React, { Component } from 'react'
import './Calculator.css'

import Button from '../components/Button'
import Display from '../components/Display'


export default class Calculator extends Component {

    constructor(props) {
        super(props)
        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)
        
        this.state = {display: '0'}
        this.clearDisplay = false
        this.clearMem = false
        this.operation = null
        this.memory = ''
        this.inputValue = ''
    }
    
    clearMemory() {
        this.setState({display: 0})
        this.clearDisplay = false
        this.clearMem = false
        this.operation = null
        this.memory = ''
        this.inputValue = ''
    }

    solveOperation(n1, n2, operation){
        let res = 0
        n1 = parseFloat(n1)
        n2 = parseFloat(n2)

        switch (operation) {
            case '+': res = n1 + n2; break;
            case '-': res = n1 - n2; break;
            case '*': res = n1 * n2; break;
            case '/':
                if (n2 === 0) {
                    this.setState({ display: 'Cannot div by 0' })
                    this.clearMem = true
                    return;
                }
                res = n1 / n2;
            break;
        }
        this.memory = res
        this.setState({display: this.memory})
        this.inputValue = ''
        this.operation = ''
        return res
    }
        
    setOperation(operation){
        if (this.clearMem) this.clearMemory()
        else if (this.clearDisplay) {
            this.display = ''
            this.clearDisplay = false
        }

        //First input
        if(!this.memory){
            this.memory = this.inputValue || 0
            this.inputValue = ''
            this.clearDisplay = true
            if(operation !== '=') this.operation = operation
            return
        }
        // In case the user is changing the operation he wants to be done, and to chain
        // the operations after an '=' operation
        if(!this.inputValue){
            if(operation !== '=') this.operation = operation
            return
        }
        
        this.solveOperation(this.memory, this.inputValue, this.operation)                    
        if(operation !== '=') this.operation = operation
    }

    addDigit(n) {
        //If after the Math error the first key presses was a number, clear the memory
        if (this.clearMem) this.clearMemory()
        else if (this.clearDisplay) {
            this.display = ''
            this.clearDisplay = false
        }

        //After a operation has been done and the user enter a number whitout entering an
        // operation previously, clear the memory
        if(!this.operation && this.memory) this.clearMemory()
        
        //Avoid multiples dots
        if (n === '.' && this.inputValue.includes('.')) return
        
        //Avoid multiples left zeroes
        if (n === 0 && this.inputValue === 0) return
        
        this.inputValue += n
        this.setState({ display: this.inputValue})
    }
    
    render() {
        return (
            <div className="calculator">
                <Display value={this.state.display} />
                <Button label='AC' click={this.clearMemory} triple />
                <Button label='/' click={this.setOperation} operation />
                <Button label='7' click={this.addDigit} />
                <Button label='8' click={this.addDigit} />
                <Button label='9' click={this.addDigit} />
                <Button label='*' click={this.setOperation} operation />
                <Button label='4' click={this.addDigit} />
                <Button label='5' click={this.addDigit} />
                <Button label='6' click={this.addDigit} />
                <Button label='-' click={this.setOperation} operation />
                <Button label='1' click={this.addDigit} />
                <Button label='2' click={this.addDigit} />
                <Button label='3' click={this.addDigit} />
                <Button label='+' click={this.setOperation} operation />
                <Button label='0' click={this.addDigit} double />
                <Button label='.' click={this.addDigit} />
                <Button label='=' click={this.setOperation} operation />
            </div>
        )
    }
}