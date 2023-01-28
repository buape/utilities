export interface UserPermissions {
    [prop: string]: UserPermissionSet
}

export interface UserPermissionSet {
    [prop: string]: true | UserPermissionSet | null
}

export type Permission = `${string}.*` | `${string}.${string}.*` | `${string}.${string}.${string}` | `${string}.${string}` | "*"
