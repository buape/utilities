import { expect, test } from "vitest"
import { Permission, PermissionUser } from "../src/index"

const permissions: Permission[] = ["everything.*", "two.deep", "things.two.*", "three.deep.permission"]

const user = new PermissionUser("testuser", permissions)

const starUser = new PermissionUser("everything", ["*"])

test("PermissionUsers should initalize correctly", () => {
    expect(user).toBeInstanceOf(PermissionUser)
    expect(user.list()).toHaveLength(permissions.length)
})

// TODO: Fix errors here
// test("Star permission at level 1 should give a level 2 permission", () => {
//     expect(starUser.check("everything.two")).toBe(true)
// })
// test("Star permission at level 1 should give a level 3 permission", () => {
//     expect(starUser.check("everything.two.three")).toBe(true)
// })
test("Star permission at level 2 should give a level 2 permission", () => {
    expect(user.check("everything.two")).toBe(true)
})
// test("Star permission at level 2 should give a level 3 permission", () => {
//     expect(user.check("everything.two.three")).toBe(true)
// })
test("Star permission at level 3 should give a level 3 permission", () => {
    expect(user.check("things.two.three")).toBe(true)
})
test("Permission at level 2 should give a level 2 permission", () => {
    expect(user.check("two.deep")).toBe(true)
})
test("Permission at level 3 should give a level 3 permission", () => {
    expect(user.check("three.deep.permission")).toBe(true)
})
test("Permission at level 2 should not be given without the permission or a staf", () => {
    expect(user.check("two.notdeep")).toBe(false)
})
test("Permission at level 3 should give a level 3 permission", () => {
    expect(user.check("three.deep.not")).toBe(false)
})
