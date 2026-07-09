# Chess Attack

> **国际象棋势力范围可视化训练板** —— 在棋盘上实时显示双方势力范围，让看不见的局面变成可见的视觉直觉。

This is a visualization of attacked chess squares using a fully functional chess game web application generated entirely through Large Language Model (LLM) interactions.

## 📄 开源引用 / Attribution

本项目基于 [razrinn/chess-attack](https://github.com/razrinn/chess-attack) **二次开发**，原项目采用 **MIT License**。

- 原项目：`razrinn/chess-attack` — <https://github.com/razrinn/chess-attack>
- 原版权声明：Copyright (c) 2024 Chess Attack Contributors（MIT）
- 本分支新增：双方势力范围三色覆盖（蓝=白控 / 红=黑控 / 紫=争夺）、AI 局面点评、PWA 离线支持等

根据 MIT 协议，本仓库完整保留原项目的许可证与版权声明（见 [LICENSE.md](./LICENSE.md)）。

## 🤖 LLM Attribution

This entire project, including all source code, components, and documentation, was generated through interactions with Anthropic's Claude Sonnet 3.5 using the Cline VSCode extension, and also Cursor Editor. The implementation includes sophisticated features like piece movement validation, square domination calculation, and drag-and-drop functionality, showcasing the potential of AI-assisted software development through direct IDE integration.

## ♛ Assets

- Piece images: https://commons.wikimedia.org/wiki/Category:SVG_chess_pieces
- Game sound: https://www.chess.com/forum/view/general/chessboard-sound-files

## ✨ Features

- **Complete Chess Rules Implementation**

  - Valid move highlighting
  - Piece movement validation
  - Turn-based gameplay
  - Legal move validation
  - Checkmate detection
  - En passant moves
  - Castling moves
  - Pawn promotion
  - Check detection

- **Advanced Game Analysis**

  - Material advantage calculation
  - Square domination analysis
  - Visual domination indicators on board
  - Piece-specific attack value calculation
  - Weighted domination scoring

- **Interactive UI Elements**

  - Drag and drop piece movement
  - Click-to-move alternative
  - Move history with PGN notation
  - Game status panel with advantage indicators
  - Board coordinates (algebraic notation)
  - Board flipping for different perspectives
  - Sound effects for moves, captures, and special events
  - Keyboard controls for move navigation
  - Toggleable attack indicators

- **Visual Feedback**
  - Highlighted legal moves
  - Square domination overlay
  - Color-coded advantage indicators
  - Responsive design for various screen sizes
  - Victory celebration effects
  - Piece attack tooltips
  - Material advantage display

## 🛠 Technical Stack

- **Frontend Framework**: React with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **Development Tools**: ESLint, TypeScript ESLint
- **Audio**: Web Audio API
- **Animation**: Canvas Confetti

## 🚀 Getting Started

1. Clone the repository:

```bash
git clone [repository-url]
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
bun install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
# or
bun dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🎮 How to Play

1. **Moving Pieces**

   - Drag and drop pieces to valid squares
   - Or click the piece and then click the destination square

2. **Game Analysis**

   - View material advantage in the status panel
   - Monitor square control through domination indicators
   - Review move history in the sidebar

3. **Visual Indicators**
   - Blue overlay: White-controlled squares
   - Red overlay: Black-controlled squares
   - Purple overlay: Contested squares

## 🏗 Project Structure

```
src/
├── components/         # React components
│   ├── Board.tsx      # Main chess board
│   ├── GameStatus.tsx # Game statistics
│   ├── Piece.tsx     # Chess piece
│   ├── Square.tsx    # Board square
│   └── ...
├── hooks/             # Custom React hooks
│   ├── useChessBoard.ts    # Game logic
│   ├── useDomination.ts    # Square control
│   └── useDragAndDrop.ts   # Drag-n-drop
├── ...
```

## 🎯 Contributing

We welcome contributions! Here's how you can help:

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

For detailed guidelines, please see [CONTRIBUTING.md](CONTRIBUTING.md)

## 🎯 Future Enhancements

- ~~Legal move check~~
- ~~Checkmate detection~~
- ~~Stalemate detection~~
- ~~En passant moves~~
- ~~Castling moves~~
- ~~Pawn promotion~~
- Game export/import functionality

## 📝 License

This project is open source and available under the MIT License.
