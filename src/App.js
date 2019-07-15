import React from 'react';
import CartHeader from './Components/CartHeader';
import CartFooter from './Components/CartFooter';
import CartItems from './Components/CartItems';
import AddItem from './Components/AddItem';

class App extends React.Component {

    state = {
        products: [],

        cartItemsList: [
            { id: 1, product: { id: 40, name: 'Mediocre Iron Watch', priceInCents: 399 }, quantity: 1 },
            { id: 2, product: { id: 41, name: 'Heavy Duty Concrete Plate', priceInCents: 499 }, quantity: 2 },
            { id: 3, product: { id: 42, name: 'Intelligent Paper Knife', priceInCents: 1999 }, quantity: 1 },
        ]
    }

    async componentDidMount() {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/products`)
        console.log(res);
        const json = await res.json()
        this.setState({
            products: json.map(product => {
                return {
                    ...product 
                }
            })
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        let product = e.target.product.value;
        let quantity = e.target.quantity.value;
        let newProduct;
        this.state.products.map(item => {
            if (product === item.name) {
                newProduct = {
                    product: {
                        id: item.id,
                        name: item.name,
                        priceInCents: item.priceInCents
                    },
                    quantity: quantity
                }
            }
        })

        this.setState({
            cartItemsList: this.state.cartItemsList.concat(newProduct)
        })
    }


    render() {
        let totalPrice = 0;
        this.state.cartItemsList.forEach(function (item) {
            return totalPrice += item.quantity * item.product.priceInCents;
        });

        return (
            <div className="container">
                <CartHeader />
                <CartItems cartItemsList={this.state.cartItemsList} />
                <AddItem
                    products={this.state.products}
                    onSubmit={this.onSubmit}
                    totalPrice={(totalPrice / 100).toFixed(2)}
                />
                <CartFooter copyright={2016} />
            </div>
        );
    }

}

export default App;
