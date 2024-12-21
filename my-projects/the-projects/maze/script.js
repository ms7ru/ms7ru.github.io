let gridWidth;
        let gridHeight;
        let start;
        let end;
        let player;
        let maze;
        let startTime;

        async function promptGridSize() {
            await new Promise(resolve => document.onclick = resolve);
            gridWidth = parseInt(prompt("Enter the width of the grid (e.g., 16):", "16"));
            gridHeight = parseInt(prompt("Enter the height of the grid (e.g., 9):", "9"));
            if (isNaN(gridWidth) || isNaN(gridHeight) || gridWidth < 3 || gridHeight < 3) {
                alert("Invalid grid size. Please enter valid numbers greater than 2.");
                promptGridSize();
            } else {
                start = {x: 1, y: 1};
                end = {x: gridWidth - 2, y: gridHeight - 2};
                player = {...start};
                generateValidMaze();
            }
        }

        function generateMaze(width, height) {
            const maze = Array.from({ length: height }, () => Array(width).fill(1));
            const stack = [{ x: 1, y: 1 }];
            maze[1][1] = 0;

            while (stack.length) {
                const { x, y } = stack.pop();
                const directions = shuffle([
                    { x: 0, y: -2 },
                    { x: 0, y: 2 },
                    { x: -2, y: 0 },
                    { x: 2, y: 0 }
                ]);

                for (const { x: dx, y: dy } of directions) {
                    const nx = x + dx;
                    const ny = y + dy;

                    if (nx > 0 && ny > 0 && nx < width - 1 && ny < height - 1 && maze[ny][nx] === 1) {
                        maze[ny][nx] = 0;
                        maze[y + dy / 2][x + dx / 2] = 0;
                        stack.push({ x: nx, y: ny });
                    }
                }
            }

            // Ensure the end block is accessible
            if (maze[end.y][end.x] === 1) {
                maze[end.y][end.x] = 0;
                maze[end.y - 1][end.x] = 0;
                maze[end.y][end.x - 1] = 0;
            }

            return maze;
        }

        function isAccessible(maze, start, end) {
            const visited = Array.from({ length: maze.length }, () => Array(maze[0].length).fill(false));
            const queue = [start];

            while (queue.length > 0) {
                const { x, y } = queue.shift();
                if (x === end.x && y === end.y) {
                    return true;
                }
                visited[y][x] = true;
                const directions = [
                    { x: 0, y: -1 },
                    { x: 0, y: 1 },
                    { x: -1, y: 0 },
                    { x: 1, y: 0 }
                ];

                for (const { x: dx, y: dy } of directions) {
                    const nx = x + dx;
                    const ny = y + dy;
                    if (nx >= 0 && ny >= 0 && nx < maze[0].length && ny < maze.length && maze[ny][nx] === 0 && !visited[ny][nx]) {
                        queue.push({ x: nx, y: ny });
                    }
                }
            }

            return false;
        }

        function generateValidMaze() {
            do {
                maze = generateMaze(gridWidth, gridHeight);
            } while (!isAccessible(maze, start, end));
            createMaze();
        }

        function shuffle(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }

        function createMaze() {
            const mazeContainer = document.getElementById('mazeContainer');
            mazeContainer.style.gridTemplateColumns = `repeat(${gridWidth}, 30px)`;
            mazeContainer.style.gridTemplateRows = `repeat(${gridHeight}, 30px)`;
            mazeContainer.innerHTML = '';
            for (let y = 0; y < maze.length; y++) {
                for (let x = 0; x < maze[y].length; x++) {
                    const cell = document.createElement('div');
                    cell.className = 'cell';
                    if (maze[y][x] === 1) {
                        cell.classList.add('wall');
                    } else if (x === start.x && y === start.y) {
                        cell.classList.add('start');
                    } else if (x === end.x && y === end.y) {
                        cell.classList.add('end');
                    } 
                    if (x === player.x && y === player.y) {
                        cell.classList.add('player');
                    }
                    mazeContainer.appendChild(cell);
                }
            }
        }

        function movePlayer(x, y) {
            const newX = player.x + x;
            const newY = player.y + y;
            if (maze[newY][newX] !== 1) {
                if (!startTime) {
                    startTime = new Date();
                }
                player.x = newX;
                player.y = newY;
                createMaze();
                if (player.x === end.x && player.y === end.y) {
                    const endTime = new Date();
                    const timeTaken = ((endTime - startTime) / 1000).toFixed(2);
                    setTimeout(() => {
                        alert(`You win! Time taken: ${timeTaken} seconds`);
                        resetGame();
                    }, 10);
                }
            }
        }

        function resetGame() {
            player = {...start};
            generateValidMaze();
            startTime = null;
        }

        window.addEventListener('keydown', (e) => {
            switch (e.key) {
                case 'ArrowUp':
                    movePlayer(0, -1);
                    break;
                case 'ArrowDown':
                    movePlayer(0, 1);
                    break;
                case 'ArrowLeft':
                    movePlayer(-1, 0);
                    break;
                case 'ArrowRight':
                    movePlayer(1, 0);
                    break;
            }
        });

        promptGridSize();
