define(function(require){
var React = require("react"),
    ReactDOM = require("reactDOM"),
    inputHeightAutoExpand = require("ihae");
var TodoApp = React.createClass({
    getInitialState: function(){
        return {
            todos: {},
            newId: 1
        }
    },
    componentDidMount: function() {
        var newId = this.state.newId,
            items = this.state.todos,
            initItems = this.props.todos,
            item;
        for( var i in initItems ){
            item = initItems[i];
            item.display = true;
            newId = Math.max(newId, item.id + 1);
            items[item.id] = item;
        }
        this.setState({todos: items, newId: newId});
    },
    render: function(){
        return (
            <div className="todo-app">
                <div className="header">Todo Recorder</div>
                <div className="sub-header">Keeping your todo records on your browser.</div>
                <Search updateSearchResult={this.searchTodo} todos={this.state.todos} />
                <TodoItemList todos={this.state.todos} removeTodo={this.removeTodo} />
                <TodoAdd addTodo={this.addTodo} />
                <div className="footer">Simple Todo Recorder with React.js</div>
            </div>
        );
    },
    addTodo: function(content){
        var todos = this.state.todos, id = this.state.newId;
        todos[id] = {
            id: id,
            content: content,
            display: true
        }
        this.setState({
            todos: todos,
            newId: id + 1
        });
        localStorage.TodoData = this.getTodos();
    },
    removeTodo: function(id){
        var todos = this.state.todos;
        if(todos.hasOwnProperty(id)){
            delete todos[id];
        }
        this.setState({
            todos: todos
        });
        localStorage.TodoData = this.getTodos();
    },
    searchTodo: function(keyword){
        keyword = keyword.trim().replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
        var keywords = keyword.split(/\s+/).map(function(word){return word ? RegExp(word, "iu") : ""});
        var todos = this.state.todos, display;
        for( var id in todos ){
            display = false;
            for(var i in keywords){
                if(id.toString().match(keywords[i]) || todos[id].content.match(keywords[i])){
                    display |= true;
                }
            }
            todos[id].display = display;
        }
        this.setState({todos: todos});
    },
    getTodos: function(){
        var todos = this.state.todos, items = [];
        for( var id in todos ){
            items.push(todos[id]);
        }
        return JSON.stringify(items);
    }
});

var Search = React.createClass({
    render: function(){
        return (
            <div className="search">
                <input className="search-input" placeholder="search todos..." onChange={this.handelSearch} />
                <div className="search-hint">{this.getSearchResult()}</div>
            </div>
        );
    },
    handelSearch: function(e){
        this.props.updateSearchResult(e.target.value);
    },
    getSearchResult: function(){
        var matches = 0, all = 0, todos = this.props.todos;
        for( var id in todos ){
            if( todos[id].display ){
                matches++;
            }
            all++;
        }
        return matches == all ? "" : (!matches ? "No" : matches + "/" + all) + " matches";
    }
});

var TodoItemList = React.createClass({
    render: function(){
        var todos = this.props.todos, items = [], item;
        for( var id in todos ){
            item = todos[id];
            if(item.display){
                items.push(
                    <TodoItem itemId={item.id} content={item.content} removeTodo={this.props.removeTodo} />
                );
            }
        }
        if(!items.length){
            items.push(
                <div className="item-no-record">No Todos on the record.</div>
            );
        }
        return (
            <div className="todos">
            {items}
            </div>
        );
    }
});

var TodoItem = React.createClass({
    render: function(){
        return (
            <div className="item">
                <div className="item-id">{"#"+this.props.itemId}</div>
                <pre className="item-content">{this.props.content}</pre>
                <div className="item-remove button" onClick={this.removeItem} title={"Delete #"+this.props.itemId}>Delete</div>
            </div>
        );
    },
    removeItem: function(e){
        e.preventDefault();
        this.props.removeTodo(this.props.itemId);
    }
});

var TodoAdd = React.createClass({
    componentDidMount: function() {
        this.refs.content.focus();
        this.autoExpand();
    },
    render: function(){
        return (
            <div className="add-todo">
                <textarea className="add-input" placeholder="Enter new todo content here..." ref="content" onChange={this.autoExpand}></textarea>
                <div className="item-add button" onClick={this.addItem}>Add new one</div>
            </div>
        );
    },
    addItem: function(e){
        e.preventDefault();
        var content = this.refs.content;
        if(content.value){
            this.props.addTodo(content.value);
            content.value = "";
            this.autoExpand();
        }
        content.focus();
    },
    autoExpand: function(){
        inputHeightAutoExpand(this.refs.content);
    }
});

var todoData = [
    {   id: 1,
        content: "This is a todo record." },
    {   id: 2,
        content: "And there are more things to do." }
];
if(Storage && localStorage && localStorage.TodoData){
    try{
        todoData = JSON.parse(localStorage.getItem("TodoData"));
    }catch(e){
        localStorage.removeItem("TodoData");
    }
}

return ReactDOM.render(
    <TodoApp todos={todoData} />
, document.getElementById("todoapp") );
})