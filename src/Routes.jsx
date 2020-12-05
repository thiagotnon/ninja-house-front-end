import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Header from "./components/Header";
import Dwellers from "./pages/Dwellers/Dwellers";
import Home from "./pages/Home";
import Units from "./pages/Units/Units";
import SingleUnit from "./pages/Units/SingleUnit";
import Users from "./pages/Users/Users";
import UserForm from "./pages/Users/UserForm";
import DwellerForm from "./pages/Dwellers/DwellerForm";
import Messages from "./pages/Messages/Messages";
import MessageForm from "./pages/Messages/MessageForm";
import Orders from "./pages/Orders/Orders";
import OrderForm from "./pages/Orders/OrderForm";
import UnitForm from "./pages/Units/UnitForm";
import Guests from "./pages/Guests/Guests";
import GuestForm from "./pages/Guests/GuestForm";
import LeisureSpaces from "./pages/LeisureSpaces/LeisureSpaces";
import SingleLeisureSpace from "./pages/LeisureSpaces/SingleLeisureSpace";
import Employees from "./pages/Employees/Employees";
import EmployeeForm from "./pages/Employees/EmployeeForm";
import LeisureSpaceForm from "./pages/LeisureSpaces/LeisureSpaceForm";
import LeisureSpaceReservationForm from "./pages/LeisureSpaces/LeisureSpaceReservationForm";
import Erro404 from "./pages/404/404";
import Login from "./pages/Users/Login";
import { isAuthenticated } from "./services/auth";
import Register from "./pages/Users/Register";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/login" }} />
      )
    }
  />
);

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/unidade/:id" component={SingleUnit} />
          <Route exact path="/unidade/:id/editar" component={UnitForm} />
          <Route exact path="/unidade/nova" component={UnitForm} />
          <Route exact path="/unidades" component={Units} />
          <Route exact path="/moradores" component={Dwellers} />
          <Route exact path="/usuarios" component={Users} />
          <Route exact path="/usuario/novo" component={UserForm} />
          <Route exact path="/usuario/:id/editar" component={UserForm} />
          <Route exact path="/morador/novo" component={DwellerForm} />
          <Route exact path="/mensagem/:id/editar" component={MessageForm} />
          <Route exact path="/mensagem/nova" component={MessageForm} />
          <Route exact path="/mensagens" component={Messages} />
          <Route exact path="/encomendas" component={Orders} />
          <Route exact path="/encomenda/nova" component={OrderForm} />
          <Route exact path="/hospedes" component={Guests} />
          <Route exact path="/hospede/novo" component={GuestForm} />
          <Route
            exact
            path="/espaco-de-lazer/:id/reserva"
            component={LeisureSpaceReservationForm}
          />
          <Route
            exact
            path="/espaco-de-lazer/novo"
            component={LeisureSpaceForm}
          />
          <Route exact path="/espacos-de-lazer" component={LeisureSpaces} />
          <Route
            exact
            path="/espaco-de-lazer/:id"
            component={SingleLeisureSpace}
          />
          <Route exact path="/funcionarios" component={Employees} />
          <Route exact path="/funcionario/novo" component={EmployeeForm} />
          <Route exact path="*" component={Erro404} />
        </Switch>

        <Route exact path="/cadastrar" component={Register} />
        <Route exact path="/login" component={Login} />
      </BrowserRouter>
    </>
  );
};
