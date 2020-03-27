import React from 'react';
import PropTypes from 'prop-types';

class InputNumber extends React.Component {
    constructor() {
        super();

        this.state = {
            value: 0,
        };

        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
    }

    increment() {
        const { max } = this.props;
        const { value } = this.state;

        if (value >= max) return;

        this.setState({ value: value + 1 });
    }

    decrement() {
        const { min } = this.props;
        const { value } = this.state;

        if (value <= min) return;

        this.setState({ value: value - 1 });
    }

    render() {
        const { value } = this.state;
        return (
            <div className="input-number">
                <button type="button" onClick={this.decrement}>
                    &minus;
                </button>
                <span>{value}</span>
                <button type="button" onClick={this.increment}>
                    &#43;
                </button>
            </div>
        );
    }
}

InputNumber.propTypes = {
    max: PropTypes.number,
    min: PropTypes.number,
};

InputNumber.defaultProps = {
    min: 0,
    max: 100,
};

export default InputNumber;
