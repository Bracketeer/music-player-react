import React from 'react';
import { StyleSheet, css } from 'aphrodite';

export default class Shuffle extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }
    setIconState() {
        return this.props.shuffle ? this.styles.active : null
    }
    render() {
        return (
            <div
                className={css(this.styles.icon, this.styles.inactive, this.setIconState())}
                onClick={event => this.props.setState({ shuffle: !this.props.shuffle })}>
                <i className="material-icons">shuffle</i>
            </div>
        )
    }
    styles = StyleSheet.create({
        inactive: {
            color: 'lightgray'
        },
        active: {
            color: 'teal'
        },
        icon: {
            fontSize: '25px',
            height: '40px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'teal',
            boxSizing: 'border-box',
            margin: 'auto 10px',
            cursor: 'pointer'
        },
    })
}