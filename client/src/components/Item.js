import { React, Component} from 'react'
import { ListGroupItem } from 'reactstrap'

export default class Item extends Component {
    state = {
        checked: undefined,    
        quantity: 1,
        key: ''
    }

    componentDidMount = () => {
        console.log('Component did mount')
        this.setState(
            {key: Math.random().toString(36).substring(2, 15)}
        )
    }

    handleChange = (event) => {
        this.props.getData(this.props.art, this.props.item.name, this.state.quantity, event.target.checked, this.state.key)
        this.setState({
            checked: event.target.checked,
        })
    }

    isChecked = () => {
        if (this.state.checked) {
            if (this.props.published) {
                return <del>{this.props.item.name}</del>

            }
            else return <b>{this.props.item.name}</b>

        }
        else return <>{this.props.item.name}</>
    }

    increaseQuantity = () => {
        this.props.getData(this.props.art, this.props.item.name, this.state.quantity + 1, this.state.checked, this.state.key)
        this.setState({quantity: this.state.quantity + 1})
    }

    decreaseQuantity = () => {
        if (this.state.quantity === 1) {
            this.props.getData(this.props.art, this.props.item.name, this.state.quantity - 1, false, this.state.key)

            this.setState(
                {checked: !this.state.checked}
            )
        }
        else this.setState({quantity: this.state.quantity - 1})
    }

    renderQuantity = () => {
        let quantity
        if (this.state.quantity < 1 || this.state.quantity === undefined) {
            quantity = 1
        }
        else quantity = this.state.quantity

        if (!this.props.published && this.state.checked) {
            return (
                <>
                    <i className="fas fa-minus" onClick={this.decreaseQuantity}></i>                
                    <span className="quantity">{quantity}</span>
                    <i className="fas fa-plus" onClick={this.increaseQuantity}></i>
                </>
            )
        }
        if (this.props.published) {
            return (
                <span className="quantity">{this.props.item.quantity}</span>
            )
        }
    }

    render() {

        const name = this.isChecked()
        const quantity = this.renderQuantity()

        return (
            <ListGroupItem className="listItem" key={this.state.key}>
                <label className="inputContainer">{name}
                    <input type="checkbox" checked={this.state.checked} onChange={this.handleChange}></input>
                    <span className="checkmark"></span>
                </label>

                <div style={{float: 'right'}}>
                    {quantity}
                </div>
            </ListGroupItem>
        )
    }
}