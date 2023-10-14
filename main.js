class ChessBoard {
    constructor() {
        this.board = Array.from({ length: 8 }, () => Array(8).fill(0));
    }

    isValidMove(x, y) {
        return x >= 0 && y >= 0;
    }
}

class Knight {
    constructor(position) {
        this.position = position;
    }

    possibleMoves(ChessBoard) {
        const { position } = this;
        const [x, y] = position;
        const moves = [
            [x + 1, y + 2], [x + 2, y + 1],
            [x + 2, y - 1], [x + 1, y - 2],
            [x - 1, y - 2], [x - 2, y - 1],
            [x - 2, y + 1], [x - 1, y + 2]
        ];

        return moves.filter(([newX, newY]) => ChessBoard.isValidMove(newX, newY));
    }
}

// Example usage:



class Graph {
    constructor() {
      this.nodes = {};
    }
  
    addNode(value) {
      this.nodes[value] = [];
    }
  
    addEdge(node1, node2) {
      this.nodes[node1].push(node2);
      this.nodes[node2].push(node1);
    }
  
    bfs(start, end) {
      const visited = {};
      const queue = [];
      const path = {};
  
      queue.push(start);
      visited[start] = true;
  
      while (queue.length > 0) {
        const currentNode = queue.shift();
  
        if (currentNode === end) {
          // Construir y retornar el camino si se encuentra el nodo objetivo
          return this.constructPath(start, end, path);
        }
        for (const neighbor of this.nodes[currentNode]) {
          if (!visited[neighbor]) {
            queue.push(neighbor);
            visited[neighbor] = true;
            path[neighbor] = currentNode; // Guardar el nodo actual como el "padre" del vecino
          }
        }
      }
  
      return null; // Retorna null si no se encuentra el nodo objetivo
    }
  
    constructPath(start, end, path) {
      const result = [end];
      let currentNode = end;
  
      while (currentNode !== start) {
        currentNode = path[currentNode];
        result.unshift(currentNode);
      }
  
      return result;
    }
  }
  
  // Ejemplo de uso
 
  
//   myGraph.addNode('A');
//   myGraph.addNode('B');
//   myGraph.addNode('C');
//   myGraph.addNode('D');
//   myGraph.addNode('E');
  
//   myGraph.addEdge('A', 'B');
//   myGraph.addEdge('B', 'C');
//   myGraph.addEdge('B', 'D');
//   myGraph.addEdge('D', 'E');
//   myGraph.addEdge('C', 'E');
  

  

  function knightMoves (start, end) {
    const gameBoard = new ChessBoard();
    const knight = new Knight([1, 2]);

    function removeDuplicates(array) {
        return [...new Set(array)];
      }
      
      
    const moves = knight.possibleMoves(gameBoard);
    const myGraph = new Graph();
    const maxNumber = Math.max(...moves.flat());

    for (let i = 0; i <= maxNumber; i++) {
        myGraph.addNode(i);
    }
    for (let j = 0; j < moves.length; j++) {
        let a = moves[j][0];
        let b = moves[j][1];
        myGraph.addEdge(a,b);
    }
    // for (const key in myGraph.nodes) {
    //  myGraph.nodes[key] = removeDuplicates(myGraph.nodes[key]);
    // }

  
    const path = myGraph.bfs(start,end);
  
    if (path) {
        console.log(`El camino más corto desde ${start} hasta ${end}: ${path.join(' -> ')}`);
    } else {
        console.log(`No hay camino desde ${start} hasta ${end}.`);
    }
  }

  knightMoves([3,3], [3,3]);

