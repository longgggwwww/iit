import { Injectable } from "@nestjs/common";
import { groups } from "./permissions";

@Injectable()
export class PermissionService {
  findAll() {
    return Object.keys(groups).map((k, id) => {
      const perms = Object.keys(groups[k].perms).map((kk, idd) => ({
        id: idd + 1,
        key: groups[k].perms[kk].k,
        value: groups[k].perms[kk].v,
      }));
      return {
        id: id + 1,
        name: groups[k].name,
        permissions: perms,
      };
    });
  }
}
