import React, { Component } from 'react';
import './App.css';
import Output from './Components/Output';
import Text from './Components/Controls/Text';

import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paras: 4,
      html: true,
      text: ''
    }
  }

componentWillMount(){
  this.getSampleText();
}

getSampleText(){
  axios.get('http://hipsterjesus.com/api/?paras='+this.state.paras+'&html='+this.state.html)
  .then((response) => {
    console.log(response);
    this.setState({text: response.data.text}, function(){
      console.log(this.state);
    });
  })
  .catch((err) => {
    console.log(err);
  });
}

showHtml(x){
  this.setState({html: x}, this.getSampleText);
}

changeParas(number){
  this.setState({paras: number}, this.getSampleText);
}


  render() {
    return (
      <div className="App container">
        <header>
          <h1 className="text-center">Sample Hipster Jesus Text Generator </h1>

        </header>
        <br />
        <form className="form-inline">
        <div className="form-group">
          <label>Number of paragraphs:</label>
          <Text value={this.state.paras} onChange={this.changeParas.bind(this)}/>
        </div>
      </form>
        <br />
        <div className="Output">
          <Output value={this.state.text} />
        </div>
      </div>
    );
  }
}

export default App;
