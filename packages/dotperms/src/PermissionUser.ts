/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Permission, UserPermissions, UserPermissionSet } from "."

export class PermissionUser {
    id: string
    permissions: UserPermissions

    /**
     * @param id The user's ID
     * @param permissions A list of permissions the user has
     */
    constructor(id: string, permissions: Permission[]) {
        this.id = id
        this.permissions = {}
        this.addPermissions(permissions)
    }

    /**
     * List all permissions the user has
     * @returns An array of permissions the user has
     */
    public list(): Permission[] {
        const returned: Permission[] = []
        for (const group in this.permissions) {
            for (const permission in this.permissions[group]) {
                if (this.permissions[group][permission] === true) {
                    returned.push(`${group}.${permission}`)
                } else if (typeof this.permissions[group][permission] === "object") {
                    for (const subPermission in this.permissions[group][permission] as UserPermissionSet) {
                        returned.push(`${group}.${permission}.${subPermission}`)
                    }
                }
            }
        }
        return returned
    }

    /**
     * Check a permission against the user's permissions
     * @param permission A string of a permission you want to check (up to 2 subgroups allowed)
     */
    public check(permission: Permission) {
        const permTiers = permission.split(".")
        const baseGroup = this.permissions[permTiers[0]]
        if (!baseGroup) return false
        permTiers.shift()

        let result

        switch (permTiers.length) {
            case 1:
                result = baseGroup[permTiers[0]]
                if (typeof result !== "boolean") result = null
                if (!result) result = baseGroup["*"]
                if (!result) result = false
                break

            case 2:
                const subGroup = baseGroup[permTiers[0]]
                if ((typeof subGroup === "boolean" && subGroup === true) || subGroup === null || !subGroup) {
                    result = null
                    break
                } else {
                    result = subGroup[permTiers[1]]
                    if (typeof result !== "boolean") result = null
                    if (!result) result = subGroup["*"]
                    if (!result) result = false
                }
        }
        if (!result) result = false
        return result
    }

    /**
     * Add a permission to a user
     * @param permissions An array of permissions to add (up to 2 subgroups)
     */
    public addPermissions(permInput: Permission[]) {
        permInput.forEach((x) => {
            const split = x.split(".")
            const baseGroup = split[0]
            let userPermGroup = this.permissions[baseGroup] || null
            if (!userPermGroup) {
                this.permissions[baseGroup] = {}
                userPermGroup = this.permissions[baseGroup]
            }

            split.shift()

            switch (split.length) {
                case 0:
                    userPermGroup["*"] = true
                    break

                case 1:
                    userPermGroup[split[0]] = true
                    break

                case 2:
                    let groupTwo = userPermGroup[split[0]] || null
                    if (!groupTwo) {
                        userPermGroup[split[0]] = {}
                        groupTwo = userPermGroup[split[0]]
                    }
                    if (typeof groupTwo !== "boolean") {
                        groupTwo![split[1]] = true
                    }
                    break

                default:
                    let groupD = userPermGroup[split[0]] || null
                    if (!groupD) {
                        userPermGroup[split[0]] = {}
                        groupD = userPermGroup[split[0]]
                    }
                    if (typeof groupD !== "boolean") {
                        groupD![split[1]] = true
                    }
                    //console.warn("Only permission groups up to 2 deep are supported, the group has been trimmed")
                    break
            }
        })
    }
}
