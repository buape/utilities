# @buape/dotperms

## 0.1.1

### Patch Changes

-   6cbe124: Allow both v16 and v18 node.js

## 0.1.0

### Minor Changes

-   3d874dc: Initial release

    **Known Issues**:

    If you set a permission as a star on level 2 (such as `config.*`), then a permission check any levels deeper than that (such as `config.testing.debug`) will not resolve correctly.

    This also applies on the global `*` permission (so `config.test` will not resolve correctly)
