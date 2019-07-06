import React, { Component } from 'react';
import './App.css';
import { Layout, Header, Content, Navigation, Drawer } from 'react-mdl';
import Main from './components/main';
class App extends Component {
    render() {
        return (
            <div className="demo-big-content">
                <Layout>
                    <Header transparent
                        title={<span><strong>BookMyShow(icon)</strong></span>}
                        style={{ color: 'white', backgroundColor: '#333545' }}>
                        <Navigation>
                            <a href="">Movies</a>
                            <a href="">Event</a>
                            <a href="">Plays</a>
                            <a href="">Sports</a>
                            <a href="">Activities</a>
                        </Navigation>
                    </Header>
                    <Drawer title="BookMyShow">
                        <Navigation>
                            <a href="">Coorporates</a>
                            <a href="">Offers</a>
                            <a href="">Gift Cards</a>
                        </Navigation>
                    </Drawer>
                    <Content>
                        <div className="page-content" />
                        <Main />
                    </Content>
                </Layout>
            </div>
        );
    }
}

export default App;
