import React, { useState, useContext, useCallback, useEffect } from 'react'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import { Button } from 'reactstrap'
import { List } from '../components/List.js'

export const HomePage = props => {

    const {request} = useHttp()
    const {token} = useContext(AuthContext)

    const [lists, setLists] = useState([])

    const loadLists = useCallback( async () => {

        try {
        const res = await request('/api/list', 'GET', null, {
            Authorization: `Bearer ${token}`
        })
        setLists(res)
        } catch(e) {
            console.log(e)
        }
    }, [token, request])

    useEffect(() => {
        loadLists()
    }, [loadLists])

    const deleteList = async id => {

        // const newArr = lists.filter(item => {
        // return item.id !== id
        // })
        // setLists(newArr)

        try {
            await request('/api/list/deleteList', 'POST', {id: id}, {
                Authorization: `Bearer ${token}`
            })
        } catch(e) {
            console.log(e)
        }
    }

    const renderLists = () => {

        if (lists.length === 0) {
            return <h1 style={{textAlign: 'center', marginTop: '30px'}}>Списков пока нет :)</h1>
        }

        return lists.map((item) => {
            
            return (
                <List 
                    list={item} 
                    deleteList={deleteList}
                ></List>
            )
        })
    }

    const qwe = renderLists()
    return (
        <h1>
            {qwe}
            <Button color="primary" style={{width: 'calc(100% - 2rem)', position: 'fixed', bottom: '1rem', left: '1rem'}} href="/create">Создать новый список</Button>
        </h1>
    )
}






