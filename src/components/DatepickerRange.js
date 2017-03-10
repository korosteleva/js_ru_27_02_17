import React from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import { getFormattedDate } from '../utils';

export default class DatepickerRange extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            from: null,
            to: null
        };

        this.MONTHS_VIEW_COUNT = 3;

        this.handleDayClick = this.handleDayClick.bind(this);
        this.handleResetClick = this.handleResetClick.bind(this);
    }

    handleDayClick(day) {
        const range = DateUtils.addDayToRange(day, this.state);
        this.setState(range);
    }

    handleResetClick() {
        this.setState({
            from: null,
            to: null,
        });
    }

    render() {
        const { from, to } = this.state;

        return (
            <div>
                {this.renderRangeTitle()}
                <DayPicker
                    numberOfMonths={this.MONTHS_VIEW_COUNT}
                    selectedDays={[from, { from, to }]}
                    onDayClick={this.handleDayClick} />
            </div>
        );
    }

    renderRangeTitle() {
        const { from, to } = this.state;
        if (!from && !to) {
            return <div>Select <strong>first day</strong> period</div>;
        }

        if (!to) {
            return <div>Select <strong>second day</strong> period</div>;
        }

        return (
            <div>
                You chose from&nbsp;
                <strong>{getFormattedDate(from)}</strong> to <strong>{getFormattedDate(to)}</strong>&nbsp;&nbsp;
                <button type='button' onClick={this.handleResetClick}>Reset range</button>
            </div>
        )
    }
}
