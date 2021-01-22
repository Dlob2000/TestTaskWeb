export class Users {

  id: number;
  username: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  last_login: string;
  is_superuser: boolean;

  constructor(item) {
    item = item || {};

    this.id = item.id || 0;
    this.username = item.username || '';
    this.first_name = item.first_name || '';
    this.last_name = item.last_name || '';
    this.is_active = item.is_active || false;
    this.last_login = item.last_login ? new Date(item.last_login).toLocaleString() : '';
    this.is_superuser = item.is_superuser || false;
  }
}
