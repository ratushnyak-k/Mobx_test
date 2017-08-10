import {
  runInAction,
  observable,
  computed,
} from 'mobx';


export default class FieldsGroup {
  @observable fieldsName = [];
  @observable.ref fields = {};

  constructor(fields = {}) {
    runInAction(`Initialize form:`, () => {
      this.fieldsName = Object.keys(fields);
      this.fieldsName.forEach(fieldName => {
        this.fields[fieldName] = fields[fieldName];
      });
    });
  }

  @computed
  get data() {
    const data = {};
    this.fieldsName.forEach(fieldName => {
      if (this.fields[fieldName] instanceof FieldsGroup) {
        data[fieldName] = this.fields[fieldName].data;
      } else {
        data[fieldName] = this.fields[fieldName].value;
      }
    });

    return data;
  }
}

