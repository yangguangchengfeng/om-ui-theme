# OM 色板与 CSS 变量

`getAntdTheme` 的 PALETTES 必须与下列 CSS 变量对齐（hex 大小写不敏感，语义一致即可）。

## 共用变量名

`--bg` `--panel` `--panel-2` `--line` `--line-strong` `--ink` `--mute` `--text-3`  
`--navy` `--navy-mid` `--navy-deep` `--accent` `--accent-2` `--accent-soft` `--name`  
`--lack` `--on-accent` `--table-head-ink` `--disabled-bg` `--disabled-ink`  
`--radius` `10px` `--radius-sm` `8px` `--display` `--body`  
`--input-bg` `--input-border` `--input-ring` `--btn-shadow` `--rail-shadow`  
`--row-hover` `--shadow` `--overlay-gap` `--kicker` `--login-glow`  
`--login-grad-start` `--login-grad-mid` `--login-grad-end`

`--overlay-gap` 仅科技风 `:root` 写过 `32px`，其它主题可继承。

## blue 科技风（默认，同时写 `:root`）

| 变量 | 值 |
|------|-----|
| bg | `#eef3f9` |
| panel | `#ffffff` |
| panel-2 | `#e8f1fb` |
| line / line-strong | `#d5e2f0` / `#c5d4e6` |
| ink / mute / text-3 | `#1a2332` / `#5b6778` / `#8b95a5` |
| navy / navy-mid / navy-deep | `#0f2744` / `#163a5c` / `#0b1e35` |
| accent / accent-2 / accent-soft | `#1f6feb` / `#3d8bff` / `rgba(31,111,235,.12)` |
| name / lack / on-accent | `#1f6feb` / `#d63b4a` / `#ffffff` |
| table-head-ink | `#4a5a70` |
| disabled-bg / disabled-ink | `#f5f5f5` / `rgba(0,0,0,.35)` |
| input-bg / input-border / input-ring | `#ffffff` / `#c5d4e6` / `rgba(31,111,235,.16)` |
| btn-shadow | `0 4px 12px rgba(31,111,235,.28)` |
| rail-shadow | `0 2px 8px rgba(31,111,235,.06)` |
| row-hover | `#eef5ff` |
| shadow | `0 4px 18px rgba(15,39,68,.08)` |
| kicker | `#9ec4f5` |
| login-glow | `rgba(61,139,255,.38)` |
| login-grad | `#0b1e35` → `#0f2744` → `#1f6feb` |

Ant Design：primary `#1F6FEB` hover `#3D8BFF` layout `#EEF3F9` headerBg `#E8F1FB` text `#1A2332` container `#FFFFFF` heading `#4A5A70`。success `#2BA3C7` error `#D63B4A` warning `#D4A017`。

## wine 德贝风

| 变量 | 值 |
|------|-----|
| bg | `#f7f1f2` |
| panel-2 | `#f3e6e9` |
| line / line-strong | `#e5d0d4` / `#d4b8bd` |
| ink / mute / text-3 | `#2a1418` / `#6b5358` / `#8f7a7e` |
| navy / navy-mid / navy-deep | `#4a1520` / `#5c1d2a` / `#2a0c12` |
| accent / accent-2 / accent-soft | `#94243a` / `#c44a62` / `rgba(148,36,58,.12)` |
| name | `#94243a` |
| table-head-ink | `#6a4a50` |
| input-border / input-ring | `#d4b8bd` / `rgba(148,36,58,.16)` |
| btn-shadow | `0 4px 12px rgba(148,36,58,.28)` |
| rail-shadow | `0 2px 8px rgba(148,36,58,.08)` |
| row-hover | `#faf0f2` |
| shadow | `0 4px 18px rgba(74,21,32,.08)` |
| kicker | `#e8b4bc` |
| login-glow | `rgba(196,74,98,.42)` |
| login-grad | `#2a0c12` → `#4a1520` → `#94243a` |

Ant Design：primary `#94243A` hover `#C44A62` navy `#4A1520` layout `#F7F1F2`。

## night 暗黑风

`color-scheme: dark`。

| 变量 | 值 |
|------|-----|
| bg | `#0c0b0a` |
| panel / panel-2 | `#141210` / `#1c1916` |
| line / line-strong | `#2e2924` / `#3d362f` |
| ink / mute / text-3 | `#f0e6d8` / `#a89888` / `#7a6e64` |
| navy / navy-mid / navy-deep | `#080706` / `#100e0c` / `#050504` |
| accent / accent-2 / accent-soft | `#e08b4d` / `#f0b07a` / `rgba(224,139,77,.18)` |
| name / lack / on-accent | `#e08b4d` / `#e85d5d` / `#1a120c` |
| table-head-ink | `#c4b4a4` |
| disabled-bg / disabled-ink | `#1a1714` / `rgba(240,230,216,.35)` |
| input-bg / input-border / input-ring | `#141210` / `#3d362f` / `rgba(224,139,77,.28)` |
| btn-shadow | `0 4px 14px rgba(224,139,77,.28)` |
| rail-shadow | `0 2px 8px rgba(0,0,0,.28)` |
| row-hover | `#3a2c1e` |
| shadow | `0 8px 28px rgba(0,0,0,.5)` |
| kicker | `#d4b896` |
| login-glow | `rgba(224,139,77,.38)` |
| login-grad | `#050504` → `#120e0c` → `#5c341c` |

Ant Design：`darkAlgorithm`；success `#3DCEC0` error `#E85D5D`；`colorBgElevated` 用 headerBg `#1C1916`（不要用浅色 container）。

## oz 绿野风

| 变量 | 值 |
|------|-----|
| bg | `#eaf3e4` |
| panel-2 | `#e3eed8` |
| line / line-strong | `#c5d6b8` / `#a8c498` |
| ink / mute / text-3 | `#1a2e22` / `#5a6e5e` / `#7a8c7c` |
| navy / navy-mid / navy-deep | `#0a3d2a` / `#0f4f36` / `#062418` |
| accent / accent-2 / accent-soft | `#147a4e` / `#d4a017` / `rgba(20,122,78,.12)` |
| name / lack | `#147a4e` / `#c41e3a` |
| table-head-ink | `#3d5c48` |
| input-border / input-ring | `#a8c498` / `rgba(20,122,78,.16)` |
| btn-shadow | `0 4px 12px rgba(20,122,78,.28)` |
| rail-shadow | `0 2px 8px rgba(10,61,42,.08)` |
| row-hover | `#eef6e6` |
| shadow | `0 4px 18px rgba(10,61,42,.08)` |
| kicker | `#e8c547` |
| login-glow | `rgba(212,160,23,.42)` |
| login-grad | `#062418` → `#0a3d2a` → `#147a4e` |

Ant Design：primary `#147A4E` hover `#1A9A62`（组件 hover 用绿；黄砖留给 `--accent-2` / kicker / warning）。
