# Games Folder

Drop your exported PICO-8 game folders here. Games are auto-detected at build time.

## Adding a Game

1. Export your PICO-8 game (creates HTML + JS files)
2. Create a folder here with your game files
3. Optionally add a label image (cover.png or label.png)

```
static/games/
  my-game/
    mygame.html
    mygame.js
    cover.png    <- optional label image
```

## Getting a Label Image

**Option 1:** Save as `.p8.png` - it IS the label:
```
save mygame.p8.png
```
Copy and rename to `cover.png`.

**Option 2:** Screenshot - press `Ctrl+7` then `Ctrl+6` in PICO-8.
