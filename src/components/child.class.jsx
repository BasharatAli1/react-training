import React from "react";

class ChildClass extends React.Component {
    constructor(p) {
        super(p);
        console.log('01 Constructor Called (Class)');
    }
    componentDidMount() {
        console.log('03 Did Mount Called (Class)');
    }
    componentDidUpdate() {
        console.log('04 Did Update Called (Class)');
    }
    componentWillUnmount() {
        console.log('05 Will Unmount Called (Class)');
    }
    render() {
        console.log('02 render Called (Class)');
        const { count } = this.props;
        return (
            <p>Child Class Webhook Check Count: {count}</p>
        )
    }
}

export default ChildClass