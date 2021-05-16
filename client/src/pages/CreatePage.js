import { React, useState, useContext } from 'react'
import { Button } from 'reactstrap'
import broccoli from '../images/broccoli.svg'
import apple from '../images/apple.svg'
import spinach from '../images/spinach.png'
import berry from '../images/berry.svg'
import {AuthContext} from '../context/AuthContext'
import {useHttp} from '../hooks/http.hook'
import ItemsGroup from '../components/ItemsGroup'

// export default class NewList extends Component {
export const CreatePage = props => {

    const auth = useContext(AuthContext)
    const {request} = useHttp()

    const [name, setName] = useState('')
    const [data, setData] = useState([])
    const [comment, setComment] = useState('')

    const sendList = async () => {

        try {
          if (data.length !== 0) {
            await request('/api/list/generate', 'POST', {name, data, comment}, {
              Authorization: `Bearer ${auth.token}`
            })
          }
    
        } catch(e) {
            console.log(e)
        }
    }

    const getData = (art, name, quantity, checked, key) => {

        const arr = [...data].filter((item)=> {
          return item.key !== key
        })
    
        if (checked) {
          arr.push({art: art, name: name, quantity: quantity, checked: checked, key: key})
        }
    
        setData(arr)
    }
    
    const setListName = (event) => {
        setName(event.target.value)
    }

    const arr = [
        {
            name: 'vegetables',
            artName: 'Овощи',
            icon: broccoli,
            data: [
                {name: 'Помидор'}, 
                {name: 'Огурец'},
                {name: 'Перец'}, 
                {name: 'Баклажан'}, 
                {name: 'Кабачок'}, 
                {name: 'Картофель'}, 
                {name: 'Лук'}, 
                {name: 'Морковь'}, 
                {name: 'Авокадо'}, 
                {name: 'Батат'}, 
                {name: 'Свекла'}, 
                {name: 'Чеснок'}, 
            ]
        },

        {
            name: 'fruits',
            artName: 'Фрукты',
            icon: apple,
            data: [
                {name: 'Абрикос'}, 
                {name: 'Ананас'},
                {name: 'Апельсин'},
                {name: 'Арбуз'},
                {name: 'Банан'},
                {name: 'Виноград'},
                {name: 'Гранат'},
                {name: 'Грейпфрут'},
                {name: 'Груша'},
                {name: 'Дыня'},
                {name: 'Киви'},
                {name: 'Лайм'},
                {name: 'Лимон'},
                {name: 'Манго'},
                {name: 'Мандарин'},
                {name: 'Нектарин'},
                {name: 'Персик'},
                {name: 'Слива'},
                {name: 'Яблоко'}
            ]
        },

        {
            name: 'greens',
            artName: 'Зелень',
            icon: spinach,
            data: [
                {name: 'Базилик'}, 
                {name: 'Лук'},
                {name: 'Лук порей'}, 
                {name: 'Петрушка'},
                {name: 'Рукола'},
                {name: 'Салат'}, 
                {name: 'Салат китайский'},
                {name: 'Романо'},
                {name: 'Шпинат'},
            ]
        },

        {
            name: 'berries',
            artName: 'Ягоды',
            icon: berry,
            data: [
                {name: 'Вишня'}, 
                {name: 'Ежевика'},
                {name: 'Земляника'},
                {name: 'Клубника'},
                {name: 'Клюква'}, 
                {name: 'Крыжовник'},
                {name: 'Малина'},
                {name: 'Смородина'},
                {name: 'Хурма'}, 
                {name: 'Черешня'},
                {name: 'Черная смородина'}
            ]
        }
    ]

    const renderListGroups = () => {
        return arr.map((item, i) => {
            return (
                <ItemsGroup 
                    key = {i}
                    getData = {getData}
                    art = {item.name}
                    items = {item.data} 
                    artName = {item.artName}
                    icon = {item.icon}
                    darkMode = {props.darkMode}
                />
            )
        })
    }

    const qwe = (event) => {
        event.target.nextSibling.style.display = 'none'
    }

    const addComment = (event) => {
        setComment(event.target.value)
    }

    const listGroups = renderListGroups()
    const color = props.darkMode === true ? 'white' : 'black'
    const background = props.darkMode === true ? 'rgb(36, 36, 36)' : 'rgb(255, 255, 255)'

    return (
        <>
            <header>
                <input 
                    placeholder=" Новый список" 
                    // value="Новый список "
                    className="newListName"
                    onFocus = {qwe}
                    onChange = {setListName}
                    style={{color: color}}>
                </input>
                <div style={{position: 'absolute', top: '50%', width: '1px', height: '40px', transform: 'translateY(-50%)', background: color, animation: 'flicker .5s alternate infinite'}}></div>
            </header>

            {listGroups}

            <div style={{display: 'flex', alignItems: 'center'}}>
                <input 
                    onChange={addComment}
                    placeholder = "Комментарий"
                    style={{
                        width: '100%',
                        marginLeft: '10px',
                        height: '40px',
                        border: '1px solid rgba(128, 128, 128, 0.472)',
                        borderRadius: '5px',
                        color: color,
                        background: background,
                        outline: 'none',
                        paddingLeft: '10px'
                    }}></input>
                <Button 
                    color="primary"
                    href="/home"
                    onClick={sendList}
                    style={
                        {float: 'right', 
                        margin: '10px'}
                    }>Ok
                </Button>
            </div>
        </>
    )
}

