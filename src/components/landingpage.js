import React, { Component } from 'react';
import { Cell, Grid, Card, CardTitle, CardText, Button } from 'react-mdl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle, faThumbsUp, faThumbsDown, faQuestion, faCalendarDay } from '@fortawesome/free-solid-svg-icons'
const element = <FontAwesomeIcon icon={faPlayCircle} style={{ color: '#fff', fontSize: 45 }} />
const thumbsup = <FontAwesomeIcon icon={faThumbsUp} style={{ color: '#00ff00', fontSize: 35 }} />
const thumbsdown = <FontAwesomeIcon icon={faThumbsDown} style={{ color: 'tomato', fontSize: 35 }} />
const maybe = <FontAwesomeIcon icon={faQuestion} style={{ color: '#ffc107', fontSize: 35 }} />
const calender = <FontAwesomeIcon icon={faCalendarDay} style={{ color: '#fff', fontSize: 15 }} />
class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
      showvdo: false,
      keys: ''
    }
  }
  componentDidMount() {
    fetch('https://in.bookmyshow.com/serv/getData?cmd=GETTRAILERS&mtype=cs')
      .then(res => res.json())
      .then(data => {
        var keys = Object.keys(data[1]);
        this.setState({
          isLoaded: true,
          items: data,
          keys: keys,
          showDiv: false
        })
        console.log(data)
      })
      .catch(err => console.log(err));
  }
  showvdo(url) {

    this.setState({ showvdo: true })
    this.trailer = url['TrailerURL']
    this.eventName = url['EventName']
    this.eventLang = url['EventLanguage']
    this.releaseDate = url['DispReleaseDate']
    console.log(this.trailer);
    console.log('i am pressed at card', this.trailer);
    this.embedVideoId = this.getEmbedId(this.trailer);
    console.log('check url', this.trailer);
    this.trailer = "//www.youtube.com/embed/" + this.embedVideoId;

  }
  getEmbedId(url) {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);

    if (match && match[2].length === 11) {
      return match[2];
    } else {
      return 'error';
    }
  }
  card() {
    // var self = this;
    return this.state.keys.map((key, index) => {
      return (
        <div key={index}>
          <Card
            shadow={0} style={{ width: '230px', height: '320px', float: 'left', margin: 10 }}>
            <div onClick={() => {
              this.showvdo(this.state.items[1][key]);
            }} style={{ position: 'absolute', left: '40%', top: '40%', cursor: 'pointer' }}>
              {element}
            </div>
            <CardTitle expand style={{
              color: '#fff',
              backgroundImage: `url('https://in.bmscdn.com/events/moviecard/${this.state.items[1][key]['EventCode']}.jpg')`
            }}
            >
            </CardTitle>
            <CardText>
              {this.state.items[1][key]['EventName']}
            </CardText>
          </Card>
        </div>
      );
    });
  }
  render() {
    var { isLoaded } = this.state
    if (!isLoaded) {
      return (
        <div>Loading...</div>
      )
    } else
      return (
        <div>
          <div style={{ backgroundColor: 'rgba(51,53,69,0.9)', position: 'relative' }}>
            <div>
              {this.state.showvdo ? <div>
                <Button primary style={{ float: 'right', marginRight: 10 }} raised ripple onClick={() => this.setState({ showvdo: false })}>close</Button>
                <div style={{ width: '30%', float: 'right', }}>
                  <Grid>
                    <Cell col={4}>{thumbsup}<br /><span style={{ color: "#fff", fontWeight: 'bold' }}>Will Watch</span></Cell>
                    <Cell col={4}>{maybe}<br /><span style={{ color: "#fff", fontWeight: 'bold' }}>MayBe</span></Cell>
                    <Cell col={4}>{thumbsdown}<br /><span style={{ color: "#fff", fontWeight: 'bold' }}>Won't be</span></Cell>
                  </Grid>
                  <h3 style={{ color: '#fff' }}>{this.eventName}</h3>
                  <h5 style={{ color: '#fff' }}>{this.eventLang}</h5>
                  <p style={{ color: '#fff' }}>{calender} {this.releaseDate}</p>
                </div>
                <iframe onload="parent.scrollTo(0,0);" title="Trailer" style={{ marginLeft: 50, marginBottom: 10, marginTop: 5 }} width="50%" height="380" src={this.trailer} frameBorder="0" allow="accelerometer; autoplay=1; allow='autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
              </div> : null}
            </div>
          </div>
          <div >
            {this.card()}
          </div>
        </div>
      );
  }
}
export default Landing;