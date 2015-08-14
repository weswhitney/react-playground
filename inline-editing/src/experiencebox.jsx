var ExperienceBox = React.createClass({
  loadJobsFromServer: function () {
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
    return {editing: false, data: []};
  },

  startEdit: function () {
    this.setState({editing: true});
  },

  componentDidMount: function () {
    this.loadJobsFromServer();
    setInterval(this.loadJobsFromServer, this.props.pollInterval);
  },

  render: function () {
  // console.log(this.state.data);
  //Experience list is a child, parent is saying "here, take my state.  you can now use data."
  return this.state.editing ? (
    <ExperienceForm data={this.state.data}/>
    ) : (
      <div className="clearfix border--bottom mb1">
        <h2 className="float-left">Experience</h2>
        <button className="button button--medium button--outline float-right" href="" onClick={this.startEdit} >Edit</button>
        <ExperienceList data={this.state.data} />
      </div>
    );
  }
});

var ExperienceList = React.createClass({
  render: function () {
    // console.log(this.props);
    //this is the child using the state passed from the parent, they access it using props.
    var experienceNodes = this.props.data.map(function (experience) {
      return (
        <Experience
          title={experience.title}
          company={experience.company}
          from={experience.fromDate}
          to={experience.to}
          location={experience.location}
          description={experience.description}>
        </Experience>
      );
    });
    // console.log(experienceNodes);
      return (
        <div className="experienceList">
          {experienceNodes}
        </div>
      );
    }
});

var Experience = React.createClass({
  render: function () {
    // console.log(this.props);
    return (
        <div className="experience">
          <span className="block"> {this.props.company} </span>
          <span className="block">{this.props.title} </span>
          <span className="block">{this.props.fromDate} - {this.props.to} {this.props.location} </span>
          <span className="block">{this.props.description}</span>
        </div>
    );
  }
});

var ExperienceForm = React.createClass({
  render: function () {

    var experienceNodes = this.props.data.map(function (experience) {
      return (
        <Experience
          title={experience.title}
          company={experience.company}
          from={experience.fromDate}
          to={experience.to}
          location={experience.location}
          description={experience.description}>
        </Experience>
      );
    });

    // console.log(this.props.data);
    return (
      <form className="experienceForm">
          <div className="clearfix border--bottom mb1">
            <h2 className="float-left">Experience</h2>
            <div className="float-right">
              <a className="button button--medium button--outline" href="">Cancel</a>
              <a className="button button--medium button--primary" href="" type="submit" value="Post">Save</a>
            </div>
            <div className="formFields">
              <div className="mb1">
                <span className="block bold">Title</span>
                <input className="form-control border--full full-width" type="text" defaultValue={this.props.title} ref="title" />
              </div>
              <div className="mb1">
                <span className="block bold">Company</span>
                <input className="form-control border--full full-width" type="text" ref="company" />
              </div>
              <div className="mb1">
                <span className="block bold">From</span>
                <input className="form-control border--full full-width" type="text" ref="fromDate" />
              </div>
              <div className="mb1">
                <span className="block bold">To</span>
                <input className="form-control border--full full-width" type="text" ref="to"/>
              </div>
              <div className="mb1">
                <span className="block bold">Location</span>
                <input className="form-control border--full full-width" type="text" ref="location" />
              </div>
              <div className="mb1">
                <span className="block bold">Description</span>
                <input className="form-control border--full full-width" type="text" ref="description"/>
              </div>
            </div>
          </div>
      </form>
    );
  }
});



React.render(
  <ExperienceBox url="experiences.json" pollInterval={2000} />,
  document.getElementById('edit')
);
