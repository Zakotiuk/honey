import React, { Component, Fragment } from 'react';
import "./Home.css"
import { Card } from 'antd';
const { Meta } = Card;

export class Home extends Component {
  static displayName = Home.name;
  onChange(a, b, c) {
    console.log(a, b, c);
  }

  render() {
    const contentStyle = {
      height: '360px',
      color: '#fff',
      lineHeight: '160px',
      textAlign: 'center',
      background: '#364d79',
    };

    return (
      <Fragment>
        <div className="container">
          <div className="jumbotron">
            <h1 className="display-4 base-color">Honey Courses</h1>
          </div>
          <div className="row">
            <h6 className="col-lg-1 col-md-1 col-sm-1 col-xs-1">Honey Courses</h6>
            <img className="pict col-lg-10 col-md-10 col-sm-10 col-xs-10" src="https://besthqwallpapers.com/Uploads/21-12-2019/116817/thumb2-hope-4k-wallpapers-with-names-female-names-hope-name.jpg" />
            <h6 className="col-lg-1 col-md-1 col-sm-1 col-xs-1 right-text">Honey Courses</h6>
          </div>
          <div className="liner row">
            <h3>Your future with our courses :</h3>
            <img className="col-lg-4 col-md-4 smallPict" height="250px" width="250px" src="https://www.treehugger.com/thmb/WpOXX3iRveUDwmiz-7r2XG_o4QA=/701x701/smart/filters:no_upscale()/__opt__aboutcom__coeus__resources__content_migration__mnn__images__2018__12__PurpleSkyPalmTrees1000px-c4950ffafcf942e2961bcd0b7bd1853b.jpg" />
            <img className="col-lg-4 col-md-4 smallPict" height="250px" width="250px" src="https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80" />
            <img className="col-lg-4 col-md-4 smallPict" height="250px" width="250px" src="https://i.pinimg.com/474x/32/a6/18/32a61861a75a74512d9f79b93e8133ba.jpg" />
          </div>
          <div className="row cards">
            <Card className="col-lg-4 col-md-4 smthh"
              hoverable
              cover={<img alt="example" height="600px" src="https://i.pinimg.com/564x/b4/23/67/b4236791c54c9a485c59434461f0750d.jpg" />}>
              <Meta title="Our teacher" style={{ backgroundColor: 'rgb(173, 104, 173)' }} />
              <Meta style={{ marginTop: 10 + "px" }} description="www.instagram/OlegViarenko.com" />
            </Card>
            <Card className="col-lg-4 col-md-4 smthh"
              hoverable
              cover={<img alt="example" height="600px" src="https://i.pinimg.com/564x/af/d1/ee/afd1ee0fb04256ff59c723c6462369ce.jpg" />}>
              <Meta title="Is a young person" style={{ backgroundColor: 'rgb(173, 104, 173)' }} />
              <Meta style={{ marginTop: 10 + "px" }} description="www.instagram/VasiaBernol.com" />
            </Card>
            <Card className="col-lg-4 col-md-4 smthh"
              hoverable
              cover={<img alt="example" height="600px" src="https://i.pinimg.com/564x/d7/37/d2/d737d2377dd64ad489215e5525a1bbd0.jpg" />}>
              <Meta title="So they have new knowledge" style={{ backgroundColor: 'rgb(173, 104, 173)' }} />
              <Meta style={{ marginTop: 10 + "px" }} description="www.instagram/VadiaLerchun.com" />

            </Card>
          </div>
        </div>
      </Fragment>
    );
  }
}
