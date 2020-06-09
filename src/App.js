import React, { Component, Fragment } from "react";
import Header from "./components/Header";
import PizzaForm from "./components/PizzaForm";
import PizzaList from "./containers/PizzaList";
class App extends Component {
  constructor() {
    super();
    this.state = {
      allPizzas: [],
      selectedPizza: {},
    };
  }

  componentDidMount() {
    fetch("http://localhost:3000/pizzas")
      .then((resp) => resp.json())
      .then((json) => {
        this.setState({
          allPizzas: json,
        });
      });
  }

  handleEdit = (props) => {
    this.setState({
      selectedPizza: props.pizza,
    });
  };

  handleChange = (event) => {
    let value = event.target.value;
    if (event.target.name === "vegetarian") {
      value = event.target.value === "Vegetarian";
    }
    this.setState({
      selectedPizza: {
        ...this.state.selectedPizza,
        [event.target.name]: value,
      },
    });
  };

  handleSubmit = () => {
    const pizza = this.state.selectedPizza;
    fetch(`http://localhost:3000/pizzas/${pizza.id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(pizza),
    })
      .then((resp) => resp.json())
      .then((json) => {
        const updatedPizzas = this.state.allPizzas.map((pizza) =>
          pizza.id === json.id ? json : pizza
        );
        this.setState({
          allPizzas: updatedPizzas,
        });
      });
  };

  render() {
    return (
      <Fragment>
        <Header />
        <PizzaForm
          selectedPizza={this.state.selectedPizza}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
        <PizzaList
          allPizzas={this.state.allPizzas}
          handleEdit={this.handleEdit}
        />
      </Fragment>
    );
  }
}

export default App;
