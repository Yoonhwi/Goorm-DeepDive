const taskContoller = () => {
  const addBtn = document.querySelector(".add-task-btn");
  const listSection = document.querySelector(".list-section");
  const taskInput = document.querySelector(".add-task-input");

  if (!addBtn || !listSection || !taskInput) {
    console.log("Failed get Element!");
  }

  /**
   * 업무 수정후 스토리지를 업데이트합니다.
   * @param {Element} inputEl
   * @param {object} task
   */
  const completeModification = (inputEl, task) => {
    const list = localStorageController().getList();
    const updatedList = list.map((v) => {
      if (v.id === task.id) {
        v.content = inputEl.value;
      }
      return v;
    });
    localStorageController().setList(updatedList);
    inputEl.setAttribute("disabled", "");
  };

  /**
   * 업무를 등록합니다.
   */
  const addTask = () => {
    if (!taskInput.value.trim()) {
      return;
    }

    const task = {
      id: new Date().getTime(),
      content: taskInput.value,
      isDone: false,
    };

    const taskEl = createTaskEl({
      isDone: false,
      content: taskInput.value,
    });

    listSection.prepend(taskEl);

    const list = localStorageController().getList();
    list.unshift(task);
    localStorageController().setList(list);

    taskInput.value = "";
  };

  addBtn.addEventListener("click", addTask);

  /**
   * 체크박스를 토글합니다.
   * @param {Element} taskEl
   * @param {object} task
   * @param {boolean} checked
   */
  const toggleCheckBox = (taskEl, task, checked) => {
    if (checked) {
      taskEl.classList.add("checked");
    } else {
      taskEl.classList.remove("checked");
    }

    const list = localStorageController().getList();
    const updatedList = list.map((v) => {
      if (v.id === task.id) {
        v.isDone = checked;
      }
      return v;
    });

    localStorageController().setList(updatedList);
  };

  /**
   * 업무를 삭제합니다.
   * @param {Element} taskEl
   * @param {object} task
   */
  const deleteTask = (taskEl, task) => {
    taskEl.remove();
    const list = localStorageController().getList();
    const updatedList = list.filter((v) => v.id !== task.id);

    if (!updatedList.length) {
      const notification = createNotification();
      listSection.appendChild(notification);
    }

    localStorageController().setList(updatedList);
  };

  /**
   * 업무를 수정합니다.
   * @param {Element} parentEl
   * @param {object} task
   */
  const modifyTask = (parentEl, task) => {
    const modifyBtn = parentEl.querySelector(".modify-btn");
    const inputEl = parentEl.querySelector(".task-input");

    if (!inputEl || !modifyBtn) {
      console.log("Failed get Element!");
      return;
    }

    inputEl.removeAttribute("disabled");
    inputEl.focus();

    const valueLength = inputEl.value.length;
    inputEl.setSelectionRange(valueLength, valueLength);

    const handleBlur = () => {
      completeModification(inputEl, task);
    };

    inputEl.addEventListener("blur", handleBlur);

    const handleModifyClick = () => {
      inputEl.removeEventListener("blur", handleBlur);
      completeModification(inputEl, task);
      modifyBtn.removeEventListener("click", handleModifyClick);
      modifyBtn.addEventListener("click", () => {
        modifyTask(parentEl, task);
      });
    };

    modifyBtn.addEventListener("click", handleModifyClick);
  };

  return { addTask, toggleCheckBox, deleteTask, modifyTask };
};
