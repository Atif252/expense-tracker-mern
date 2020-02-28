import React, {createContext, useReducer} from 'react'
import AppReducer from './AppReducer'
import axios from 'axios'


const initState = {
    transactions: [],
    error: null,
    loading: true
}

export const GlobalContext = createContext(initState)

export const GlobalContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(AppReducer, initState)

    function dispatchError(err) {
        dispatch({
            type: 'TRANSACTION_ERROR',
            payload: err.response.data.error
        })
    }

    //Actions
    async function getTransactions(){
        try {
            const res = await axios.get('/api/v1/transactions')
            dispatch({
                type: 'GET_TRANSACTIONS',
                payload: res.data.data
            })

        } catch (err) {
            dispatchError(err)
        }
    }



    async function deleteTransaction(id){
        try {
            await axios.delete(`/api/v1/transactions/${id}`)

            dispatch({
                type: 'DELETE_TRANSACTIION',
                payload: id
            })
        } catch (err) {
            dispatchError(err)
        }

    }
    
    async function addTransaction(transaction){
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post('/api/v1/transactions',transaction, config)
            dispatch({
                type: 'ADD_TRANSACTIION',
                payload: res.data.data
            })

        } catch (err) {
            dispatchError(err)
        }
    }

    return (
        <GlobalContext.Provider value={{transactions: state.transactions, error: state.error, loading: state.loading, deleteTransaction, addTransaction, getTransactions }}>
            {children}
        </GlobalContext.Provider>
    )
}