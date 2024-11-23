const viewLists = () => {
  const listSection = document.querySelector(".list-section");

  if (!listSection) {
    console.log("list section not found");
    return;
  }

  const list = localStorageController().getList();
  if (!list.length) {
    const notification = createNotification();
    listSection.appendChild(notification);
  }

  list.forEach((list) => {
    const listEl = createTaskEl(list);
    listSection.appendChild(listEl);
  });
};
