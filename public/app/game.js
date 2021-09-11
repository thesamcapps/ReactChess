class GameBoard extends React.Component {
    constructor(props) {
        super(props);
        this.generateStartingBoard = this.generateStartingBoard.bind(this);
    }

    generateStartingBoard() {
        let pieceTopSetUp = ["Ro", "Kn", "Bi", "Ki", "Qu", "Bi", "Kn", "Ro"];
        let pieceBottomSetUp = ["Ro", "Kn", "Bi", "Qu", "Ki", "Bi", "Kn", "Ro"];
    
        let totalCount = 0;
        let xCount = 1;
        let yCount = 1;
        let boardSetUp = [];
    
        pieceTopSetUp.forEach((whichPiece) => {
            boardSetUp.push(<Square key={totalCount++} initialColor="black" initialPiece={whichPiece} y={yCount} x={xCount++} />);
        });
    
        xCount = 1;
        yCount++;
    
        boardSetUp.push(<br />);
    
        for (let i = 0; i < 8; i++) {
            boardSetUp.push(<Square key={totalCount++} initialColor="black" initialPiece="Pa" y={yCount} x={xCount++} />);
        }
    
        xCount = 1;
        yCount++;
    
        boardSetUp.push(<br />);
    
        for (let i = 0; i < 4; i++) {
            for (let i = 0; i < 8; i++) {
                boardSetUp.push(<Square key={totalCount++} initialColor="green" initialPiece={null} y={yCount} x={xCount++} />);
            }
            xCount = 1;
            yCount++;
            boardSetUp.push(<br />);
        }
    
        for (let i = 0; i < 8; i++) {
            boardSetUp.push(<Square key={totalCount++} initialColor="white" initialPiece="Pa" y={yCount} x={xCount++} />);
        }
    
        xCount = 1;
        boardSetUp.push(<br />);
    
        pieceBottomSetUp.forEach((whichPiece) => {
            boardSetUp.push(<Square key={totalCount++} initialColor="white" initialPiece={whichPiece} y={yCount} x={xCount++} />);
        });
    
        return boardSetUp;
    }

    render() {
        return (<div>
                <span style={{"font-size": "30px"}}>Player 1</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{"font-size": "30px"}}>Player 2</span>
                <br />
                <TimeCounter key="player1" /><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><TimeCounter key="player2" />
                <br /><br />
                {this.generateStartingBoard()}
            </div>);
    }
}

class TimeCounter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            minute: 30,
            second: 0,
            timeUp: false
        }
        this.startCountdown = this.startCountdown.bind(this);
        this.stopCountdown = this.stopCountdown.bind(this);
    }

    countdownInterval;

    countdown() {
        if (this.minute === 0 && second === 1) {
            countdownInterval.clearInterval();
            this.setState({
                timeUp: true
            });
        } else if (this.second === 0) {
            this.setState({
                minute: minute - 1,
                second: 59
            });
        } else {
            this.setState({
                second: second - 1
            });
        }
    }

    startCountdown() {
        countdownInterval = setInterval(countdown, 1000);
    }

    stopCountdown() {
        if (countdownInterval != null) {
            countdownInterval.clearInterval();
        } else {
            console.log("Interval not active so nothing happened.");
        }
    }

    render() {
        return <h2 style={{display: "inline-block", "font-size": "30px"}}>{this.state.minute < 10 ? ("0" + this.state.minute.toString()) : this.state.minute}:{this.state.second < 10 ? ("0" + this.state.second.toString()) : this.state.second}</h2>
    }
}

class Square extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color: props.initialColor,
            piece: props.initialPiece
        }
        this.update = this.update.bind(this);
    }

    update(color, piece) {
        this.setState({
            color: color,
            piece: piece
        });
    }

    pawnCalc()

    validMoves() {
        //if 
    }

    render() {
        let squareStyle = {
            borderStyle: "solid",
            width: "50px",
            height: "50px",
            textAlign: "center",
            color: this.state.color,
            display: "inline-block"
        }

        return <span><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><h1 style={squareStyle}>{this.state.piece}</h1><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></span>;
    }
}

ReactDOM.render(<GameBoard />, document.getElementById("app"));