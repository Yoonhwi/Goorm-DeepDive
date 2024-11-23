const localStorageController = () => {
  if (!window.localStorage) return;
  const storage = window.localStorage;

  // key : "list" value : []에 todo-list를 저장.

  const getList = () => {
    try {
      return JSON.parse(storage.getItem("list")) || [];
    } catch (e) {
      console.log("Failed to get list from local storage", e);
      return [];
    }
  };

  /**
   *
   * @param {Array} list
   */
  const setList = (list) => {
    try {
      storage.setItem("list", JSON.stringify(list));
    } catch (e) {
      console.log("Failed to set list from local storage", e);
    }
  };

  return { getList, setList };
};
