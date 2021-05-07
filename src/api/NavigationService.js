import React from 'react';
import {StackActions} from '@react-navigation/native';

export const navigationRef = React.createRef();

let navigator;

const setTopLevelNavigator = ref => {
    console.log(ref)
  navigator = ref;
};

const navigate = (routeName, params) => {
  navigator.navigate(routeName, params);
};

const push = (...args) => {
  navigator.dispatch(StackActions.push(...args));
};

const back = () => {
  navigator.goBack();
};

const popToTop = (immediate = true) => {
  navigator.dispatch({
    type: NavigationAction.POP_TO_TOP,
    immediate,
  });
};

const reset = (index, routes) => {
  navigator.reset({
    index,
    routes,
  });
};

const pop = number => {
  const popAction = StackActions.pop({
    n: number,
  });

  navigator.dispatch(popAction);
};

export const NavigationServices = {
  setTopLevelNavigator,
  navigate,
  back,
  popToTop,
  reset,
  navigator,
  push,
  pop,
};
