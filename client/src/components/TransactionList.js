import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../context/GlobalState'
import Transaction from './Transaction'
import spinner from './spinner.gif'

const TransactionList = () => {
    const { transactions, getTransactions } = useContext(GlobalContext)

    useEffect(() => {
        getTransactions()
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const transactionList = transactions ? transactions.map(transaction => {
            <Transaction transaction={transaction}  key={transaction._id} />
    }) : <img src={spinner} alt="Loading..."
    style={{width: '200px', margin: '40px auto', display: 'block'}}/>
    return (
        <React.Fragment>
            <h3>History</h3>
            <ul className="list">
                { transactionList}
            </ul>
        </React.Fragment>
    )
}

export default TransactionList
