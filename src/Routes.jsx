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
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute exact path="/unidades" component={Units} />
          <PrivateRoute exact path="/unidade/nova" component={UnitForm} />
          <PrivateRoute exact path="/unidade/:id" component={SingleUnit} />
          <PrivateRoute exact path="/unidade/:id/editar" component={UnitForm} />
          <PrivateRoute exact path="/moradores" component={Dwellers} />
          <PrivateRoute exact path="/usuarios" component={Users} />
          <PrivateRoute exact path="/usuario/novo" component={UserForm} />
          <PrivateRoute exact path="/usuario/:id/editar" component={UserForm} />
          <PrivateRoute exact path="/morador/novo" component={DwellerForm} />
          <PrivateRoute
            exact
            path="/mensagem/:id/editar"
            component={MessageForm}
          />
          <PrivateRoute exact path="/mensagem/nova" component={MessageForm} />
          <PrivateRoute exact path="/mensagens" component={Messages} />
          <PrivateRoute exact path="/encomendas" component={Orders} />
          <PrivateRoute exact path="/encomenda/nova" component={OrderForm} />
          <PrivateRoute
            exact
            path="/encomenda/:id/editar"
            component={OrderForm}
          />
          <PrivateRoute exact path="/hospedes" component={Guests} />
          <PrivateRoute exact path="/hospede/novo" component={GuestForm} />
          <PrivateRoute
            exact
            path="/espaco-de-lazer/:id/reserva"
            component={LeisureSpaceReservationForm}
          />
          <PrivateRoute
            exact
            path="/espaco-de-lazer/novo"
            component={LeisureSpaceForm}
          />
          <PrivateRoute
            exact
            path="/espaco-de-lazer/:id/editar"
            component={LeisureSpaceForm}
          />
          <PrivateRoute
            exact
            path="/espacos-de-lazer"
            component={LeisureSpaces}
          />
          <PrivateRoute
            exact
            path="/espaco-de-lazer/:id"
            component={SingleLeisureSpace}
          />
          <PrivateRoute exact path="/funcionarios" component={Employees} />
          <PrivateRoute
            exact
            path="/funcionario/novo"
            component={EmployeeForm}
          />
          <PrivateRoute exact path="*" component={Erro404} />
        </Switch>

        <Route exact path="/cadastrar" component={Register} />
        <Route exact path="/login" component={Login} />
      </BrowserRouter>
    </>
  );
};
