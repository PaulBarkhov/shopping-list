import { React, useState } from 'react'
import { Collapse, ListGroupItem, Button } from 'reactstrap'
import broccoli from '../images/broccoli.svg'
import apple from '../images/apple.svg'
import spinach from '../images/spinach.png'
import berry from '../images/berry.svg'

import ItemsGroup from './ItemsGroup'


export const List = props => {

    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => setIsOpen(!isOpen)

    const getData = () => {
    }

    const renderList = (art, artName, icon) => {
        const arr = props.list.data.filter(item => {
            return item.art === art
        })
        if (arr.length !== 0 ) {
            return (
                <ItemsGroup 
                    getData={getData}
                    art = {art}
                    items = {arr}
                    artName = {artName}
                    icon = {icon}
                    published = {true}
                />
            )
        }
        else return <></>
    }
    
    const renderComment = () => {
        if (props.list.comment.length !== 0) {
            return (
                <ListGroupItem style={{wordWrap: 'break-word'}}>
                    <span style={{fontSize: '1rem'}}><strong>Комментарий: </strong>{props.list.comment}</span>
                </ListGroupItem>
            )
        }
        else return <></>
    }

    if (props.list.data.length === 0) {
        return (<></>)
    }

    const vegetables = renderList('vegetables', 'Овощи', broccoli)
    const fruits = renderList('fruits', 'Фрукты', apple)
    const greens = renderList('greens', 'Зелень', spinach)
    const berries = renderList('berries', 'Ягоды', berry)

    const comment = renderComment()

    return (
        <div className="list" style={{padding: '0'}}>
            <span onClick={toggle} style={{fontSize: '1.5rem', marginLeft: '10px', display: 'inline-block', width: '80%', padding: '10px 0'}}>{props.list.name === '' ? 'Новый список' : props.list.name}</span>
            <Collapse isOpen={isOpen}>

                {comment}

                {vegetables}
                {fruits}
                {greens}
                {berries}

                <ListGroupItem style={{display: 'flex', justifyContent: 'end'}}>
                    <Button color="danger" href="/home" onClick={() => props.deleteList(props.list.id)}>
                        Удалить
                    </Button>
                </ListGroupItem>

            </Collapse>
        </div> 
    )
}

