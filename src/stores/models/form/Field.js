import {
  observable,
  runInAction,
  action,
} from 'mobx';

export default class Field {
  name;
  @observable initialValue;
  @observable value;
  @observable isTouched = false;
  @observable.ref validators = [];


  constructor(fieldData) {
    if (!fieldData.name) throw new Error('Property "name" is required!');

    runInAction(`Initiallize form field: '${fieldData.name}'`, () => {
      this.name = fieldData.name;
      this.initialValue = fieldData.value;
      this.value = this.initialValue;
    });
  }

  @action.bound change(value) {
    this.value = value;
  }

}