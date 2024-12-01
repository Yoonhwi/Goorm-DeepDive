import { Cell, HeaderCell } from "./cell.js";

export class SpreadSheet {
  rows = null;
  cols = null;
  cells = [];

  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.header = document.querySelector(".ss-header");
    this.downloadButton = document.querySelector(".download");
    this.spreadSheetBody = document.querySelector(".ss-body");
  }

  init = () => {
    if (!this.header || !this.downloadButton || !this.spreadSheetBody) {
      throw new Error("Empty Element Error");
    }

    this.render();
  };

  setCurrentCell = (row, col) => {
    const avtiveCells = document.querySelectorAll(".active");
    avtiveCells.forEach((cell) => {
      cell.classList.remove("active");
    });

    document.getElementById(`cell-${row}-0`).classList.add("active");
    document.getElementById(`cell-0-${col}`).classList.add("active");

    this.header.textContent = `Cell : ${String.fromCharCode(64 + col)}${row}`;
  };

  getCellsUrl = () => {
    const filteredCells = this.cells.filter((cell) => !cell.isHeader);
    let csv = "";
    let row = [];

    for (let i = 0; i < filteredCells.length; i++) {
      row.push(filteredCells[i].value);

      if ((i + 1) % 9 === 0 || i === filteredCells.length - 1) {
        csv += row.join(",") + "\r\n";
        row = [];
      }
    }

    const blob = new Blob([csv]);
    const url = URL.createObjectURL(blob);

    return url;
  };

  render = () => {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (i === 0 || j === 0) {
          const value =
            i === 0 && j === 0 ? "" : i === 0 ? String.fromCharCode(64 + j) : i;

          const cell = new HeaderCell(value, i, j);
          this.cells.push(cell);

          const cellEl = cell.render();
          fragment.appendChild(cellEl);
          continue;
        } else {
          const cell = new Cell();
          this.cells.push(cell);

          const cellEl = cell.render(i, j);
          cellEl.addEventListener("input", (e) => {
            cell.value = e.target.value;
          });
          cellEl.addEventListener("click", () => {
            this.setCurrentCell(i, j);
          });

          fragment.appendChild(cellEl);
          continue;
        }
      }

      this.spreadSheetBody.appendChild(fragment);
    }

    this.downloadButton.addEventListener("click", () => {
      const url = this.getCellsUrl();
      const a = document.createElement("a");
      a.href = url;
      a.download = "spreadsheet.csv";
      a.click();
    });
  };
}
