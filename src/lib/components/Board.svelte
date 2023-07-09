<script lang="ts">
  import type { Board } from "../model/board";

  let board: Board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
</script>

<div>
  {#each board as line, lineIndex}
    <ul>
      {#each line as cell, cellIndex}
        <li>{cell}</li>
      {/each}
    </ul>
  {/each}
</div>

<style>
  div {
    display: grid;
    grid-template-rows: 1fr 1fr 1fr;
    border: solid 1px blue;
    width: 250px;
    height: 250px;
  }

  ul {
    padding: 0;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    list-style: none;
    border: solid 1px red;
  }

  li {
    height: 100%;
    border: 1px solid yellow;
  }
</style>
