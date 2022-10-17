import { makeAutoObservable } from 'mobx';
import type RootStore from './RootStore';

export default class UserStore {
  userId: string | undefined;

  constructor(private rootStore: RootStore) {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  login(userId: string) {
    this.userId = userId;
  }

  get isLoggedIn() {
    return !!this.userId;
  }
}
