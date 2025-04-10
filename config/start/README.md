config.psm1  必须 编码为 ANSI 格式,否则会导致 Powershell 无法加载该文件

更改时，可以直接用记事本打开。

原因：
Powershell 默认使用 Unicode 编码，而 Windows 默认使用 ANSI 编码，因此 Powershell 无法加载含有中文的配置文件。
必须将配置文件编码为 ANSI 格式才能正常加载。

注意：
1. 这里的config应该由本地的Adobe Animate 的位置配置，具体路径根据实际情况修改。
2. 要使得相应脚本生效，需要  全部 重新配置。
3. 由package.json 的scripts 脚本运行

```powershell
   Import-Module .\config\start\config.psm1
```
路径是 相对于 package.json 的路径

如果需要直接运行，更改路径为：

```powershell
   Import-Module .\config.psm1
```

使用方法：
1. webstorm 打开，查看 `package.json` 文件，找到 `scripts` 字段，在左边有个绿色的按钮，点击运行，即可运行相应的脚本。
2. 并且会自动添加到  运行配置  中，方便下次直接运行。
3. 运行当前文件，无法通过  powershell 直接运行，需要在 webstorm 中直接配置。

