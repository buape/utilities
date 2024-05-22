# kiai.js

## 2.2.0

### Minor Changes

- Change kiaibot.com to kiai.app

## 2.1.0

### Minor Changes

- 635723c: chore: update kiai-api-types
  Adds the new parentId property to the virtual message endpoint

## 2.0.0

### Major Changes

- 653f3e8: Bump the required Node.js version to v18.19.0 (LTS)

## 1.1.5

### Patch Changes

- 77f59b7: Rename `Blacklist` to `Denylist`

## 1.1.4

### Patch Changes

- 1542a8d: chore: switch to biome for formatting

## 1.1.3

### Patch Changes

- Support Pagination for API wrapper

## 1.1.2

### Patch Changes

- Bump kiai-api-types to properly support cjs

## 1.1.1

### Patch Changes

- 413feb6: Fix kiai.js to work in CJS by fixing an error
- e7be584: Downgrade node-fetch from v3 to v2 to ensure CJS compatibility

## 1.1.0

### Minor Changes

- 7b0ea3a: Add an option to include a fetchFunction for the client which changes the function RequestHandler uses to contact the API

### Patch Changes

- 42a9c69: Fix a typo in KiaiClient.ts that caused the version field to be required when the options object was included

## 1.0.1

- Fix bad links to documentation

## 1.0.0

### Major Changes

- 700caf3: Implement all v1 API features

  **This is a major release**, and thus, is a breaking change from previous early releases of Kiai.js.

## 0.1.3

### Patch Changes

- d7935bc: Switched to unbuild for compiling

## 0.1.2

### Patch Changes

- 85d2abd: Add documentation and rename getRank to getData

## 0.1.1

### Patch Changes

- be68093: readme.md adjustments

## 0.1.0

### Minor Changes

- 33fa1ee: Initial implementation of kiai.js
