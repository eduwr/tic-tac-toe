<script lang="ts">
  import Board from "./lib/components/Board.svelte";
  import { createBoard } from "./lib/providers/board.provider";

  let board = createBoard();
</script>

<main>
  <Board {board} />
</main>

<style>
</style>
