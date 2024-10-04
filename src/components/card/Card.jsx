import React from 'react'
import { ORDER_STATUS, TABLE_FIELDS } from '../../utils/constants';

const Card = ({ heading, data }) => {
    const switchCase = (header, dataValue) => {
        let value;
        switch (header) {
            case 'status':
                value = ORDER_STATUS[dataValue]
                break
            default:
                value = dataValue
                break;
        }
        return value;
    }
    
    const styles = {
        row: {
            display: 'flex',
            justifyContent: 'center',
        },
        column: {
            width: '50%',
            padding: '16px',
        },
        card: {
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
            // padding: '16px',
            textAlign: 'left',
            padding: '50px',
            paddingLeft: '100px',
            backgroundColor: '#f1f1f1',
            borderRadius: '8px',
        },
        paragraph: {
            margin: '8px 0',
        },
    };

    return (
        <>
            <div style={styles.row}>
                <div style={styles.column}>
                    <div style={styles.card}>
                        <h2> <u>{heading}</u> </h2>
                        <div>
                            {Object.entries(data).map(([key, value], index) => (
                                <p key={index} style={styles.paragraph}>
                                    <b>{TABLE_FIELDS[key]}: </b>
                                    {switchCase(key, value)}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card