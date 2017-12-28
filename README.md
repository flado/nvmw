Node Version Manager for Windows
================================
nvmw is a simple Node Version Manager for Windows (Fork of git://github.com/hakobera/nvmw.git).
The fork fixes issue in latest node versions. After node v6.x, the npm is bundled wtih node.exe in the same ZIP file.


Prerequisites
-------------

You'll need to install the following software before installing nvmw:

- [git](http://code.google.com/p/msysgit/ "msysgit")
- [python 2.7+](http://python.org/download/) only if you need Node < 0.8

Installation
------------

Clone this repository:

    git clone git://github.com/flado/nvmw.git "%HOMEDRIVE%%HOMEPATH%\.nvmw"

To activate nvmw, add nvmw directory to your PATH environment variable

    set "PATH=%HOMEDRIVE%%HOMEPATH%\.nvmw;%PATH%"

Usage
-----

    Usage:
      nvmw help                    Show this message
      nvmw install [version]       Download and install a [version]
      nvmw uninstall [version]     Uninstall a [version]
      nvmw use [version]           Modify PATH to use [version]
      nvmw ls                      List installed versions

    Example:
      nvmw install v0.6.0          Install a specific version number
      nvmw use v0.6.0              Use the specific version
      nvmw install iojs            Install the latest version of io.js
      nvmw install iojs-v1.0.2     Install a specific version number of io.js
      nvmw use iojs-v1.0.2         Use the specific version of io.js

### Support install with arch

arch support values: `x86`, `x64`

    Usage:
      nvmw install [version] [arch]    Download and install a [version] on the [arch]
      nvmw uninstall [version] [arch]  Uninstall a [version] on the [arch]
      nvmw use [version] [arch]        Modify PATH to use [version] on the [arch]

    Example:
      nvmw install v0.12.0 x86         Install a specific 32-bit version
      nvmw use v0.12.0 x86             Use the specific 32-bit version

Mirror node.js/io.js/npm dist
------------------

To use a mirror of the node binaries, set `$NVMW_NODEJS_ORG_MIRROR`.

e.g.: In China, you can use these mirrors:

```bash
set "NVMW_NODEJS_ORG_MIRROR=http://npm.taobao.org/mirrors/node"
set "NVMW_IOJS_ORG_MIRROR=http://npm.taobao.org/mirrors/iojs"
set "NVMW_NPM_MIRROR=http://npm.taobao.org/mirrors/npm"

nvmw install 0.11.14
nvmw install node-v0.11.15
nvmw install iojs
nvmw install iojs-v1.0.2
```

FAQ
---

### Q. Node.exe download faild caused 'Input Error: There is no script engine for file extension ".js"'

Maybe you associated ".js" file to another app, not JScript engine. To fix, see [here](http://www.winhelponline.com/articles/230/1/Error-There-is-no-script-engine-for-file-extension-when-running-js-files.html)
