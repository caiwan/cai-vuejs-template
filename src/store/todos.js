var filters = {
  all: function (todos) {
    return todos;
  },
  active: function (todos) {
    return todos.filter(function (todo) {
      return !todo.completed;
    });
  },
  completed: function (todos) {
    return todos.filter(function (todo) {
      return todo.completed;
    });
  }
};

export default {
  namespaced: true,

  state: {
    todos: [],
    uid: 0,
    editingTodo: null,
    beforeEditCache: "",
    visibility: "all"
  },

  getters: {
    filtered: state => {
      return filters[state.visibility](state.todos);
    },
    remaining: state => {
      return filters.active(state.todos).length;
    },
  },

  mutations: {
    // clear: (state) => state.todos = [],

    put: (state, todo) => state.todos.push(todo),

    // putAll: (state, todos) => state.todos = state.todos.concat(todos),

    edit: (state, item) => {
      const index = state.todos.findIndex((elem) => {
        return elem.id === item.id;
      });
      // we get back a new object, and we need to get setters to be invoked
      var storedItem = state.todos[index];
      for (var key in item) {
        if (item.hasOwnProperty(key)) {
          storedItem[key] = item[key];
        }
      }
    },

    rm: (state, todo) => state.todos.splice(state.todos.indexOf(todo), 1),

    show(state, filterName) {
      if (filters[filterName]) {
        state.visibility = filterName;
      }
    }
  },

  actions: {

    fetchAll({
      commit,
      state
    }) {
      console.log('Fatch all items');
      // TODO: TBD
    },

    addNew({
      commit,
      state
    }, value) {
      value = value && value.trim();
      if (!value) {
        return;
      }
      // Api call
      commit("put", {
        id: state.uid++,
        title: value,
        completed: false
      });
    },

    toggleCompleted({
      commit,
      state
    }, todo) {
      if (!todo) {
        return;
      }
      todo.completed = !todo.completed;
      // API call
      commit("edit", todo);
    },

    startEdit({
        commit,
        state
      },
      todo) {
      state.beforeEditCache = todo.title;
      state.editingTodo = todo;
      console.log('start edit', todo);
    },

    doneEdit({
        commit,
        state
      },
      todo) {
      if (!state.editingTodo) {
        return;
      }

      if (todo.title.trim() == state.beforeEditCache) {
        state.editingTodo = null;
        return;
      }

      todo.title = todo.title.trim();
      if (!todo.title) {
        // APi call
        commit("remove", todo);
      } else {
        // APi call
        commit("edit", todo);
      }
      state.editingTodo = null;
    },

    cancelEdit({
        commit,
        state
      },
      todo) {
      todo.title = this.beforeEditCache;
      state.editingTodo = null;
      this.beforeEditCache = "";
      console.log('cancel edit', todo);
    },

    remove({
      commit
      /*, state*/
    }, todo) {
      // + api call
      commit("rm", todo);
    },

    removeCompleted({
      commit,
      state,
    }) {
      state.todos.forEach(element => {
        if (element.completed)
          // Api call
          commit("rm", element);
      });
    },

    setAllDone({
      commit,
      state
    }) {
      state.todos.forEach(element => {
        if (!element.completed){
          element.completed = true;
          // Api call
          commit("edit", element);
        }
      });
    }

  }

}
