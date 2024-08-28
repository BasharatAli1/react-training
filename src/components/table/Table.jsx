import React from 'react'
import { Link } from 'react-router-dom';
import { ORDER_STATUS, TABLE_FIELDS } from '../../utils/constants';

const Table = ({ headers, dataArr, type }) => {
    const switchCase = (header, dataValue, id) => {
        let value;
        const link = type === 'clinics' ? `/clinic/${id}` : type === 'orders' ? `/order/${id}` : `/patient/${id}`;
        const linkValue = type === 'clinics' ? 'name' : type === 'orders' ? 'orderNumber' : 'id';
        switch (header) {
            case linkValue:
                return <Link to={link}>
                    <h2>{dataValue}</h2>
                </Link>
            case 'status':
                value = ORDER_STATUS[dataValue];
                break
            default:
                value = dataValue
                break;
        }
        return value;
    }
    return (
        <div>
            <h1>TABLE</h1>
            <table>
                {
                    headers.length && (
                    <thead>
                        <tr>
                            {headers.map((header) => {
                                return <th key={header}>
                                    {TABLE_FIELDS[header]}
                                </th>
                            })}
                        </tr>
                    </thead>
                )}
                {
                    dataArr && 
                    <tbody>
                        {dataArr.map((data, index) => (
                            <tr key={index}>
                                {
                                    headers.map((header) => (
                                        <td key={header}>{switchCase(header, data[header], data.id)}</td>
                                    )
                                )}
                            </tr>
                        ))}
                    </tbody>
                }
            </table>
        </div>
    )
}

export default Table