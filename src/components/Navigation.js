import React from 'react';
import Input from './Input';
import { StyleSheet, css } from 'aphrodite';
const styles = StyleSheet.create({
    navigation: {
        gridRow: '1 / 2',
        gridColumn: '1 / 3',
        background: 'teal',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        color: '#ffffff',
        padding: 10,
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        zIndex: 10,
    }
})
function Navigation() {
    return (
        <nav className={css(styles.navigation)}>
           <Input type="search" label="Search" />
        </nav>
    )
}

export default Navigation;