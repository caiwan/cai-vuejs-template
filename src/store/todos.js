import io from '@/services/io';


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
    // uid: 0,
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
    clear: (state) => state.todos = [],

    put: (state, todo) => state.todos.push(todo),

    putAll: (state, todos) => state.todos = state.todos.concat(todos),

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

    async fetchAll({
      commit
    }) {
      const todos = await io.todos.fetchAll();
      commit("clear");
      commit("putAll", todos)
    },

    async addNew({
      commit,
      state
    }, value) {
      value = value && value.trim();
      if (!value) {
        return;
      }
      const todo = await io.todos.addNew({
        title: value,
        completed: false
      });
      commit("put", todo);
    },

    async toggleCompleted({
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

    async remove({
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

    async setAllDone({
      commit,
      state
    }) {
      state.todos.forEach(element => {
        if (!element.completed) {
          element.completed = true;
          // Api call
          commit("edit", element);
        }
      });
    }

  }

}
