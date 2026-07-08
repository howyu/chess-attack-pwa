/**
 * 生成当前局面的 FEN 字符串
 */
import { PieceType, PieceColor } from '../types';

type PieceState = { type: PieceType; color: PieceColor } | null;

const PIECE_FEN: Record<string, Record<string, string>> = {
  white: { king: 'K', queen: 'Q', rook: 'R', bishop: 'B', knight: 'N', pawn: 'P' },
  black: { king: 'k', queen: 'q', rook: 'r', bishop: 'b', knight: 'n', pawn: 'p' },
};

export const generateFEN = (
  pieces: (PieceState)[][],
  currentTurn: PieceColor,
  lastPawnMove: { from: { row: number; col: number }; to: { row: number; col: number }; piece: { type: PieceType; color: PieceColor } } | null,
  canCastle: { white: { kingside: boolean; queenside: boolean }; black: { kingside: boolean; queenside: boolean } },
  halfMoveClock: number = 0,
  fullMoveNumber: number = 1
): string => {
  // Board position
  const rows: string[] = [];
  for (let r = 0; r < 8; r++) {
    let empty = 0;
    let rowStr = '';
    for (let c = 0; c < 8; c++) {
      const piece = pieces[r][c];
      if (piece) {
        if (empty > 0) {
          rowStr += empty;
          empty = 0;
        }
        rowStr += PIECE_FEN[piece.color][piece.type];
      } else {
        empty++;
      }
    }
    if (empty > 0) rowStr += empty;
    rows.push(rowStr);
  }
  const boardFen = rows.join('/');

  // Active color
  const activeColor = currentTurn === 'white' ? 'w' : 'b';

  // Castling
  let castling = '';
  if (canCastle.white.kingside) castling += 'K';
  if (canCastle.white.queenside) castling += 'Q';
  if (canCastle.black.kingside) castling += 'k';
  if (canCastle.black.queenside) castling += 'q';
  if (!castling) castling = '-';

  // En passant
  let enPassant = '-';
  if (lastPawnMove) {
    const row = (lastPawnMove.from.row + lastPawnMove.to.row) / 2;
    const col = lastPawnMove.to.col;
    const files = 'abcdefgh';
    const ranks = '87654321';
    enPassant = files[col] + ranks[Math.round(row)];
  }

  return `${boardFen} ${activeColor} ${castling} ${enPassant} ${halfMoveClock} ${fullMoveNumber}`;
};
