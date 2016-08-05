const App = React.createClass({
  getInitialState: function () {
    return {
      isEditor: true,
      elements: []
    }
  },
  toggle: function () {
    this.setState({
      isEditor: !this.state.isEditor
    });
  },
  addElement: function (element) {
    const elements = this.state.elements;
    elements.push(element);
    this.setState({elements});
  },
  deleteElement: function (index) {
    const elements = this.state.elements;
    elements.splice(index, 1);
    this.setState({elements});
  },
  render: function () {
    const isEditor = this.state.isEditor;
    return <div>
      <div className="col-lg-12 text-center my_bottom">
        <ReactRouter.Link activeClassName="btn" onClick={this.toggle} to={this.state.isEditor ? '/edit': '/preview'}>{this.state.isEditor ? "Preview" : "Edit"}</ReactRouter.Link>
        {this.props.children && React.cloneElement(this.props.children, {
          elements: this.state.elements,
          onAdd: this.addElement,
          onDelete: this.deleteElement
        })}
      </div>
    </div>;
  }
});

const Editor = React.createClass({
  render: function () {
    return <div className="row">
      <Left elements={this.props.elements} onDelete={this.props.onDelete}/>
      <Right onAdd={this.props.onAdd}/>
    </div>;
  }
});

const Left = React.createClass({
  remove: function (index) {
    this.props.onDelete(index);
  },
  render: function () {
    const elements = this.props.elements.map((ele, index) => {
      return <div className="form-group my_top" key={index}>
        <input className="btn-info my_input" type={ele}/>
        <button className="btn btn-info" onClick={this.remove.bind(this, index)}>-</button>
      </div>
    });

    return <div className="col-lg-9 text-left">
      {elements}
    </div>
  }
});

const Right = React.createClass({
  add: function () {
    const element = $("input[name=element]:checked").val();
    this.props.onAdd(element);
  },
  render: function () {
    return <div className="col-lg-3 my_border my_top">
      <div className="btn-info my_padding my_no_margin">
        <input type="radio" name="element" value="text"/>&nbsp;&nbsp;&nbsp;Text
      </div>
      <div className="btn-info my_top my_padding">
        <input type="radio" name="element" value="date"/>&nbsp;&nbsp;&nbsp;Date
      </div>
      <button className="btn btn-info my_top center-block my_circle" onClick={this.add}>+</button>
    </div>
  }
});

const Previewer = React.createClass({
  render: function () {
    const elements = this.props.elements.map((ele, index) => {
      return <div key={index}>
        <input className="btn-info my_input my_bottom " type={ele}/>
      </div>;
    });
    return <div className="text-center my_top">
        {elements}
      <button className="btn btn-info my_top my_bottom">Submit</button>
    </div>;
  }
});

ReactDOM.render(
    <ReactRouter.Router>
      <ReactRouter.Route path="/" component = {App}>
        <ReactRouter.IndexRoute component = {Editor}></ReactRouter.IndexRoute>
        <ReactRouter.Route path="/preview" component = {Editor}></ReactRouter.Route>
        <ReactRouter.Route path="/edit" component = {Previewer}></ReactRouter.Route>
      </ReactRouter.Route>
    </ReactRouter.Router>
  , document.getElementById('content'));