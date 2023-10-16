function Graph() {
    return {
      chessBoard: new Map(),
  
      addVertices(size = 8 /* Standard chess board size is 8 */) {
        // Create a square board
        for (let i = 0; i < size; i += 1) {
          for (let j = 0; j < size; j += 1) {
            // The key needs to be set as a string  
            // or else the get() in addEdges() does not work
            this.chessBoard.set(`${[i, j]}`, []);
          }
        }
      },
  
      // Connect all board squares based on knight's move pattern 
      addEdges(board = this.chessBoard) {
        for (let [ pos ] of board) {
          const posArr = pos.split(',');
          const x = parseInt(posArr[0]);
          const y = parseInt(posArr[1]);
          // Change direction based on clock position
          const direction = {
            1: [ x + 1, y + 2 ],
            2: [ x + 2, y + 1 ],
            4: [ x + 2, y - 1 ],
            5: [ x + 1, y - 2 ],
            7: [ x - 1, y - 2 ],
            8: [ x - 2, y - 1 ],
            10: [ x - 2, y + 1 ],
            11: [ x - 1, y + 2 ],
          }
          for (let clock in direction) {
            const move = direction[clock].toString();
            // board.has(move) means if the movement is valid or not // 
            // !board.get(pos).includes(move) if exists don't add duplicates // 

            if (board.has(move) && !board.get(pos).includes(move)) {
              this.chessBoard.get(pos).push(move);
            }
          }
        }
      },
      //BFS//
      knightMoves(start, end) {
        const paths = [];
        const visited = new Set();
        const queue = [];
        queue.push([start, [start]]);

        while (queue.length > 0) {
          let [current, path] = queue.shift();
          visited.add(current);
          if (current === end) {
            paths.push(path);
          }
          const neighbors = this.chessBoard.get(current);
          // neighbors contains the edges, the path // 
          for (let pos of neighbors) {
            if (!visited.has(pos)) {
              queue.push([pos, [...path, pos]]);
              // [...path, pos] update the road that the knight is taking // 
            }
          }
        }
        const fastest = fastPath(paths);
        console.log(`Fastest Routes from ${start} to ${end}`)
        console.log("Your path", fastest);
      },
    }
  }

  function fastPath(arrays) {
    if (arrays.length === 0) return null;

    // Utiliza reduce para encontrar el array con la minor longitud
    const fastestRoad = arrays.reduce((minor, actual) => {
        return actual.length < minor.length ? actual : minor;
    }, arrays[0]);

    return fastestRoad;
}
  
  const g = new Graph();
  g.addVertices();
  g.addEdges();
  g.knightMoves('0,0', '4,3');
  g.knightMoves('3,1', '2,2');
  g.knightMoves('7,7', '1,6');