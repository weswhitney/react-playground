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
    return (
      <div className="experienceBox">
        <h1>Experience</h1>
        <ExperienceList data={this.state.data} />
      </div>
    );
  }
});

var ExperienceList = React.createClass({
  render: function () {
    var experienceNodes = this.props.data.map(function (experience) {
      return (
        <Experience title={experience.title}>
          {experience.company}
        </Experience>
      );
    })
      return (
        <div className="experienceList">
          {experienceNodes}
        </div>
      );
    }
});

var Experience = React.createClass({
  render: function () {
    return (
      <div className="experience">
        <h2 className="experienceTitle">
        {this.props.title}
        </h2>
        {this.props.children}
      </div>
    );
  }
});

React.render(
  <ExperienceBox url="jobs.json" pollInterval={2000} />,
  document.getElementById('edit')
);
