// 本地持久性存储
let local = {
  /**
   * 本地持久性存储
   * @param {String} table 表名
   * @param {Object|String} settings 给String是取值 ，给对象key,value为赋值，给remove,key为删除值
   * @param {localStorage} storage 默认localStorage
   * @returns
   */
  data: function (table, settings, storage) {
    table = table || "localData";
    storage = storage || localStorage;

    if (!window.JSON || !window.JSON.parse) return;

    // 如果settings为null，则删除表
    if (settings === null) {
      return delete storage[table];
    }

    settings = typeof settings === "object" ? settings : { key: settings };

    var data;
    try {
      data = JSON.parse(storage[table]);
    } catch (e) {
      data = {};
    }

    if ("value" in settings) data[settings.key] = settings.value;
    if (settings.remove) delete data[settings.key];
    storage[table] = JSON.stringify(data);

    return settings.key ? data[settings.key] : data;
  },
};

// 本地会话性存储
//   Layui.prototype.sessionData = function (table, settings) {
//       return this.data(table, settings, sessionStorage);
//   }
export default local;

export const localKeys = {
  checkCode: "CHECKVERIFYCODE",
};
