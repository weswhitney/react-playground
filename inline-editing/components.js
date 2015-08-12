var EditInline = React.createClass({
  loadCommentsFromServer: function () {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function (data) {
        this.setState({data: data});
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function(){
    return {data: []};
  },
  componentDidMount: function () {

  },
  render: function () {
    return <h1>hello data={this.state.data}</h1>;
  }
});

React.render(
  <EditInline url="data.json" />,
  document.getElementById('edit')
);
