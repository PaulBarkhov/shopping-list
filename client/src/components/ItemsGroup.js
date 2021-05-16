import { React, Component } from 'react'
import { Collapse, ListGroup, ListGroupItem } from 'reactstrap'
import ListItem from './Item'

export default class ItemsGroup extends Component{

    state = {
        isOpen: false
    }

    setIsOpen = () => {
        this.setState({isOpen: !this.state.isOpen})
    }

    renderItems = () => {
        return this.props.items.map((item, i) => {
            return (
                <ListItem 
                    key={i}
                    item={item} 
                    art={this.props.art} 
                    getData={this.props.getData} 
                    published={this.props.published}
                >
                </ListItem>
            )
        })
    }

    render() {
        const items = this.renderItems()
        return (
            <>
                <div className="list">
                    <img src={this.props.icon} alt="icon"></img>
                    <span onClick={this.setIsOpen} style={{fontSize: '1.5rem', marginLeft: '10px', display: 'inline-block', width: '80%', padding: '10px'}}>{this.props.artName}</span>
    
                    <Collapse isOpen={this.state.isOpen}>
                        <ListGroup style={{marginTop: '10px'}}>
    
                            {items}
    
                            <ListGroupItem  style={{textAlign: 'center'}} onClick={this.setIsOpen}>
                                <i className="fas fa-chevron-up"></i>
                            </ListGroupItem>
                        </ListGroup>
                    </Collapse>
                </div>
    
            </>
        )
    }
}

