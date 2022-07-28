import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Patients from '../pages/Patients'

const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/">
      <Redirect to="/1/10" />
    </Route>
    <Route path="/:page/:limit" component={Patients} />
  </Switch>
)

export default Routes
