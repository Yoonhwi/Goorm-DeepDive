export class Cell {
  value = "";
  isHeader = false;
  row = null;
  col = null;

  constructor(row, col) {
    this.row = row;
    this.col = col;
  }

  render = () => {
    const cellEl = document.createElement("input");
    cellEl.textContent = this.value;
    cellEl.classList.add("cell");
    cellEl.id = `cell-${this.row}-${this.col}`;

    return cellEl;
  };
}

export class HeaderCell {
  value = "";
  isHeader = true;
  row = null;
  col = null;

  constructor(value, row, col) {
    this.value = value;
    this.row = row;
    this.col = col;
  }

  render = () => {
    const cellEl = document.createElement("div");
    cellEl.textContent = this.value;
    cellEl.classList.add("cell-header");

    cellEl.id = `cell-${this.row}-${this.col}`;

    return cellEl;
  };
}
