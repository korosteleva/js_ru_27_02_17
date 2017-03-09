import React from 'react';

export default (CustomComponent) => class AccordionComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            openedId: null
        };

        this.handleAccordion = this.handleAccordion.bind(this);
    }

    handleAccordion(openedId) {
        const newOpenedId = this.state.openedId !== openedId ? openedId : null;
        return () => {
            this.setState({
                openedId: newOpenedId
            });
        };
    }

    render() {
        return <CustomComponent {...this.props} {...this.state} onClick={this.handleAccordion} />;
    }
}
