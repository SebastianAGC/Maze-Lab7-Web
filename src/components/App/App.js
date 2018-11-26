import React, { Component } from "react"  ;
import "./App.css";

class App extends Component {

	constructor(){
		super();
		this.state = {
    	matriz: [],
			gameOver: false,
			x: 1,
			y: 1,
			dir: "right"
		};
	}

	componentDidMount(){
		this.consume();
	}

	handleMove(event){
		console.log("moving...")
		let key = event.keyCode;
		let oldX = this.state.x;
		let oldY = this.state.y;
		let newX = 0;
		let newY = 0;
		let newDir  =  "";

		if(key == 39){
			newX = this.state.x;
			newY = this.state.y + 1;
			newDir = "right"
		}
		if(key == 37){
			newX = this.state.x;
			newY = this.state.y - 1;
			newDir = "left"
		}
		if(key == 40){
			newX = this.state.x + 1;
			newY = this.state.y;
			newDir = "down"
		}
		if(key == 38){
			newX = this.state.x - 1;
			newY = this.state.y;
			newDir = "up";
		}

		if(this.state.matriz[newX][newY] == " "){
			this.setState({
				x: newX,
				y: newY,
				dir: newDir
			})
			this.state.matriz[newX][newY] = "p";
			this.state.matriz[oldX][oldY] = " ";

		}else if(this.state.matriz[newX][newY] ==  "g"){
			this.state.matriz[newX][newY] = "p";
			this.state.matriz[oldX][oldY] = " ";
			this.setState({
				gameOver: true
			})
		}
	}

	consume(){
		const url = "http://34.210.35.174:3001?type=json"
		fetch(url)
			.then((resp) => resp.json()) // Transform the data into json
		 	.then((data) => {
					this.setState({
						matriz: data
					})
		    })
	}

	render()  {
		var matriz = this.state.matriz;
		var dir = this.state.dir;
		if(this.state.gameOver == true){
				setTimeout(function(){ alert("You won!"); }, 666);
		}
		return (
			<div  onKeyDown={this.handleMove.bind(this)} tabIndex="0">
				<div class="maze">
				{
					matriz.map((element) => {
						return element.map((subElement) =>{
							if(subElement == "-" || subElement == "+" || subElement == "|"){
								return(
									<div class="wall"></div>
								)
							}
							if(subElement =="p"){
								if(dir=="right"){
									return(
										<div class="player-right"></div>
									)
								}

								if(dir=="left"){
									return(
										<div class="player-left"></div>
									)
								}

								if(dir=="up"){
									return(
										<div class="player-up"></div>
									)
								}

								if(dir=="down"){
									return(
										<div class="player-down"></div>
									)
								}
							}
							if(subElement =="g"){
								return(
									<div class="goal"></div>
								)
							}
							if(subElement ==" "){
								return(
									<div class="space"></div>
								)
							}
						})
					})
				}
				</div>
			</div>
		);
	}
}
export default App;
