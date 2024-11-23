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

  const fragment = document.createDocumentFragment();
  list.forEach((list) => {
    const listEl = createTaskEl(list);
    fragment.appendChild(listEl);
  });

  listSection.appendChild(fragment);
};
