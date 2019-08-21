import React, { useState } from 'react';


function Input(props) {
    const styles = {
        container: {
            position: 'relative',
            width: '100%',
            maxWidth: '500px',
        },
        label: {
            position: 'absolute',
            top: '50%',
            get left() { return value ? 'calc(100% - 50px)' : '20px' },
            get transform() { return value ? 'translate(-100%, -50%)' : 'translate(0, -50%)' },
            transition: '.3s ease all',
            color: 'rgba(255,255,255,.8)',
            fontSize: '16px',
            get marginTop() {return value ? '3px' : null }
        },
        input: {
            padding: '10px 20px',
            border: 'none',
            borderRadius: '30px',
            background: 'rgba(255,255,255,.2)',
            width: '100%',
            maxWidth: '500px',
            color: '#ffffff',
        }
    }
    const [value, setValue] = useState(null);
    return (
        <div style={styles.container}>
            <label style={styles.label}>{!value ? props.label : '🔍'}</label>
            <input onInput={event => setValue(event.target.value)} type={props.type} style={styles.input} />
        </div>
    )
}

export default Input;