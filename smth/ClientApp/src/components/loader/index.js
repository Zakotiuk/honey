import React, {Component} from 'react';
import './index.css';

class LoaderWidgetContainer extends Component {
    render() {
        return (
            <div className="myeclipse" id="dlgProgress">
                <div className="progress">
                    <div>
                        <i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
                    </div>
                </div>
            </div>
        );
    }
}
const LoaderWidget = (LoaderWidgetContainer);
export default LoaderWidget;