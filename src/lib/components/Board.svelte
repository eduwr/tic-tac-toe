<script lang="ts">
  import type { Player } from "../../model/player";
  import {
    createBoard,
    pickCell,
    hasWinner,
    draw,
  } from "../providers/board.provider";

  let board = createBoard();
  let player: Player = 1;

  function onClickBtn({ line, column }: { line: number; column: number }) {
    if (line > 2 || line < 0 || column > 2 || column < 0)
      throw new Error("Column or Line out of range");

    board = pickCell({
      board,
      column: column as 0 | 1 | 2,
      line: line as 0 | 1 | 2,
      player,
    });

    const winner = hasWinner(board);

    if (winner) {
      alert(`Player ${player} won`);
      board = createBoard();
    }

    player = player === 1 ? 2 : 1;

    if (draw(board)) {
      alert("Draw!");
      board = createBoard();
      player = 1;
    }
  }
</script>

<div>
  {#each board as line, lineIndex}
    <ul>
      {#each line as cell, column}
        <li>
          <button
            type="button"
            on:click={() =>
              onClickBtn({
                column,
                line: lineIndex,
              })}
          >
            {cell === 1 ? "X" : cell === 2 ? "O" : ""}
          </button>
        </li>
      {/each}
    </ul>
  {/each}
</div>

<style>
  div {
    height: 500px;
    width: 500px;
    display: grid;
    grid-template-rows: 1fr 1fr 1fr;
    gap: 1rem;
  }

  ul {
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    list-style: none;
    gap: 1rem;
    /* border: solid 1px red; */
  }

  li {
    height: 100%;
  }

  li button {
    background-color: transparent;
    min-height: 100%;
    min-width: 100%;
    background-color: lightslategray;
    font-size: 2rem;
  }
</style>
