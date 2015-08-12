var ExperienceBox = React.createClass({
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
  componentDidMount: function () {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  getInitialState: function(){
    return {data: []};
  },
  render: function () {
    return <h1>{this.state.data}</h1>;
  }
});

// var ExperienceList = React.createClass({
//   render: function () {
//     var experienceNodes = this.props.data.map(function (experience) {
//       return (
//         <Experience title={experience.title}>
//           {experience.company}
//         </Experience>
//       );
//     });
//     return (
//       <div className="ExperienceList">
//         {experienceNodes}
//       </div>
//     );
//   }
// });
//
// var Experience = React.createClass({
//   render: function () {
//     return (
//       <div className="experience">
//         {this.props.data.title}
//       </div>
//     );
//   }
// });

React.render(
  <ExperienceBox url="data.json" />,
  document.getElementById('edit')
);
