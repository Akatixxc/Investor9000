import React from 'react';

const PlusIcon = () => {
    return (
        <span className="panel__header-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16">
                <path fill="currentColor" d="M14,7H9V2A1,1,0,0,0,7,2V7H2A1,1,0,0,0,2,9H7v5a1,1,0,0,0,2,0V9h5a1,1,0,0,0,0-2Z" />
            </svg>
        </span>
    );
};

const MinusIcon = () => {
    return (
        <span className="panel__header-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16">
                <path fill="currentColor" d="M14,9H2A1,1,0,0,1,2,7H14a1,1,0,0,1,0,2Z" />
            </svg>
        </span>
    );
};

const PanelHeader = props => {
    const { handleToggle, isExpanded, children } = props;
    return (
        <button type="button" className="panel__header" onClick={handleToggle} aria-expanded={isExpanded}>
            {children}
            {isExpanded ? <MinusIcon /> : <PlusIcon />}
        </button>
    );
};

const PanelBody = props => {
    const { children, isExpanded } = props;
    return (
        <div className="panel__body" aria-hidden={isExpanded}>
            {children}
        </div>
    );
};

class Panel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isExpanded: props.openDefault,
        };

        this.handleToggle = this.handleToggle.bind(this);
    }

    handleToggle() {
        const { isExpanded } = this.state;
        this.setState({
            isExpanded: !isExpanded,
        });
    }

    render() {
        const { isExpanded } = this.state;
        const { children, title } = this.props;
        return (
            <div className="panel">
                <PanelHeader handleToggle={this.handleToggle} isExpanded={isExpanded}>
                    {title}
                </PanelHeader>
                <PanelBody isExpanded={!isExpanded}>{children}</PanelBody>
            </div>
        );
    }
}

export default Panel;
