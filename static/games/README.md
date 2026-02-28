# Games Folder

Drop your exported PICO-8 game folders here.

Each game should be in its own folder with an HTML file:

```
games/
  my-game/
    my-game.html
    my-game.js
    label.png        <- optional: game label/cover image
```

The folder name becomes the game's URL slug (e.g., `/games/my-game`).

## Adding a Label Image

To show the PICO-8 label on the cartridge:

### Option 1: Use the .p8.png cartridge file
The `.p8.png` file IS your label! Just copy it and rename to `label.png`:
```
save mygame.p8.png
```
Then copy `mygame.p8.png` to your game folder and rename it to `label.png`.

### Option 2: Screenshot the label
1. In PICO-8, press `Ctrl+7` to view the label
2. Press `Ctrl+6` to take a screenshot
3. Find the screenshot in your PICO-8 screenshots folder
4. Copy and rename it to `label.png` in your game folder

### Option 3: Any image
Just add any `label.png`, `label.gif`, or `cover.png` to the game folder.

Supported formats: `.png`, `.gif`, `.jpg`, `.p8.png`
