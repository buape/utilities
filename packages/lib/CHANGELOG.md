# @buape/lib

## 1.1.0

### Minor Changes

- 271afc9: feat: Add paginator
- fa4bd2a: feat: custom prefix for text commands

### Patch Changes

- 1542a8d: chore: switch to biome for formatting
- Updated dependencies [a1a1e32]
- Updated dependencies [1542a8d]
  - @buape/functions@1.0.3

## 1.0.11

### Patch Changes

- fix: dmPermission

## 1.0.10

### Patch Changes

- fixes for api locked cmd perms

## 1.0.9

### Patch Changes

- Fixes bug with API Locking Command Perms, adds dmPermission support.

## 1.0.8

### Patch Changes

- Lock command permissions at an API level.

  Previously, permissions were handled by the bot itself. This meant that there were no overrides at a Discord API level for our commands, and as far as the API was concerned all users could access all commands. This is no longer the case, and the correct permission overrides will be applied upon command registration.

## 1.0.7

### Patch Changes

- Updated dependencies [99adb23]
  - @buape/functions@1.0.2

## 1.0.6

### Patch Changes

- 34d962c: fix(#93): ctx cmds not registering
- b1f45f1: Made handler errors log the stack trace

## 1.0.4

### Patch Changes

- Fix a bug where events loaded with an incorrect name

## 1.0.3

### Patch Changes

- 563e482: Fix a small bug preventing events from loading

## 1.0.2

### Patch Changes

- Implement a fix for **filename and **dirname not being available in ES modules

## 1.0.1

### Patch Changes

- Bump discord.js version
- Updated dependencies
  - @buape/functions@1.0.1

## 1.0.0

### Major Changes

- 6350512: Create the lib package

### Patch Changes

- Updated dependencies [6350512]
  - @buape/functions@1.0.0
