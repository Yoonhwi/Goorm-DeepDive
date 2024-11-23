/**
 *
 * @param {string} name
 * @param {string} w
 * @param {string} h
 * @param {string} viewBox
 * @param {string} fill
 * @param {string} d
 * @returns {Element}
 */
const createSvgBtnEl = (name, w, h, viewBox, fill, d) => {
  const svgNameSpage = "http://www.w3.org/2000/svg";

  const btn = document.createElement("button");
  btn.classList.add(name);

  const svg = document.createElementNS(svgNameSpage, "svg");
  svg.setAttribute("width", w);
  svg.setAttribute("height", h);
  svg.setAttribute("viewBox", viewBox);
  svg.setAttribute("fill", fill);
  svg.setAttribute("xmlns", svgNameSpage);

  const path = document.createElementNS(svgNameSpage, "path");
  path.setAttribute("fill", fill);
  path.setAttribute("d", d);

  svg.appendChild(path);
  btn.appendChild(svg);

  return btn;
};

/**
 *
 * @param {Element} parentEl
 */
const createModifyBtn = (parentEl, task) => {
  const modifyBtn = createSvgBtnEl(
    "modify-btn",
    "18px",
    "18px",
    "0 0 24 26",
    "#333",
    "M19.186 2.09c.521.25 1.136.612 1.625 1.101.49.49.852 1.104 1.1 1.625.313.654.11 1.408-.401 1.92l-7.214 7.213c-.31.31-.688.541-1.105.675l-4.222 1.353a.75.75 0 0 1-.943-.944l1.353-4.221a2.75 2.75 0 0 1 .674-1.105l7.214-7.214c.512-.512 1.266-.714 1.92-.402zm.211 2.516a3.608 3.608 0 0 0-.828-.586l-6.994 6.994a1.002 1.002 0 0 0-.178.241L9.9 14.102l2.846-1.496c.09-.047.171-.107.242-.178l6.994-6.994a3.61 3.61 0 0 0-.586-.828zM4.999 5.5A.5.5 0 0 1 5.47 5l5.53.005a1 1 0 0 0 0-2L5.5 3A2.5 2.5 0 0 0 3 5.5v12.577c0 .76.082 1.185.319 1.627.224.419.558.754.977.978.442.236.866.318 1.627.318h12.154c.76 0 1.185-.082 1.627-.318.42-.224.754-.559.978-.978.236-.442.318-.866.318-1.627V13a1 1 0 1 0-2 0v5.077c0 .459-.021.571-.082.684a.364.364 0 0 1-.157.157c-.113.06-.225.082-.684.082H5.923c-.459 0-.57-.022-.684-.082a.363.363 0 0 1-.157-.157c-.06-.113-.082-.225-.082-.684V5.5z"
  );

  modifyBtn.addEventListener("click", () => {
    taskContoller().modifyTask(parentEl, task);
  });

  parentEl.appendChild(modifyBtn);
};

/**
 *
 * @param {Element} parentEl
 */
const createDeleteBtn = (parentEl, task) => {
  const deleteBtn = createSvgBtnEl(
    "delete-btn",
    "18px",
    "18px",
    "-3 -2 24 24",
    "#494c4e",
    "M13 18H5a2 2 0 0 1-2-2V7a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v9a2 2 0 0 1-2 2zm3-15a1 1 0 0 1-1 1H3a1 1 0 0 1 0-2h3V1a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1h3a1 1 0 0 1 1 1z"
  );

  deleteBtn.addEventListener("click", () => {
    taskContoller().deleteTask(parentEl, task);
  });

  parentEl.appendChild(deleteBtn);
};

/**
 *
 * @param {Element} parentEl
 * @param {object} task
 */
const createCheckBox = (parentEl, task) => {
  const isDone = task.isDone;
  const checkBox = document.createElement("input");
  checkBox.checked = isDone;

  checkBox.addEventListener("change", (e) => {
    const target = e.target.checked;
    taskContoller().toggleCheckBox(parentEl, task, target);
  });

  checkBox.setAttribute("type", "checkbox");
  checkBox.classList.add("task-checkbox");

  parentEl.appendChild(checkBox);
};

/**
 *
 * @param {Element} parentEl
 * @param {string} content
 */
const createInputEl = (parentEl, content) => {
  const input = document.createElement("input");
  input.classList.add("task-input");
  input.setAttribute("type", "text");
  input.setAttribute("value", content);
  input.setAttribute("disabled", "");

  parentEl.appendChild(input);
};

/**
 *
 * @param {object} task
 * @returns {Element}
 */
const createTaskEl = (task) => {
  const taskEl = document.createElement("div");
  taskEl.classList.add("task");

  createCheckBox(taskEl, task);
  createInputEl(taskEl, task.content);
  createModifyBtn(taskEl, task);
  createDeleteBtn(taskEl, task);

  return taskEl;
};

const createNotification = () => {
  const notification = document.createElement("div");
  notification.classList.add("notification");
  notification.textContent = "Add a new task!";

  return notification;
};
