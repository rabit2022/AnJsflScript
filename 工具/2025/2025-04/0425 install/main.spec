# -*- mode: python ; coding: utf-8 -*-


a = Analysis(
    ['main.py'],
    pathex=['core\\get_an_command.py', 'core\\install.py', 'core\\open_command_folder.py', 'core\\uninstall.py', 'ui\\about.py', 'ui\\anti_piracy.py', 'ui\\install.py', 'ui\\uninstall.py'],
    binaries=[],
    datas=[('pic', 'pic')],
    hiddenimports=['get_an_command', 'install', 'open_command_folder', 'uninstall', 'about', 'anti_piracy', 'install', 'uninstall'],
    hookspath=[],
    hooksconfig={},
    runtime_hooks=[],
    excludes=[],
    noarchive=False,
    optimize=0,
)
pyz = PYZ(a.pure)

exe = EXE(
    pyz,
    a.scripts,
    a.binaries,
    a.datas,
    [],
    name='main',
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=True,
    upx_exclude=[],
    runtime_tmpdir=None,
    console=False,
    disable_windowed_traceback=False,
    argv_emulation=False,
    target_arch=None,
    codesign_identity=None,
    entitlements_file=None,
    icon=['pic\\水梓.png'],
)
