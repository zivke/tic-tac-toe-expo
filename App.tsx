import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View, Alert, GestureResponderEvent } from 'react-native';
import { useState } from "react";

export default function App() {
  const [ state, setState ] = useState(initialState);

  function handleRestartClick() {
    Alert.alert('Restart Game', 'Are you sure you want to restart the game?', [
      {
        text: 'Cancel',
      },
      { text: 'OK', onPress: () => setState(initialState) },
    ]);
  }

  function handleSquareClick(i: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 ) {
    if (state.clicks === 9 || state.squares[i] !== '' || state.winner) {
      return;
    }

    const squares = state.squares.slice();
    squares[i] = state.xIsNext ? 'X' : 'O';
    const winner = calculateWinner(squares);
    const clicks = state.clicks + 1;

    setState(
        {
            squares: squares,
            xIsNext: !state.xIsNext,
            winner: winner,
            clicks: clicks,
        }
    );
  }

  let status: string;
  let dynamicStatusStyle = Object.assign({}, styles.status);
  if (state.winner !== '') {
    status = 'WINNER: ' + state.winner;
    dynamicStatusStyle.backgroundColor = 'green';
  } else {
    if (state.clicks === 9) {
      status = 'IT\'S A TIE!';
      dynamicStatusStyle.backgroundColor = '#04f';
    } else {
      status = 'NEXT PLAYER: ' + (state.xIsNext ? 'X' : 'O');
      dynamicStatusStyle.backgroundColor = 'orange';
    }
  }

  return (
    <View style={styles.container}>
        <View style={dynamicStatusStyle}>
          <Text style={styles.statusLabel}>{status}</Text>
        </View>
        <View style={styles.squareRow}>
          <Square value={state.squares[0]} onPress={() => handleSquareClick(0)} />
          <Square value={state.squares[1]} onPress={() => handleSquareClick(1)} />
          <Square value={state.squares[2]} onPress={() => handleSquareClick(2)} />
        </View>
        <View style={styles.squareRow}>
          <Square value={state.squares[3]} onPress={() => handleSquareClick(3)} />
          <Square value={state.squares[4]} onPress={() => handleSquareClick(4)} />
          <Square value={state.squares[5]} onPress={() => handleSquareClick(5)} />
        </View>
        <View style={styles.squareRow}>
          <Square value={state.squares[6]} onPress={() => handleSquareClick(6)} />
          <Square value={state.squares[7]} onPress={() => handleSquareClick(7)} />
          <Square value={state.squares[8]} onPress={() => handleSquareClick(8)} />
        </View>
        <Pressable style={styles.restartButton} onPress={() => handleRestartClick()}>
          <Text style={styles.restartLabel}>RESTART GAME</Text>
        </Pressable>
        <StatusBar hidden={true} />
      </View>
  );
}

const initialState = {
  squares: Array(9).fill(''),
  xIsNext: true,
  winner: '',
  clicks: 0,
};

function Square(props: { onPress: ((event: GestureResponderEvent) => void); value: string; }) {
  return (
  <Pressable
      onPress={props.onPress}
      style={styles.button}
  >
    <Text style={styles.buttonLabel}>{props.value}</Text>
  </Pressable>
  );
}

function calculateWinner(squares: string[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return '';
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  status: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  statusLabel: {
    color: '#000',
    fontSize: 30,
    fontWeight: 'bold',
  },
  squareRow: {
    flex: 3,
    flexDirection: 'row',
  },
  button: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eee',
    borderColor: 'black',
    borderWidth: 3,
  },
  buttonLabel: {
    color: '#000',
    fontSize: 70,
  },
  restartButton: {
    flex: 1,
    backgroundColor: 'red',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  restartLabel: {
    color: 'black',
    fontSize: 40,
    fontWeight: 'bold',
  },
});
