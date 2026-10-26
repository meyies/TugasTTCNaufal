import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';

export default function App() {
  /**
   * 1. STATE MANAGEMENT (Manajemen State)
   * - 'board': Array berisi 9 elemen untuk merepresentasikan kotak (null, 'X', atau 'O').
   * - 'xIsNext': Boolean untuk menentukan giliran pemain (true untuk 'X', false untuk 'O').
   */
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  /**
   * 2. LOGIKA PERMAINAN (Game Logic)
   * Fungsi untuk mendeteksi apakah ada pemain yang berhasil membentuk 3 simbol sejajar.
   */
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Baris horizontal
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Kolom vertikal
      [0, 4, 8], [2, 4, 6],            // Diagonal
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]; // Mengembalikan 'X' atau 'O' sebagai pemenang
      }
    }
    return null;
  };

  const winner = calculateWinner(board);
  const isBoardFull = board.every((square) => square !== null);

  /**
   * 3. EVENT HANDLER (Penanganan Aksi Pengguna)
   * Dijalankan saat kotak ditekan oleh pengguna.
   */
  const handlePress = (index) => {
    // Jika kotak sudah terisi atau sudah ada pemenang, abaikan klik (Early Return)
    if (board[index] || winner) return;

    /**
     * IMMUTABILITY (Prinsip Utama React)
     * Selalu buat salinan (copy) baru menggunakan spread operator [...].
     */
    const newBoard = [...board];
    newBoard[index] = xIsNext ? 'X' : 'O';

    // Perbarui state untuk memicu re-render UI
    setBoard(newBoard);
    setXIsNext(!xIsNext); // Ubah giliran ke pemain berikutnya
  };

  // Fungsi untuk mereset permainan ke kondisi awal
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  /**
   * 4. KOMPONEN KOTAK (Reusable Render Function)
   * Membantu menghindari pengulangan kode JSX untuk 9 kotak papan.
   */
  const renderSquare = (index) => {
    return (
      <TouchableOpacity
        style={styles.square}
        onPress={() => handlePress(index)}
        activeOpacity={0.7}
      >
        <Text style={[
          styles.squareText,
          board[index] === 'X' ? styles.textX : styles.textO
        ]}>
          {board[index]}
        </Text>
      </TouchableOpacity>
    );
  };

  // Menentukan teks status permainan secara dinamis
  let status;
  if (winner) {
    status = `Pemenang: ${winner}!`;
  } else if (isBoardFull) {
    status = "Permainan Seri (Draw)!";
  } else {
    status = `Giliran Pemain: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Judul Aplikasi */}
      <Text style={styles.title}>Tic Tac Toe</Text>
      
      {/* Menampilkan Status Game */}
      <Text style={styles.status}>{status}</Text>

      {/* Papan Permainan (Grid 3x3 menggunakan Flexbox) */}
      <View style={styles.board}>
        <View style={styles.row}>
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </View>
        <View style={styles.row}>
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </View>
        <View style={styles.row}>
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </View>
      </View>

      {/* Tombol Reset Permainan */}
      <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
        <Text style={styles.resetButtonText}>Mulai Ulang</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

/**
 * 5. STYLING (Gaya Tampilan)
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  status: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: '600',
    color: '#555',
  },
  board: {
    borderWidth: 4,
    borderColor: '#333',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row', // Mengatur kotak berderet secara horizontal
  },
  square: {
    width: 90,
    height: 90,
    borderWidth: 2,
    borderColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  squareText: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  textX: {
    color: '#e74c3c', // Warna merah untuk pemain X
  },
  textO: {
    color: '#3498db', // Warna biru untuk pemain O
  },
  resetButton: {
    marginTop: 30,
    backgroundColor: '#2ecc71',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});