import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';



@State<CanvasStateModel>({
  name: 'canvas',
  defaults: {
    nodes: [{ name: 'TestNode', width: 500, height: 50, x: 0, y: 0 } as INode],
  },
})
