/**
 * Created by lihao on 2017/5/10.
 */
import React from 'react';

class Page extends React.Component {
    render() {
        return (
            <div className="RootDiv" style={{height: '100%', width: '100%'}}>
                {this.props.children}
            </div>
        )

    }
}

export default Page;