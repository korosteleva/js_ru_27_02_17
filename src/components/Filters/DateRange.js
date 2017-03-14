import React, { Component, PropTypes } from 'react'
import DayPicker, { DateUtils } from 'react-day-picker'
import 'react-day-picker/lib/style.css'

export default class DateRange extends Component {

    static propTypes = {
        from: PropTypes.object,
        to: PropTypes.object,
        onDayChange: PropTypes.func.isRequired
    };

    render() {
        const { from, to } = this.props;
        const selectedRange = from && to && `${from.toDateString()} - ${to.toDateString()}`;

        return (
            <div className='date-range'>
                <DayPicker
                    selectedDays={[from, { from, to }]}
                    onDayClick={this.handleDayClick} />
                {selectedRange}
            </div>
        );
    }

    handleDayClick = (day) => {
        const { from, to, onDayChange } = this.props;
        onDayChange(
            DateUtils.addDayToRange(day, { from, to })
        );
    }
}
