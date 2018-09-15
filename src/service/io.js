class BaseIONode {
    constructor(io){
      this.io = io;
    }

    get root(){
      return this.io.root;
    }
  
    get headers(){
      return this.io.headers;
    }
  }
  
  class Todos{
    
  }

  class IO {
    constructor(){
      this.headers = null;
      this.root = '';
  
      this.todos = null;

    //   this.items = null;
    //   this.tags = null;
    //   this.stats = null;

    // this.initialized = fetch('./api/settings/', {
        // credentials: 'same-origin'
      // })
        // .then(v => v.json())
        // .then(data =>{
          // this.root = `${data.root}/api`;
  
          // this.headers = new Headers({'X-CSRFToken': data.csrftoken});
this.todos = new Todos();  

        // })

      // }
  
    toJson(data){
      return {
        body: new Blob([JSON.stringify(data)], {type: 'application/json'}),
        headers: this.headers
      };
    }
  }
  
  export default new IO();
